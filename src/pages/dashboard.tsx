import { GetServerSideProps } from "next";
import { useContext, useEffect } from "react";
import Can from "../../component/Can";
import { withSSRAuth } from "../../utils/withSSRAuth";
import { AuthContext, signOut } from "../contexts/AuthContext";
import { setupApiClient } from "../services/api";
import { api } from "../services/apiClient";

export default function Dashboard() {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    api
      .get("/me")
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <h1>Dashboard: {user?.email}</h1>

      <button onClick={signOut}>Sign Out</button>

      <Can permissions={["metrics.list"]}>
        <div>Métricas</div>
      </Can>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = withSSRAuth(
  async (context) => {
    const apiClient = setupApiClient(context);
    const response = await apiClient.get("/me");

    return {
      props: {},
    };
  }
);
