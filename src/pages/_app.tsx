import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/globals.css";
import "@/styles/themes.css";
import type { AppProps } from "next/app";
import { UserProvider } from "@/contexts/UserContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </>
  );
}
