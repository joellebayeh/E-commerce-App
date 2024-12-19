'use client';

import "./globals.css";
import { Provider } from "react-redux";
import store from "./redux/store";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Provider store={store}>
        <body className="bg-gray-100">{children}</body>
      </Provider>
    </html>
  );
}
