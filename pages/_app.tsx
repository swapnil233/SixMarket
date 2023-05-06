import { RouterTransition } from "@/components/RouterTransition";
import "@/styles/globals.css";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { Analytics } from "@vercel/analytics/react";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { NextPageWithLayout } from "./page";
import { DevSupport } from "@react-buddy/ide-toolbox-next";
import { ComponentPreviews, useInitial } from "@/components/dev";

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
          <RouterTransition />
          {getLayout(
            <DevSupport
              ComponentPreviews={ComponentPreviews}
              useInitialHook={useInitial}
            >
              <Component {...pageProps} />
            </DevSupport>
          )}
          <Notifications />
        </SessionProvider>
      </MantineProvider>
      <Analytics />
    </>
  );
}
