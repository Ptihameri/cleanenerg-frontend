import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css";

const Header = () => {
  const [logado, setLogado] = useState(false);

  useEffect(() => {
    const checkLoginStatus = () => {
      if (localStorage.getItem("token")) {
        setLogado(true);
      } else {
        setLogado(false);
      }
    };

    // Check login status on component mount
    checkLoginStatus();

    // Add event listener for storage changes
    window.addEventListener("storage", checkLoginStatus);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("storage", checkLoginStatus);
    };
  }, []);

  function Private() {
    if (!logado) {
      return (
        <>
          <li className="nav-item">
            <Link to="/login">Login</Link>
          </li>
          <li className="nav-item">
            <Link to="/Register">Registro</Link>
          </li>
        </>
      );
    } else {
      return (
        <>
          <li className="nav-item">
            <Link to="/user">Usuario</Link>
          </li>
          <li className="nav-item">
            <Link to="/login">Sair</Link>
          </li>
        </>
      );
    }
  }

  return (
    <header className="header">
      <nav className="nav">
        <ul className="nav-list">
          <li className="nav-item">
            <Link to="/">Projetos</Link>
          </li>
          <li className="nav-item">
            <Link to="/doacoes">Doacao</Link>
          </li>
          <Private />
        </ul>
      </nav>
    </header>
  );
};

export default Header;
