import React, { useState } from "react";
import arrow from "../assets/logos/arrow.png";

const Collapse = ({ title, filters }) => {
  const [collapse, setCollapse] = useState(true);

  const toggleCollapse = () => {
    setCollapse(!collapse);
  };

  return (
    <div className="collapse" onClick={toggleCollapse}>
      <div className="title-collapse">
        <p>{title}</p>
        <img src={arrow} alt="arrow" className={collapse ? "" : "arrow"} />
      </div>
      {!collapse && (
        <div className="collapse-content ">
          {filters.map((filter, index) => (
            <p key={index} className="text-collapse-content">
              {filter}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default Collapse;
