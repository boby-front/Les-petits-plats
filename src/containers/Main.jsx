import React, { useState, useEffect } from "react";
import Collapse from "../components/Collapse";
import { recipes } from "../data/data";
import Card from "../components/Card";

const Main = ({ onSearchValue }) => {
  const [selectedFilters, setSelectedFilters] = useState({
    Ingredients: [],
    Appareils: [],
    Ustensiles: [],
  });
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [uniqueKeywords, setUniqueKeywords] = useState({
    Ingredients: [],
    Appareils: [],
    Ustensiles: [],
  });

  useEffect(() => {
    const lowercaseSearchValue = onSearchValue.toLowerCase();

    // Filtrer les recettes en fonction de la recherche
    const filteredBySearch = recipes.filter((recipe) => {
      return (
        recipe.name.toLowerCase().includes(lowercaseSearchValue) ||
        recipe.description.toLowerCase().includes(lowercaseSearchValue) ||
        recipe.ingredients.some(
          (ingredient) =>
            typeof ingredient.ingredient === "string" &&
            ingredient.ingredient.toLowerCase().includes(lowercaseSearchValue)
        )
      );
    });

    // Utiliser les filtres sélectionnés pour filtrer les recettes
    const filteredBySelection = filteredBySearch.filter((recipe) => {
      const selectedIngredients = selectedFilters.Ingredients;
      const selectedAppliances = selectedFilters.Appareils;
      const selectedUstensils = selectedFilters.Ustensiles;

      const appliancesMatch =
        selectedAppliances.length === 0 ||
        selectedAppliances.includes(recipe.appliance.toLowerCase());

      const ustensilsMatch =
        selectedUstensils.length === 0 ||
        recipe.ustensils.some((ustensil) =>
          selectedUstensils.includes(ustensil.toLowerCase())
        );

      const ingredientsMatch =
        selectedIngredients.length === 0 ||
        selectedIngredients.every((selectedIngredient) =>
          recipe.ingredients.some(
            (recipeIngredient) =>
              typeof recipeIngredient.ingredient === "string" &&
              recipeIngredient.ingredient
                .toLowerCase()
                .includes(selectedIngredient.toLowerCase())
          )
        );

      return ingredientsMatch && appliancesMatch && ustensilsMatch;
    });

    setFilteredRecipes(filteredBySelection);

    // Extraire les mots-clés uniques
    const uniqueKeywordsSet = {
      Ingredients: new Set(),
      Appareils: new Set(),
      Ustensiles: new Set(),
    };

    filteredBySelection.forEach((recipe) => {
      recipe.ingredients.forEach((ingredient) => {
        if (typeof ingredient.ingredient === "string") {
          uniqueKeywordsSet.Ingredients.add(
            ingredient.ingredient.toLowerCase().trim()
          );
        }
      });
      uniqueKeywordsSet.Appareils.add(recipe.appliance.toLowerCase());
      recipe.ustensils.forEach((ustensil) => {
        uniqueKeywordsSet.Ustensiles.add(ustensil.toLowerCase());
      });
    });

    const uniqueKeywordsArray = {
      Ingredients: [...uniqueKeywordsSet.Ingredients],
      Appareils: [...uniqueKeywordsSet.Appareils],
      Ustensiles: [...uniqueKeywordsSet.Ustensiles],
    };

    setUniqueKeywords(uniqueKeywordsArray);
  }, [onSearchValue, selectedFilters]);

  const handleValueSelect = (type, values) => {
    setSelectedFilters({
      ...selectedFilters,
      [type]: values,
    });
  };

  return (
    <main>
      <section className="section-filter">
        <div className="collapse-container">
          <Collapse
            title="Ingrédients"
            items={uniqueKeywords.Ingredients}
            onValueSelect={(values) => handleValueSelect("Ingredients", values)}
          />
          <Collapse
            title="Appareils"
            items={uniqueKeywords.Appareils}
            onValueSelect={(values) => handleValueSelect("Appareils", values)}
          />
          <Collapse
            title="Ustensiles"
            items={uniqueKeywords.Ustensiles}
            onValueSelect={(values) => handleValueSelect("Ustensiles", values)}
          />
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
