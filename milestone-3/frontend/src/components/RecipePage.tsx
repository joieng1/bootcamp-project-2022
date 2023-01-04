import "./RecipePage.css";
import { useParams } from "react-router-dom";

//only for utilizing the first object of recipeData which displays error if recipe does not exist
import React, { useEffect, ChangeEvent, useState } from "react";

interface Recipe {
    link_name?: string;
    name: string;
    description: string;
    image: string;
    ingredients: string[];
    instructions: string[];
}

const RecipePage = (props: Recipe) => {
    const [newIngredient, setNewIngredient] = useState<string>("");
    // State variable stores ingredient data as initial state
    const [allIngredients, setAllIngredients] = useState<string[]>(
        props.ingredients
    );

    const [newInstruction, setNewInstruction] = useState<string>("");
    // State variable stores instruction data as initial state
    const [allInstructions, setAllInstrutctions] = useState<string[]>(
        props.ingredients
    );

    useEffect(() => {
        setAllIngredients(props.ingredients);
        setAllInstrutctions(props.instructions);
    }, [props]);

    function addIngredient(newItem: string) {
        // update local ingredient
        setAllIngredients([...allIngredients, newIngredient]);

        //update database
        fetch(
            `https://myrecipes-backend.onrender.com/recipe/${props.name
                .toLowerCase()
                .replace(/[^a-z0-9]/gi, "")}/ingredient`,
            {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ingredient: newItem,
                }),
            }
        ).catch((err) => console.log("Error:", err));
    }

    function addInstruction(newItem: string) {
        // update local instruction
        setAllInstrutctions([...allInstructions, newInstruction]);

        //update database
        fetch(
            `https://myrecipes-backend.onrender.com/recipe/${props.name
                .toLowerCase()
                .replace(/[^a-z0-9]/gi, "")}/instruction`,
            {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    instruction: newItem,
                }),
            }
        ).catch((err) => console.log("Error:", err));
    }

    return (
        <main>
            <div className="recipe-container">
                <h1 className="title-color text-center">{props.name}</h1>
                <p className="recipe-disc small-font">{props.description}</p>
                <div className="flex-container">
                    <img
                        className="recipe-img"
                        src={props.image}
                        height="300"
                        width="300"
                    />
                    <div className="ingredients">
                        <h1 className="title-color">Ingredients</h1>
                        {/* Renders all ingredients */}
                        <ul className="small-font">
                            {allIngredients.map(function (name, index) {
                                return <li key={index}>{name}</li>;
                            })}
                        </ul>
                        <input
                            className="input-box"
                            placeholder="2 cups of spinach"
                            value={newIngredient} // add newIngredient as the input's value
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                // this event handler updates the value of newIngredient
                                setNewIngredient(e.target.value);
                            }}
                        />
                        <button
                            className="addButton"
                            onClick={() => addIngredient(newIngredient)}
                        >
                            Add Ingredient
                        </button>
                    </div>
                </div>
            </div>
            <div className="recipe-instruct">
                <h1 className="instruct-title title-color">Instructions</h1>
                <ol className="small-font">
                    {/* Renders all instructions */}
                    {allInstructions.map(function (name, index) {
                        return <li key={index}>{name}</li>;
                    })}
                </ol>
                <input
                    className="input-box"
                    placeholder="Mix sugar with salt"
                    value={newInstruction} // add newInstruction as the input's value
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        // this event handler updates the value of newInstruction
                        setNewInstruction(e.target.value);
                    }}
                />
                <button
                    className="addButton"
                    onClick={() => addInstruction(newInstruction)}
                >
                    Add Instruction
                </button>
            </div>
        </main>
    );
};

export default RecipePage;
