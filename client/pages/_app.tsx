import "../styles/globals.css";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import AdminLayout from "@layouts/admin-layout";
import { UserProvider } from "contexts/user-context";
import { ToastProvider } from "contexts/toast-context";
import HeaderComponent from "@components/header";

type AppPropsWithLayout = AppProps & {
  Component: NextPage & {
    isAdmin?: boolean;
    isUser?: boolean;
  };
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  return (
    <UserProvider>
      <ToastProvider autoExpireIn={3500}>
        <HeaderComponent />
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
      </ToastProvider>
    </UserProvider>
  );
}
