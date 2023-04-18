import { Card } from "flowbite-react";
import { FC } from "react";
import Image from "next/image";
import { User } from "@prisma/client";

interface UserCardProps {
  user: User;
}

const UserCard: FC<UserCardProps> = ({ user }) => {
  return (
    <Card key={user.id} className="sm:w-full">
      <div className="flex flex-col items-center">
        <Image
          src={user.image || "https://flowbite.com/docs/images/logo.svg"}
          width={96}
          height={96}
          alt={`${user.name}'s profile picture`}
          className="w-24 h-24 rounded-full mb-3 shadow-lg"
        />
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
          {`${user.name}`}
        </h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {user.email}
        </span>
        <div className="mt-4 flex space-x-3 lg:mt-6">
          <a
            href={`/profile/${user.id}`}
            className="inline-flex items-center rounded-lg bg-blue-700 py-2 px-4 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Visit profile
          </a>
        </div>
      </div>
    </Card>
  );
};

export default UserCard;
