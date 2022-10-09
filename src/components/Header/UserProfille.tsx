import { Session } from "next-auth";
import React from "react";
import HeaderLink from "./HeaderLink";
import Image from "next/image";

interface UserProfileProps {
  user: Session["user"];
}

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  const image =
    user?.image ?? "https://s3.amazonaws.com/freecodecamp/relaxing-cat.jpg"; // the legendary freecodecamp catphotoapp cat

  return (
    <span>
      <img className="mx-4 inline-block" src={image} width={32} height={32} />
    </span>
  );
};

export default UserProfile;
