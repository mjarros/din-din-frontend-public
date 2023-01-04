import api from "../Services/api";
import { getItem } from "./storage";

export default async function handleUpdateEntryInformation({ setLancamentos }) {
  const token = getItem("token");

  try {
    const response = await api.get("/transacao", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const novoArrayLancamentos = [...response.data];

    const arraySortCrescente = novoArrayLancamentos.sort((a, b) => {
      return new Date(a.data) - new Date(b.data);
    });

    setLancamentos(arraySortCrescente);
  } catch (error) {
    // setErrorMsg(`${error.response.data.mensagem}`);
  }
}
