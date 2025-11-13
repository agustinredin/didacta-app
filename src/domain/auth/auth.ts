import { apiClient } from "../../core/api";

export async function signInWithGoogle(idToken: string) {
  const { data } = await apiClient.post("/auth/google", { id_token: idToken });
  if (data?.accessToken) localStorage.setItem("token", data.accessToken);
  return data;
}
