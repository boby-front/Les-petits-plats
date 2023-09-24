import React from "react";

const Card = ({ img, recipe, time, ingredients, title }) => {
  console.log(ingredients);

  return (
    <div className="card">
      <p className="time-text">{time} mn</p>
      <img src={img} alt={title} />

      <div className="text-card">
        <h2>{title}</h2>
        <h3>RECETTE</h3>
        <p className="recipe-text">{recipe}</p>
        <h3>INGREDIENTS</h3>
        <div className="ingredients-container">
          {ingredients &&
            ingredients.map((ingredient, index) => (
              <div key={index} className="ingredient-quantity">
                <p className="ingredient">{ingredient.ingredient}</p>
                <p className="quantity">
                  {ingredient.quantity}
                  {ingredient.unit}
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Card;
