import React, { useState, useEffect } from "react";
import Collapse from "../components/Collapse";
import { recipes } from "../data/data";
import Card from "../components/Card";

const Main = ({ onSearchValue }) => {
  // État pour stocker les filtres sélectionnés
  const [selectedFilters, setSelectedFilters] = useState({
    Ingredients: [],
    Appareils: [],
    Ustensiles: [],
  });

  // État pour stocker les recettes filtrées
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  // État pour stocker les mots-clés uniques des filtres
  const [uniqueKeywords, setUniqueKeywords] = useState({
    Ingredients: [],
    Appareils: [],
    Ustensiles: [],
  });

  useEffect(() => {
    // Fonction de recherche : filtre les recettes en fonction de la valeur de recherche
    const lowercaseSearchValue = onSearchValue.toLowerCase();
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

    // Fonction de filtrage : filtre les recettes en fonction des filtres sélectionnés
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

    // Met à jour les recettes filtrées
    setFilteredRecipes(filteredBySelection);

    // Obtient les mots-clés uniques des filtres
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

    // Met à jour les mots-clés uniques des filtres
    const uniqueKeywordsArray = {
      Ingredients: [...uniqueKeywordsSet.Ingredients],
      Appareils: [...uniqueKeywordsSet.Appareils],
      Ustensiles: [...uniqueKeywordsSet.Ustensiles],
    };

    setUniqueKeywords(uniqueKeywordsArray);
  }, [onSearchValue, selectedFilters]);

  // Fonction appelée lors de la sélection/désélection de valeurs dans les filtres
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
