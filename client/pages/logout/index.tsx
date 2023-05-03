import { useContext, useEffect } from "react";
import Layout from "../components/Layout";
import { AppContext, defaultContext } from "../contexts/AppContext";

const Logout = () => {
  const { updateData } = useContext(AppContext);

  useEffect(() => {
    updateData(defaultContext);
  }, []);

  return (
    <div>
      <Layout>
        <h1 className="text-lg">YOU ARE LOGOUT NOW!</h1>
      </Layout>
    </div>
  );
};

export default Logout;
