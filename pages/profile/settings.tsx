import { GetServerSideProps } from "next";
import { FC } from "react";
import ProfilePreferencesForm from "@/components/ProfilePreferencesForm";
import { requireAuthentication } from "@/utils/requireAuthentication";
import prisma from "@/utils/prisma";
import { User } from "@prisma/client";

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

const UserSettings: FC<UserSettingsProps> = ({ user }) => {
  return (
    <>
      <ProfilePreferencesForm user={user} />
    </>
  );
};

export default UserSettings;
