import Background from "@/components/UI/Background";
import ThemeProvider from "@/contexts/Theme";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/globals.css";
import "@/styles/themes.css";
import type { AppProps } from "next/app";
import Navbar from "@/components/Common/Navbar";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Background />
      <Navbar />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
