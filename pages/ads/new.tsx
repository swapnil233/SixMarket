import { requireAuthentication } from "@/utils/requireAuthentication";
import { GetServerSideProps } from "next";
import { FC } from "react";

interface dashboardProps {}

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  return requireAuthentication(context, async (session: any) => {
    return {
      props: {},
    };
  });
};

const Dashboard: FC<dashboardProps> = ({}) => {
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
