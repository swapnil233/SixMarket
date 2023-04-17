import Layout from "@/components/Layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import { MantineProvider, createEmotionCache } from "@mantine/core";

// Need this to make Mantine styles override other styles
const appendCache = createEmotionCache({ key: "mantine", prepend: false });

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps & { session: Session }) {
  return (
    <>
      <Head>
        <title>Marketplace</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <meta
          name="description"
          content="Marketplace is a new classfields website based in Toronto"
        />
        <meta name="keywords" content="Classfields" />
        <meta name="author" content="Hasan Iqbal" />
      </Head>
      <MantineProvider
        emotionCache={appendCache}
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: "light",
        }}
      >
        <SessionProvider session={session}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SessionProvider>
      </MantineProvider>
    </>
  );
}
