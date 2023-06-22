import { NextPage } from "next";
import Head from "next/head";
import LandingPageTemplate from "../templates/LandingPage/LandingPageTemplate";
import { Header } from "@/components/Header";

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>next-app</title>
        <meta name="description" content="Generated by Create Next Stack." />
      </Head>
      <Header />
      <LandingPageTemplate />
    </>
  );
};

export default Index;
