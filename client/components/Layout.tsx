import { useRouter } from "next/router";
import NavBar from "./NavBar";
import { useEffect, useState } from "react";
import { getAccessToken } from "@/libs/getAccessToken";

interface Props {
  children: string | JSX.Element | JSX.Element[];
}

const Layout = ({ children }: any) => {
  const router = useRouter();

  const accessToken = getAccessToken();

  useEffect(() => {
    if (!accessToken) router.push("/login");
  }, [accessToken, router]);

  return (
    <div>
      <NavBar />
      {children}
    </div>
  );
};

export default Layout;
