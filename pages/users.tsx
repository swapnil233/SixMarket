import { FC, useState } from "react";
import UserCard from "@/components/UserCard";
import FilterInput from "@/components/FilterInput";
import { requireAuthentication } from "@/utils/requireAuthentication";
import { User } from "@prisma/client";
import { GetServerSideProps } from "next/types";
import Head from "next/head";

interface UsersProps {
  users: User[];
}

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  return requireAuthentication(context, async (session: any) => {
    const protocol = context.req.headers["x-forwarded-proto"] || "http";
    const host = context.req.headers["host"];
    const apiUrl = `${protocol}://${host}/api/users`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    const users: User[] = data.map((user: any) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      image: user.image,
    }));

    return {
      props: {
        users,
      },
    };
  });
};

const Users: FC<UsersProps> = ({ users }) => {
  const [filterText, setFilterText] = useState("");

  const handleFilterTextChange = (text: string) => {
    setFilterText(text);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name?.toLowerCase().includes(filterText.toLowerCase()) ||
      user.email?.toLowerCase().includes(filterText.toLowerCase())
  );

  const emptyStateMessage =
    "Sorry, we couldn't find what you're looking for...";

  return (
    <>
      <Head>
        <title>Marketplace | Users</title>
        <meta name="description" content="List of all users" />
      </Head>
      <div className="grid gap-4 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 mx-auto">
        <FilterInput onFilterTextChange={handleFilterTextChange} />
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => <UserCard key={user.email} user={user} />)
        ) : (
          <h1 className="col-span-full">{emptyStateMessage}</h1>
        )}
      </div>
    </>
  );
};

export default Users;
