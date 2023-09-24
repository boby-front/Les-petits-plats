import React, { useState } from "react";
import Collapse from "../components/Collapse";
import { recipes } from "../data/data";
import Card from "../components/Card";

const Main = () => {
  const [collapeIngredients, setcollapeIngredients] = useState(true);
  const [collapeUstencils, setcollapeUstencils] = useState(true);
  const [collapeAppliances, setcollapeAppliances] = useState(true);

  const ingredients = [];
  const appliances = [];
  const ustensils = [];

  recipes.forEach((recipe) => {
    ingredients.push(
      ...recipe.ingredients.map((ingredient) => ingredient.ingredient)
    );
    appliances.push(recipe.appliance);
    ustensils.push(...recipe.ustensils);
  });

  // Utilisation de la méthode Set pour supprimer les doublons et convertissez-la en tableau
  const uniqueIngredients = [...new Set(ingredients)];
  const uniqueAppliances = [...new Set(appliances)];
  const uniqueUstensils = [...new Set(ustensils)];

  return (
    <main>
      <section className="section-filter">
        <div className="collapse-container">
          <Collapse
            title="Ingrédients"
            filters={uniqueIngredients}
            showInput={collapeIngredients}
            setShowInput={setcollapeIngredients}
          />
          <Collapse
            title="Appareils"
            filters={uniqueAppliances}
            showInput={collapeAppliances}
            setShowInput={setcollapeAppliances}
          />
          <Collapse
            title="Ustensiles"
            filters={uniqueUstensils}
            showInput={collapeUstencils}
            setShowInput={setcollapeUstencils}
          />
        </div>
        <p className="text-recipe">1500 recettes</p>
      </section>

      <section className="section-cards">
        {recipes.map((recipe) => (
          <Card
            key={recipe.id}
            img={recipe.image}
            time={recipe.time}
            recipe={recipe.description}
            title={recipe.name}
            ingredients={recipe.ingredients}
          />
        ))}
      </section>
    </main>
  );
};

export default Main;
