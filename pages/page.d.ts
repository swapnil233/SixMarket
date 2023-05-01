import { NextPage } from "next";
import { ComponentType, ReactElement, ReactNode } from "react";

// Generic type, accepts P which can be props for the page component
export type NextPageWithLayout<P = {}> = NextPage<P> & {
  getLayout?: (_page: ReactElement) => ReactNode;
  layout?: ComponentType;
};
