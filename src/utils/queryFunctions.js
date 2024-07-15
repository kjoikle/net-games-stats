import api from "../services/api";

// https://www.youtube.com/watch?v=NOvx4LB6Hfk

export async function fetchConnectionsData() {
  const resp = await api.get("/connections");
  return resp.data;
}

export async function fetchStrandsData() {
  const resp = await api.get("/strands");
  return resp.data;
}
