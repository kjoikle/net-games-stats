import axios from "axios";
import { useState } from "react";

function useAxios() {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const axiosInstance = axios.create({
    baseURL: "http://localhost:3000/",
  });

  const fetchData = async ({ url, method, data = {}, params = {} }) => {
    setLoading(true);

    try {
      const resp = await axiosInstance({
        url,
        method,
        data,
        params,
      });
      setResponse(resp.data);
    } catch (err) {
      setError(error.reponse ? error.response.data : error.message);
    } finally {
      setLoading(false);
    }

    return { response, error, loading, fetchData };
  };
}

export default useAxios;
