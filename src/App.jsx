import React, { useState } from "react";
import "./App.css";
import Header from "./containers/Header";
import Main from "./containers/Main";

function App() {
  // État pour stocker la valeur de recherche
  const [searchValue, setSearchValue] = useState("");

  // État pour stocker l'état de réinitialisation des filtres
  const [resetFilters, setResetFilters] = useState(false);

  // Fonction appelée lors de la recherche
  const handleSearch = (value) => {
    // Met à jour la valeur de recherche
    setSearchValue(value);

    // Active la réinitialisation des filtres
    setResetFilters(true);
  };

  // Fonction appelée lors de la réinitialisation des filtres
  const handleFiltersReset = () => {
    setResetFilters(false);
  };

  return (
    <>
      <Header onSearch={handleSearch} onResetFilters={handleFiltersReset} />
      <Main onSearchValue={searchValue} resetFilters={resetFilters} />{" "}
    </>
  );
}

export default App;
