import "./styles.css";
import { useState } from "react";
import closeButton from "../../images/close_button.svg";
import handleUpdateUserData from "../../utils/updateUserData";

export default function ModalEditarUsuario({ openModalEditarUsuario, setOpenModalEditarUsuario, userUpdateInfo }) {
  const [msgErro, setMsgErro] = useState("");

  const [formAtualizarUsuario, setFormAtualizarUsuario] = useState({
    nome: userUpdateInfo.nome,
    email: userUpdateInfo.email,
    password: "",
    confirmPassword: "",
  });

  function handleChangeInput(e) {
    setMsgErro("");
    setFormAtualizarUsuario({
      ...formAtualizarUsuario,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      if (!formAtualizarUsuario.nome || !formAtualizarUsuario.email || !formAtualizarUsuario.password || !formAtualizarUsuario.confirmPassword) {
        setMsgErro("Todos os campos são obrigatórios!");
        return;
      }

      if (formAtualizarUsuario.password !== formAtualizarUsuario.confirmPassword) {
        setMsgErro("A senha deve ser igual a confirmacao de senha!");
        return;
      }
      handleUpdateUserData({ formAtualizarUsuario });
      setOpenModalEditarUsuario(!openModalEditarUsuario);
    } catch (error) {
      setMsgErro(`${error.response.data.mensagem}`);
    }
  }
  return (
    <>
      {openModalEditarUsuario && (
        <div className='modal-background-editarUsuario'>
          <div className='modal-container-editarUsuario'>
            <div className='modal-container-header'>
              <h2>Editar Perfil</h2>
              <img className='modal-container-header-close_button' src={closeButton} onClick={() => setOpenModalEditarUsuario(!openModalEditarUsuario)} alt='imagem_close' />
            </div>
            <form onClick={handleSubmit}>
              <label>
                Nome
                <input type='text' name='nome' value={formAtualizarUsuario.nome} onChange={handleChangeInput}></input>
              </label>
              <label>
                E-mail
                <input type='text' name='email' value={formAtualizarUsuario.email} onChange={handleChangeInput}></input>
              </label>
              <label>
                Senha
                <input type='password' name='password' value={formAtualizarUsuario.password} onChange={handleChangeInput}></input>
              </label>
              <label>
                Confirmação de senha
                <input type='password' name='confirmPassword' value={formAtualizarUsuario.confirmPassword} onChange={handleChangeInput}></input>
              </label>
              <button type='submit'>Confirmar</button>
              {msgErro && <span className='container-cadastro-msg_erro'>{msgErro}</span>}
            </form>
          </div>
        </div>
      )}
    </>
  );
}
