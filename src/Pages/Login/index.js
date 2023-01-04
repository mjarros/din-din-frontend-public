import Header from "../../Components/Header/header";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../Services/api";
import "./styles.css";
import { getItem, setItem } from "../../utils/storage";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const token = getItem("token");
    if (token) {
      navigate("/home");
    }
  });

  function handleChangeInput(e) {
    setErrorMsg("");
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      if (!form.email || !form.password) {
        setErrorMsg("Os dois campos são obrigatórios!");
        return;
      }

      const response = await api.post("/login", {
        email: form.email,
        senha: form.password,
      });

      const { token, usuario } = response.data;
      setItem("token", token);
      setItem("userId", usuario.id);

      navigate("/home");
    } catch (error) {
      setErrorMsg(`${error.message}`);
    }
  }

  return (
    <div className='container-login'>
      <Header></Header>
      <div className='container-login-informacoes'>
        <div className='container-login-cadastro'>
          <h1>
            Controle suas <span>finanças</span>, sem planilha chata.
          </h1>
          <h2>Organizar as suas finanças nunca foi tão fácil, com o DINDIN, você tem tudo num único lugar e em um clique de distância.</h2>
          <button onClick={() => navigate("/cadastre-se")}>Cadastre-se</button>
        </div>
        <form className='container-login-sign' onSubmit={handleSubmit}>
          <h2>Login</h2>
          <label>
            E-mail
            <input type='text' name='email' value={form.email} onChange={handleChangeInput}></input>
          </label>
          <label>
            Password
            <input type='password' name='password' value={form.password} onChange={handleChangeInput}></input>
          </label>
          <button>Entrar</button>
          {errorMsg && <span className='container-login-error_msg'>{errorMsg}</span>}
        </form>
      </div>
    </div>
  );
}

export default Login;
