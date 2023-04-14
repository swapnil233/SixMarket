import { Button } from "flowbite-react";
import { GetServerSideProps } from "next";
import { Session } from "next-auth";
import { signIn } from "next-auth/react";
import { FC } from "react";
import ProfilePreferencesForm from "@/components/ProfilePreferencesForm";
import { requireAuthentication } from "@/utils/requireAuthentication";

interface userSettingsProps {
  session: Session | null;
}

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  return requireAuthentication(context, (session: any) => {
    return {
      props: {
        session,
      },
    };
  });
};

const UserSettings: FC<userSettingsProps> = ({ session }) => {
  return (
    <>
      {session ? (
        <ProfilePreferencesForm />
      ) : (
        <div>
          <p>Not signed in</p>
          <Button onClick={() => signIn()}>Sign in</Button>
        </div>
      )}
    </>
  );
};

export default UserSettings;
