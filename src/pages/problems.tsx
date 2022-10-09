import type { NextPage } from "next";
import Head from "next/head";

import Header from "~/components/Header";

const Problems: NextPage = () => {
  return (
    <>
      <Head>
        <title>problems - judge.</title>
        <meta
          name="description"
          content="a work in progress programming judge."
        />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <Header />
      <main>
        <h1>Problems Page</h1>
      </main>
    </>
  );
};

export default Problems;
