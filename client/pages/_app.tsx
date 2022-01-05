import "../styles/globals.css";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import { UserProvider } from "contexts/user-context";
import { ToastProvider } from "contexts/toast-context";
import { SettingsProvider } from "contexts/settings-context";
import AdminLayout from "components/layouts/admin-layout";
import NavbarComponent from "components/navbars";
import FooterComponent from "components/footers";

type AppPropsWithLayout = AppProps & {
  Component: NextPage & {
    isAdmin?: boolean;
    isUser?: boolean;
  };
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  return (
    <UserProvider>
      <SettingsProvider>
        <ToastProvider autoExpireIn={5000}>
          {Component.isAdmin ? (
            <AdminLayout>
              <Component {...pageProps} />
            </AdminLayout>
          ) : (
            <>
              <NavbarComponent />
              <Component {...pageProps} />
              <FooterComponent />
            </>
          )}
        </ToastProvider>
      </SettingsProvider>
    </UserProvider>
  );
}
