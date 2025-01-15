'use client';

import "./globals.css";
import '@ant-design/v5-patch-for-react-19';
import { Provider } from "react-redux";
import store, { persistor }  from "./redux/store";
import {PersistGate} from "redux-persist/integration/react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <body className="bg-gray-100 text-black">
            <Provider store={store}>
                <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
                    {children}
                </PersistGate>
            </Provider>
        </body>
    </html>
  );
}
