import "./styles.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../Services/api";

function Cadastro() {
  const navigate = useNavigate();
  const [msgErro, setMsgErro] = useState("");

  const [form, setForm] = useState({
    nome: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  function handleChangeInput(e) {
    setMsgErro("");
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      if (!form.nome || !form.email || !form.password || !form.confirmPassword) {
        setMsgErro("Todos os campos são obrigatórios!");
        return;
      }

      if (form.password !== form.confirmPassword) {
        setMsgErro("A senha deve ser igual a confirmacao de senha!");
        return;
      }

      console.log(form);

      await api.post("/usuario", {
        nome: form.nome,
        email: form.email,
        senha: form.password,
      });

      navigate("/");
    } catch (error) {
      console.log(error);
      setMsgErro(`${error.message}`);
    }
  }

  return (
    <div className='container-cadastro'>
      <form onClick={handleSubmit}>
        <h2>Cadastre-se</h2>
        <label>
          Nome
          <input type='text' name='nome' value={form.nome} onChange={handleChangeInput}></input>
        </label>
        <label>
          E-mail
          <input type='text' name='email' value={form.email} onChange={handleChangeInput}></input>
        </label>
        <label>
          Senha
          <input type='password' name='password' value={form.password} onChange={handleChangeInput}></input>
        </label>
        <label>
          Confirmação de senha
          <input type='password' name='confirmPassword' value={form.confirmPassword} onChange={handleChangeInput}></input>
        </label>
        <button type='submit'>Cadastrar</button>
        <span className='container-cadastro-span_clique_aqui' onClick={() => navigate("/")}>
          Já tem cadastro? Clique aqui!
        </span>
        {msgErro && <span className='container-cadastro-msg_erro'>{msgErro}</span>}
      </form>
    </div>
  );
}

export default Cadastro;
