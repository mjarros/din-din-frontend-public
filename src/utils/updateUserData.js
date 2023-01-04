import api from "../Services/api";
import { getItem } from "./storage";

export default async function handleUpdateUserData({ formAtualizarUsuario }) {
  const token = getItem("token");

  try {
    const response = await api.put(
      "/usuario",
      {
        nome: formAtualizarUsuario.nome,
        email: formAtualizarUsuario.email,
        senha: formAtualizarUsuario.password,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response);
  } catch (error) {
    // setErrorMsg(`${error.response.data.mensagem}`);
  }
}
