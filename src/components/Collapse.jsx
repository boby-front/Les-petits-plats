import React, { useState } from "react";
import arrow from "../assets/logos/arrow.png";

const Collapse = ({ title, items, onValueSelect }) => {
  const [collapse, setCollapse] = useState(true);
  const [selectedValues, setSelectedValues] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  // Fonction pour basculer l'état d'effondrement
  const toggleCollapse = () => {
    setCollapse(!collapse);
  };

  // Fonction pour arrêter la propagation d'événements lors de la recherche
  const stopPropagation = (e) => e.stopPropagation();

  // Fonction appelée lors de la sélection ou de la désélection d'une valeur
  const handleValueSelect = (value) => {
    const updatedValues = selectedValues.includes(value)
      ? selectedValues.filter((item) => item !== value)
      : [...selectedValues, value];

    setSelectedValues(updatedValues);
    onValueSelect(updatedValues);
  };

  // Fonction appelée lors du changement de la valeur de recherche
  const handleSearchInputChange = (e) => {
    const inputValue = e.target.value;
    setSearchValue(inputValue);
  };

  return (
    <div className="collapse " onClick={toggleCollapse}>
      <div className="title-collapse">
        <p>{title}</p>
        <img src={arrow} alt="arrow" className={collapse ? "arrow" : ""} />
      </div>
      {!collapse && (
        <div className="collapse-content">
          <div className="search-input-collapse">
            <input
              type="search"
              onClick={stopPropagation}
              onChange={handleSearchInputChange}
              value={searchValue}
            />
            <i
              className="fa-solid fa-magnifying-glass"
              onClick={stopPropagation}
            ></i>
          </div>
          <div className="value-collapse" onClick={stopPropagation}>
            {items
              .filter((item) =>
                item.toLowerCase().includes(searchValue.toLowerCase())
              )
              .map((item, index) => (
                <div key={index} className="filter-item">
                  <p
                    className={`text-collapse-content ${
                      selectedValues.includes(item) ? "selected" : ""
                    }`}
                    onClick={() => handleValueSelect(item)}
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}{" "}
                    {selectedValues.includes(item) && (
                      <span
                        className="remove-filter"
                        onClick={() => handleValueSelect(item)}
                      >
                        X
                      </span>
                    )}
                  </p>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Collapse;
