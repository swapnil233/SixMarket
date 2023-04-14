import { Button } from "flowbite-react";
import { GetServerSideProps } from "next";
import { Session } from "next-auth";
import { signIn } from "next-auth/react";
import { FC } from "react";
import ProfilePreferencesForm from "@/components/ProfilePreferencesForm";
import { requireAuthentication } from "@/utils/requireAuthentication";
import prisma from "@/utils/prisma";

interface userSettingsProps {
  session: Session | null;
}

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  return requireAuthentication(context, async (session: any) => {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    return {
      props: {
        user,
      },
    };
  });
};

const UserSettings: FC<userSettingsProps> = ({ session }) => {
  return (
    <>
      <ProfilePreferencesForm />
    </>
  );
};

export default UserSettings;
