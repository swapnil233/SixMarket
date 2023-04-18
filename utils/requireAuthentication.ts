import { getSession } from "next-auth/react";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { Session } from "next-auth";

type AuthenticatedCallback = (
  session: Session
) => Promise<GetServerSidePropsResult<any>>;

export const requireAuthentication = async (
  context: GetServerSidePropsContext,
  cb: AuthenticatedCallback
): Promise<GetServerSidePropsResult<any>> => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/api/auth/signin?callbackUrl=" + context.resolvedUrl,
        permanent: false,
      },
    };
  }

  return cb(session);
};
