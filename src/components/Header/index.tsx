import React from "react";
import Image from "next/image";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import HeaderLinksList from "./HeaderLinksList";
import UserProfile from "./UserProfille";

const Header: React.FC = () => {
  const { data: sessionData } = useSession();

  return (
    <header className="flex items-center justify-between bg-neutral-800">
      <div className=" flex items-stretch">
        <div className="mx-2 flex items-center">
          <div className="px-2 hover:cursor-pointer">
            <Link href="/">
              <a>
                <Image
                  onClick={() => {}}
                  src="/favicon.svg"
                  alt="judge gavel logo"
                  width={64}
                  height={64}
                />
              </a>
            </Link>
          </div>

          <div className="px-2">
            <h1 className="text-xl text-neutral-50">judge.</h1>
            <p className="text-neutral-500">
              a work in progress programming judge.
            </p>
          </div>
        </div>

        <nav>
          <HeaderLinksList />
        </nav>
      </div>

      <div className="mx-4">
        {sessionData ? <UserProfile user={sessionData.user} /> : null}
        <button
          className="justify-self-end text-neutral-500"
          onClick={sessionData ? () => signOut() : () => signIn()}
        >
          {sessionData ? "Sign out" : "Sign in"}
        </button>
      </div>
    </header>
  );
};

export default Header;
