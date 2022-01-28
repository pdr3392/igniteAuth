import { GetServerSideProps } from "next";
import { withSSRAuth } from "../../utils/withSSRAuth";
import { setupApiClient } from "../services/api";
import decode from "jwt-decode";

export default function Metrics() {
  return (
    <>
      <h1>Metrics</h1>
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
  },
  {
    permissions: ["metrics.list"],
    roles: ["administrator"],
  }
);
