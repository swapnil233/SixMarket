import { FC, useState } from "react";
import User from "@/models/User";
import UserCard from "@/components/UserCard";
import FilterInput from "@/components/FilterInput";
import { requireAuthentication } from "@/utils/requireAuthentication";
import { Session } from "next-auth";

interface UsersProps {
  users: User[];
  session: Session | null;
}

export async function getServerSideProps(context: any) {
  const protocol = context.req.headers["x-forwarded-proto"] || "http";
  const host = context.req.headers["host"];
  const apiUrl = `${protocol}://${host}/api/users`;

  const response = await fetch(apiUrl);
  const rawData = await response.json();

  // Leaving out ID because this info will be available to client, and emails are unique
  const users: User[] = rawData.map((user: any) => ({
    name: user.name,
    email: user.email,
    image: user.image,
  }));

  return requireAuthentication(context, (session: any) => {
    return {
      props: {
        session,
        users,
      },
    };
  });
}

const Users: FC<UsersProps> = ({ users }) => {
  const [filterText, setFilterText] = useState("");

  const handleFilterTextChange = (text: string) => {
    setFilterText(text);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(filterText.toLowerCase()) ||
      user.email.toLowerCase().includes(filterText.toLowerCase())
  );

  const emptyStateMessage =
    "Sorry, we couldn't find what you're looking for...";

  return (
    <div className="grid gap-4 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 mx-auto">
      <FilterInput onFilterTextChange={handleFilterTextChange} />
      {filteredUsers.length > 0 ? (
        filteredUsers.map((user) => <UserCard key={user.email} user={user} />)
      ) : (
        <h1 className="col-span-full">{emptyStateMessage}</h1>
      )}
    </div>
  );
};

export default Users;
