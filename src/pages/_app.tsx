import Layout from "@/components/Layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Inter, Ubuntu } from "next/font/google";

const inter = Inter({ subsets: ["cyrillic", "latin"] });
const ubuntu = Ubuntu({ weight: ["300", "400", "500", "700"], subsets: ["latin", "cyrillic"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${inter.className} ${ubuntu.className}`}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </main>
  );
}
