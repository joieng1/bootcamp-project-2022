import "./Home.css";
import RecipeCard from "./RecipePreview";
import recipeData from "../recipeData.json";
import React, { useEffect, useState } from "react";

interface Recipe {
    name: string;
    description: string;
    image: string;
    ingredients: string[];
    instructions: string[];
}

function Home() {
    const [externalRecipes, setExternalRecipes] = useState<Recipe[]>([]);
    const [myRecipes, setMyRecipes] = useState<Recipe[]>([]);
    useEffect(() => {
        fetch("https://bootcamp-milestone-4.onrender.com/recipe")
            .then((res) => res.json())
            .then((data) => {
                setExternalRecipes(data);
            });
        fetch("https://myrecipes-backend.onrender.com/recipe")
            .then((res) => res.json())
            .then((data) => {
                setMyRecipes(data);
            });
    }, []);
    return (
        <main>
            <h1 className="title">Check out some of our favorites!</h1>
            {/* <!-- list of recipes --> */}
            <div className="container-recipes">
                {myRecipes.map((recipe) => (
                    <RecipeCard
                        name={recipe.name}
                        image={recipe.image}
                        desc={recipe.description}
                        external={false}
                    />
                ))}
                {externalRecipes.map((recipe) => (
                    <RecipeCard
                        name={recipe.name}
                        image={recipe.image}
                        desc={recipe.description}
                        external
                    />
                ))}
            </div>
        </main>
    );
}

export default Home;
