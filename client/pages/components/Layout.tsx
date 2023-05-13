import { useRouter } from "next/router";
import NavBar from "./NavBar";
import { useEffect, useState } from "react";

interface Props {
  children: string | JSX.Element | JSX.Element[];
}

const Layout = ({ children }: any) => {
  const router = useRouter();

  const [accessToken, setAccessToken] = useState<String | null>(null);

  useEffect(() => {
    setAccessToken(localStorage.getItem("accessToken"));

    console.log(accessToken);

    // if (!accessToken) {
    //   router.push("/login");
    // }
  }, [accessToken, router]);

  return (
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
