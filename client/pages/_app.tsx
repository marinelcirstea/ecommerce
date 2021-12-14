import type { NextPage } from "next";
import type { AppProps } from "next/app";
import AdminLayout from "../layouts/admin-layout";
import { SWRConfig } from "swr";
import fetchJson from '@libs/fetch-json'

type AppPropsWithLayout = AppProps & {
  Component: NextPage & {
    isAdmin?: boolean;
    isUser?: boolean;
  };
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  return (
    <SWRConfig
      value={{
        refreshInterval: 3000,
        fetcher: fetchJson,
        onError: (err) => {
          console.error(err)
        },
      }}
    >
      {Component.isAdmin ? (
        <AdminLayout>
          <p>isAdmin</p>
          <Component {...pageProps} />
        </AdminLayout>
      ) : Component.isUser ? (
        // add some user layout
        <>
          <p>isUser</p>
          <Component {...pageProps} />
        </>
      ) : (
        <Component {...pageProps} />
      )}
      ;
    </SWRConfig>
  );
}
