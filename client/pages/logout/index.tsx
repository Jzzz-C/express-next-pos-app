import { useContext, useEffect } from "react";
import Layout from "../components/Layout";
import { AppContext, defaultContext } from "../contexts/AppContext";
import NavBar from "../components/NavBar";

const Logout = () => {
  const { updateData } = useContext(AppContext);

  useEffect(() => {
    updateData(defaultContext);
  }, []);

  return (
    <div>
      <NavBar />
    </div>
  );
};

export default Logout;
