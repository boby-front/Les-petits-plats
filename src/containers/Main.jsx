import React, { useState, useEffect } from "react";
import Collapse from "../components/Collapse";
import { recipes } from "../data/data";
import Card from "../components/Card";

const Main = ({ onSearchValue }) => {
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [uniqueIngredients, setUniqueIngredients] = useState([]);
  const [uniqueAppliances, setUniqueAppliances] = useState([]);
  const [uniqueUstensils, setUniqueUstensils] = useState([]);

  useEffect(() => {
    if (onSearchValue) {
      const lowercaseSearchValue = onSearchValue.toLowerCase();
      const filtered = recipes.filter((recipe) => {
        // Filtrer par titre de recette
        if (recipe.name.toLowerCase().includes(lowercaseSearchValue)) {
          return true;
        }
        // Filtrer par description de recette
        if (recipe.description.toLowerCase().includes(lowercaseSearchValue)) {
          return true;
        }
        // Filtrer par ingrédients
        for (const ingredient of recipe.ingredients) {
          if (
            typeof ingredient.ingredient === "string" &&
            ingredient.ingredient.toLowerCase().includes(lowercaseSearchValue)
          ) {
            return true;
          }
        }
        return false;
      });
      setFilteredRecipes(filtered);

      // Extraire les mots-clés uniques des ingrédients, des appareils et des ustensiles
      const uniqueIngredientsSet = new Set();
      const uniqueAppliancesSet = new Set();
      const uniqueUstensilsSet = new Set();

      filtered.forEach((recipe) => {
        recipe.ingredients.forEach((ingredient) => {
          if (typeof ingredient.ingredient === "string") {
            uniqueIngredientsSet.add(ingredient.ingredient.toLowerCase());
          }
        });
        uniqueAppliancesSet.add(recipe.appliance.toLowerCase());
        recipe.ustensils.forEach((ustensil) => {
          uniqueUstensilsSet.add(ustensil.toLowerCase());
        });
      });

      const uniqueIngredientsArray = [...uniqueIngredientsSet];
      const uniqueAppliancesArray = [...uniqueAppliancesSet];
      const uniqueUstensilsArray = [...uniqueUstensilsSet];

      setUniqueIngredients(uniqueIngredientsArray);
      setUniqueAppliances(uniqueAppliancesArray);
      setUniqueUstensils(uniqueUstensilsArray);
    } else {
      setFilteredRecipes(recipes);
      // Extraire les mots-clés uniques pour toutes les recettes lorsque la recherche est vide
      const allIngredientsSet = new Set();
      const allAppliancesSet = new Set();
      const allUstensilsSet = new Set();

      recipes.forEach((recipe) => {
        recipe.ingredients.forEach((ingredient) => {
          if (typeof ingredient.ingredient === "string") {
            allIngredientsSet.add(ingredient.ingredient.toLowerCase());
          }
        });
        allAppliancesSet.add(recipe.appliance.toLowerCase());
        recipe.ustensils.forEach((ustensil) => {
          allUstensilsSet.add(ustensil.toLowerCase());
        });
      });

      const allIngredientsArray = [...allIngredientsSet];
      const allAppliancesArray = [...allAppliancesSet];
      const allUstensilsArray = [...allUstensilsSet];

      setUniqueIngredients(allIngredientsArray);
      setUniqueAppliances(allAppliancesArray);
      setUniqueUstensils(allUstensilsArray);
    }
  }, [onSearchValue]);

  return (
    <main>
      <section className="section-filter">
        <div className="collapse-container">
          <Collapse title="Ingrédients" items={uniqueIngredients} />
          <Collapse title="Appareils" items={uniqueAppliances} />
          <Collapse title="Ustensiles" items={uniqueUstensils} />
        </div>
        <p className="text-recipe">{filteredRecipes.length} recettes</p>
      </section>

      <section className="section-cards">
        {filteredRecipes.map((recipe) => (
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
