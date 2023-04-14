import { requireAuthentication } from "@/utils/requireAuthentication";
import { Button } from "flowbite-react";
import { GetServerSideProps } from "next";
import { Session } from "next-auth";
import { getSession, signIn, signOut } from "next-auth/react";
import { FC } from "react";

interface dashboardProps {
  session: Session | null;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  return requireAuthentication(context, (session: any) => {
    return {
      props: {
        session,
      },
    };
  });
};

const Dashboard: FC<dashboardProps> = ({ session }) => {
  return (
    <div>
      <p>This is where you create a new listing</p>
    </div>
  );
};

export default Dashboard;
