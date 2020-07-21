import { useContext } from "react";
import { AppContext } from "../context/AppContext";

function useApi() {
  const { api } = useContext(AppContext);
  return api;
}

export default useApi;
