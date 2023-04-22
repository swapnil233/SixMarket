import "@/styles/globals.css";
import { MantineProvider } from "@mantine/core";
import { Analytics } from "@vercel/analytics/react";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import NextNProgress from "nextjs-progressbar";
import { NextPageWithLayout } from "./page";

interface AppPropsWithLayout extends AppProps {
  Component: NextPageWithLayout;
}

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout & { session: Session }) {
  // Use the layout defined at the page level if available
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: "light",
        }}
      >
        <SessionProvider session={session}>
          <NextNProgress height={3} options={{ showSpinner: false }} />
          {getLayout(<Component {...pageProps} />)}
        </SessionProvider>
      </MantineProvider>
      <Analytics />
    </>
  );
}
