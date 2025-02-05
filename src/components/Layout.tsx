import React, { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <main className="flex min-h-screen w-full flex-row bg-dark-100">
      <Sidebar />
      <div className="flex w-[calc(100%-264px)] flex-1 flex-col bg-[#f8f8ff] p-5 xs:p-10">
        <Header />
        {children}
      </div>
    </main>
  );
};

export default Layout;
