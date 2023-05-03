import { useRouter } from "next/router";
import NavBar from "./NavBar";
import { useContext, useEffect } from "react";
import { AppContext } from "../contexts/AppContext";
import { Button } from "@mui/material";
import Link from "next/link";

interface Props {
  children: string | JSX.Element | JSX.Element[];
}

const Layout = ({ children }: any) => {
  const { accessToken } = useContext(AppContext);

  const router = useRouter();

  useEffect(() => {
    //   const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      router.push("/login");
    }
  }, [accessToken]);

  return (
    // <div>
    //   <div>
    //     <NavBar />
    //     {children}
    //   </div>
    // </div>
    <>
      {accessToken ? (
        <div>
          <NavBar />
          {children}
        </div>
      ) : null}
    </>
  );
};

export default Layout;
