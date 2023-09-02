"use client";
import "./globals.css";
import { Inter } from "next/font/google";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { Sepolia } from "@thirdweb-dev/chains";
import Header from "@/components/Header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Web3.0 File Storage</title>
        <meta name="description" content="Description" />
      </head>
      <body className={inter.className}>
        <ThirdwebProvider activeChain={Sepolia}>
          <ToastContainer position="top-center" autoClose={3000} />
          <Header />
          {children}
        </ThirdwebProvider>
      </body>
    </html>
  );
}
