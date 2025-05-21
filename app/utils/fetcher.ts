import axios from "axios";

export const fetcher = async (url: string, token?: string) => {
  const { data } = await axios.get(url, {
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    withCredentials: true
  });

  return data;
};
