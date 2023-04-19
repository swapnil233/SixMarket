import "@/styles/globals.css";
import { MantineProvider, createEmotionCache } from "@mantine/core";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { NextPageWithLayout } from "./page";

// Need this to make Mantine styles override other styles
const appendCache = createEmotionCache({ key: "mantine", prepend: false });

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
        emotionCache={appendCache}
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: "light",
        }}
      >
        <SessionProvider session={session}>
          {getLayout(<Component {...pageProps} />)}
        </SessionProvider>
      </MantineProvider>
    </>
  );
}
