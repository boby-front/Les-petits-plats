import React, { useState } from "react";
import arrow from "../assets/logos/arrow.png";

const Collapse = ({ title, items }) => {
  const [collapse, setCollapse] = useState(true);
  const [valueInput, setValueInput] = useState(null);

  const toggleCollapse = () => {
    setCollapse(!collapse);
  };

  const stopPropagation = (e) => e.stopPropagation();

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
              <p key={index} className="text-collapse-content">
                {item}
              </p>
            ))}
          </div>
        </div>
      )}
      {valueInput !== null && (
        <div className="value-collapse-selected">
          <p className="text-collapse-selected "></p>
          <span className="delete-value-selected ">x</span>
        </div>
      )}
    </div>
  );
};

export default Collapse;
