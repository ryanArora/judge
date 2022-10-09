import type { NextPage } from "next";
import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/react";
import { trpc } from "../utils/trpc";
import Image from "next/image";
import Link from "next/link";

const Home: NextPage = () => {
  const { data: sessionData } = useSession();

  // const hello = trpc.example.hello.useQuery({ text: "from tRPC" });
  // const { data: secretMessage } = trpc.auth.getSecretMessage.useQuery();

  return (
    <>
      <Head>
        <title>judge. - homepage</title>
        <meta
          name="description"
          content="a work in progress programming judge."
        />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <main className="flex items-center justify-between bg-neutral-800 px-0 py-0">
        <div className="mx-4 flex items-center">
          <div className="px-2 hover:cursor-pointer">
            <Link href="/">
              <Image
                onClick={() => {}}
                className="px-10"
                src="/favicon.svg"
                width={64}
                height={64}
              />
            </Link>
          </div>

          <div className="px-2">
            <h1 className="text-xl text-neutral-50">judge.</h1>
            <p className="text-neutral-500">
              a work in progress programming judge.
            </p>
          </div>
        </div>

        <div className="mx-4">
          <button
            className="justify-self-end text-neutral-500"
            onClick={sessionData ? () => signOut() : () => signIn()}
          >
            {sessionData ? "Sign out" : "Sign in"}
          </button>
        </div>
      </main>
    </>
  );
};

export default Home;
