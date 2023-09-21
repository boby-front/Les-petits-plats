import React from "react";
import logo from "../assets/logos/Logo.png";

const Header = () => {
  return (
    <header>
      <img src={logo} alt="plat asiatique" className="logo" />
      <nav>
        <h1 className="title-nav">
          CHERCHEZ PARMI PLUS DE 1500 RECETTES <br />
          DU QUOTIDIEN, SIMPLE ET DELICIEUSES
        </h1>
        <div className="search-container">
          <input
            type="search"
            className="search-bar"
            placeholder="Rechercher une recette, un ingrédient, ..."
          />
          <button className="button-search">
            <i class="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
