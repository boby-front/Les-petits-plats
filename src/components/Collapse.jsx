import React, { useState } from "react";
import arrow from "../assets/logos/arrow.png";

const Collapse = ({ title, items, onValueSelect }) => {
  const [collapse, setCollapse] = useState(true);
  const [selectedValues, setSelectedValues] = useState([]);

  const toggleCollapse = () => {
    setCollapse(!collapse);
  };

  const stopPropagation = (e) => e.stopPropagation();

  const handleValueSelect = (value) => {
    const updatedValues = [...selectedValues];
    if (updatedValues.includes(value)) {
      updatedValues.splice(updatedValues.indexOf(value), 1);
    } else {
      updatedValues.push(value);
    }
    setSelectedValues(updatedValues);
    onValueSelect(updatedValues);
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
            <input type="search" onClick={stopPropagation} />
            <i
              className="fa-solid fa-magnifying-glass"
              onClick={(e) => stopPropagation(e)}
            ></i>
          </div>
          <div className="value-collapse">
            {items.map((item, index) => (
              <p
                key={index}
                className={`text-collapse-content ${
                  selectedValues.includes(item) ? "selected" : ""
                }`}
                onClick={() => handleValueSelect(item)}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}{" "}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Collapse;
