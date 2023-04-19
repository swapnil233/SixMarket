import ProfilePreferencesForm from "@/components/ProfilePreferencesForm";
import PrimaryLayout from "@/components/layout/primary/PrimaryLayout";
import prisma from "@/utils/prisma";
import { requireAuthentication } from "@/utils/requireAuthentication";
import { User } from "@prisma/client";
import { GetServerSideProps } from "next";
import { NextPageWithLayout } from "../page";

interface UserSettingsProps {
  user: User;
}

export const getServerSideProps: GetServerSideProps<UserSettingsProps> = async (
  context
) => {
  return requireAuthentication(context, async (session) => {
    const user = await prisma.user.findUnique({
      where: { email: session.user?.email! },
    });

    return {
      props: {
        user,
      },
    };
  });
};

const UserSettings: NextPageWithLayout<UserSettingsProps> = ({ user }) => {
  return (
    <>
      <ProfilePreferencesForm user={user} />
    </>
  );
};

export default UserSettings;

UserSettings.getLayout = (page) => <PrimaryLayout>{page}</PrimaryLayout>;
