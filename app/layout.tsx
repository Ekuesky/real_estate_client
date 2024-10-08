import type {Metadata} from "next";
import localFont from "next/font/local";
import "./globals.css";
import React from "react"
import { openSans, robotoSlab } from "@/lib/fonts";


export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({children,}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${openSans.variable} ${robotoSlab.variable} antialiased`}>
                {children}
            </body>
        </html>
    );
}
