import { GetServerSideProps } from "next";
import { useContext, useEffect } from "react";
import { withSSRAuth } from "../../utils/withSSRAuth";
import { AuthContext } from "../contexts/AuthContext";
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

  return <h1>Dashboard: {user?.email}</h1>;
}

export const getServerSideProps: GetServerSideProps = withSSRAuth(
  async (context) => {
    const apiClient = setupApiClient(context);
    const response = await apiClient.get("/me");

    console.log(response.data);

    return {
      props: {},
    };
  }
);
