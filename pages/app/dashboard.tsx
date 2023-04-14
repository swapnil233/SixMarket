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
  return {
    props: {
      session,
    },
  };
};

const Dashboard: FC<dashboardProps> = ({ session }) => {
  return (
    <>
      {session ? (
        <div>
          <p>Welcome, {session.user?.name}</p>
          <Button onClick={() => signOut()}>Sign out</Button>
        </div>
      ) : (
        <div>
          <p>Not signed in</p>
          <Button onClick={() => signIn()}>Sign in</Button>
        </div>
      )}
    </>
  );
};

export default Dashboard;
