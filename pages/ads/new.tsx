import { requireAuthentication } from "@/utils/requireAuthentication";
import { GetServerSideProps } from "next";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
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

      {/* 
        title
        category
          buy and sell

          cars & vehicles
          real estate
      */}
    </div>
  );
};

export default Dashboard;
