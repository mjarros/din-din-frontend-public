import "./styles.css";
import { getItem } from "../../utils/storage";
import polygon from "../../images/polygon.svg";
import headerExit from "../../images/header_exit.svg";
import profileShadow from "../../images/profile_shadow.svg";
import { useEffect, useState } from "react";
import { removeItem } from "../../utils/storage";
import { useNavigate } from "react-router-dom";
import api from "../../Services/api";

function Header({ openModalEditarUsuario, setOpenModalEditarUsuario, setUserUpdateInfo }) {
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  function logout() {
    removeItem("token");
    removeItem("userId");
    navigate("/");
  }

  useEffect(() => {
    handleUpdateUserInformation({ getItem, setUser });
    // eslint-disable-next-line
  }, []);

  async function handleUpdateUserInformation({ getItem, setUser }) {
    const token = getItem("token");

    try {
      const response = await api.get("/usuario", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data);
      setUserUpdateInfo(response.data);
    } catch (error) {}
  }

  return (
    <div className='container-header'>
      <div className='container-header-logo'>
        <img src={polygon} alt='imagem_polygon'></img>
        <span>Dindin</span>
      </div>
      {getItem("token") && (
        <div className='container-header-profile'>
          <img className='cursor_pointer' onClick={() => setOpenModalEditarUsuario(!openModalEditarUsuario)} src={profileShadow} alt='imagem_profile' />
          <span>{user.nome}</span>
          <img className='container-header-profile-exitLogo' onClick={() => logout()} src={headerExit} alt='imagem_exit' />
        </div>
      )}
    </div>
  );
}

export default Header;
