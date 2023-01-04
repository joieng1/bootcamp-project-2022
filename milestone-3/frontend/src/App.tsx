import { BrowserRouter, Routes, Route } from "react-router-dom";

//App components
import RecipePage from "./components/RecipePage";
import recipeData from "./recipeData.json";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import { useEffect, useState } from "react";

interface Recipe {
    link_name?: string;
    name: string;
    description: string;
    image: string;
    ingredients: string[];
    instructions: string[];
}
function App() {
    const [externalRecipes, setExternalRecipes] = useState<Recipe[]>([]);
    const [myRecipes, setMyRecipes] = useState<Recipe[]>([]);

    useEffect(() => {
        fetch("https://bootcamp-milestone-4.onrender.com/recipe")
            .then((response) => response.json())
            .then((data) => {
                // console.log(data);
                setExternalRecipes(data);
            });
    }, []);

    useEffect(() => {
        fetch("https://myrecipes-backend.onrender.com/recipe")
            .then((response) => response.json())
            .then((data) => {
                setMyRecipes(data);
            });
    }, []);

    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                {/* map routes for all recipes in myRecipes */}
                {myRecipes.map((recipe) => (
                    <Route
                        path={`/recipes/${recipe.link_name}`}
                        element={
                            <RecipePage
                                name={recipe.name}
                                description={recipe.description}
                                image={recipe.image}
                                ingredients={recipe.ingredients}
                                instructions={recipe.instructions}
                            />
                        }
                    />
                ))}
                {/* map routes for all recipes in externalRecipes */}
                {externalRecipes.map((recipe) => (
                    <Route
                        path={`/externalRecipe/${recipe.name
                            .toLowerCase()
                            .replace(/[^a-z0-9]/gi, "")}`}
                        element={
                            <RecipePage
                                name={recipe.name}
                                description={recipe.description}
                                image={recipe.image}
                                ingredients={recipe.ingredients}
                                instructions={recipe.instructions}
                            />
                        }
                    />
                ))}
            </Routes>
        </BrowserRouter>
    );
}

export default App;
