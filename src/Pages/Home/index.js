import "./styles.css";
import Header from "../../Components/Header/header";
import MainContainerResumoAddRegistro from "../../Components/Main-Resumo-AddRegistro";
import ExibirModalAddRegistro from "../../Components/Modal-Add-Registro";
import PainelRegistros from "../../Components/PainelRegistros";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getItem } from "../../utils/storage";
import handleUpdateEntryInformation from "../../utils/updateEntryInformation";
import ModalEditarUsuario from "../../Components/Modal-Editar-Usuario";

function Home() {
  const navigate = useNavigate();
  const [arrayCategories, setArrayCategories] = useState([]);
  const [modalAddRegistro, setModalAddRegistro] = useState(false);
  const [idTransacao, setIdTransacao] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [lancamentos, setLancamentos] = useState([]);
  const [openModalEditarUsuario, setOpenModalEditarUsuario] = useState(false);
  const [userUpdateInfo, setUserUpdateInfo] = useState({});
  const [categorieEditarEntrada, setCategorieEditarEntrada] = useState({
    id: "",
    descricao: "",
  });

  function navigateHome() {
    navigate("/");
  }

  useEffect(() => {
    handleUpdateEntryInformation({ getItem, setLancamentos });

    const token = getItem("token");
    if (!token) {
      navigateHome();
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <div className='home-header'>
        <Header openModalEditarUsuario={openModalEditarUsuario} setOpenModalEditarUsuario={setOpenModalEditarUsuario} setUserUpdateInfo={setUserUpdateInfo}></Header>
      </div>
      <div className='home-main'>
        <PainelRegistros idTransacao={idTransacao} setIdTransacao={setIdTransacao} lancamentos={lancamentos} setLancamentos={setLancamentos} categorieEditarEntrada={categorieEditarEntrada} setCategorieEditarEntrada={setCategorieEditarEntrada} arrayCategories={arrayCategories} setArrayCategories={setArrayCategories} />
        <MainContainerResumoAddRegistro modalAddRegistro={modalAddRegistro} setModalAddRegistro={setModalAddRegistro} lancamentos={lancamentos} />
      </div>
      <ExibirModalAddRegistro modalAddRegistro={modalAddRegistro} setModalAddRegistro={setModalAddRegistro} errorMsg={errorMsg} setErrorMsg={setErrorMsg} arrayCategories={arrayCategories} setArrayCategories={setArrayCategories} setLancamentos={setLancamentos} />
      {openModalEditarUsuario && <ModalEditarUsuario openModalEditarUsuario={openModalEditarUsuario} setOpenModalEditarUsuario={setOpenModalEditarUsuario} userUpdateInfo={userUpdateInfo} />}
    </div>
  );
}

export default Home;
