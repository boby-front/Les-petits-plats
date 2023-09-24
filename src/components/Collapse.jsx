import React, { useState } from "react";
import arrow from "../assets/logos/arrow.png";

const Collapse = ({ title, filters, showInput, setShowInput }) => {
  const [collapse, setCollapse] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const toggleCollapse = () => {
    setCollapse(!collapse);
    setShowInput(!showInput);
  };

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  // Fonction pour mettre à jour la valeur de l'input
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div
      className={`collapse ${showInput ? "collapsed" : ""}`}
      onClick={toggleCollapse}
    >
      <div className="title-collapse">
        <p>{title}</p>
        <img src={arrow} alt="arrow" className={collapse ? "" : "arrow"} />
      </div>

      {!collapse && (
        <div className="collapse-content">
          {!showInput && (
            <div className="search-input-collapse">
              <input
                type="search"
                onClick={stopPropagation}
                value={inputValue}
                onChange={handleInputChange}
              />
              <i className="fa-solid fa-magnifying-glass"></i>
            </div>
          )}
          {filters
            .filter((filter) =>
              filter.toLowerCase().includes(inputValue.toLowerCase())
            )
            .map((filter, index) => (
              <div className="value-collapse">
                <p key={index} className="text-collapse-content">
                  {filter}
                </p>
                <span className="delete-value-selected">x</span>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Collapse;
