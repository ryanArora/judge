import type { NextPage } from "next";
import Head from "next/head";
import { trpc } from "../utils/trpc";

import Header from "~/components/Header";

const Home: NextPage = () => {
  // const hello = trpc.example.hello.useQuery({ text: "from tRPC" });
  // const { data: secretMessage } = trpc.auth.getSecretMessage.useQuery();

  return (
    <>
      <Head>
        <title>judge. - home</title>
        <meta
          name="description"
          content="a work in progress programming judge."
        />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <Header />
    </>
  );
};

export default Home;
