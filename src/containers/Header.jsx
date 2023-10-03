import React, { useState } from "react";
import logo from "../assets/logos/Logo.png";

const Header = ({ onSearch, onResetFilters }) => {
  const [searchInput, setSearchInput] = useState("");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(searchInput);
  };

  // Gestionnaire d'événements pour réinitialiser la recherche et les filtres
  const handleResetSearch = () => {
    setSearchInput("");
    onSearch("");
    onResetFilters(); // Appel de la fonction pour réinitialiser les filtres
  };

  return (
    <header>
      <img src={logo} alt="plat asiatique" className="logo" />
      <nav>
        <h1 className="title-nav">
          CHERCHEZ PARMI PLUS DE 50 RECETTES <br />
          DU QUOTIDIEN, SIMPLE ET DÉLICIEUSES
        </h1>
        <form className="search-container" onSubmit={handleSearchSubmit}>
          <input
            type="text"
            className="search-bar"
            placeholder="Rechercher une recette, un ingrédient, ..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          {searchInput && (
            <button
              type="button"
              className="reset-button"
              onClick={handleResetSearch}
            >
              X
            </button>
          )}
          <button type="submit" className="button-search">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </form>
      </nav>
    </header>
  );
};

export default Header;
