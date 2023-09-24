import React, { useState } from "react";
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
        <form className="search-container">
          <input
            type="search"
            className="search-bar"
            placeholder="Rechercher une recette, un ingrédient, ..."
          />
          <button type="submit" className="button-search">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </form>
      </nav>
    </header>
  );
};

export default Header;
