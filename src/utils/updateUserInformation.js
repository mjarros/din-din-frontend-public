import api from "../Services/api";

export default async function handleUpdateUserInformation({ getItem, setUser }) {
  const token = getItem("token");

  try {
    const response = await api.get("/usuario", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setUser(response.data);
  } catch (error) {}
}
