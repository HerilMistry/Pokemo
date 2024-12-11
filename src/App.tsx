import React, { useState } from "react";
import Button from "./components/Button";
import "./App.css";

function App() {
  const [pokemonName, setPokemonName] = useState(""); 
  const [pokemonData, setPokemonData] = useState<any>(null); 
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!pokemonName) {
      setError("Please enter a Pokémon name!");
      setPokemonData(null);
      return;
    }
    setError(null);

    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);
      if (!response.ok) throw new Error("Pokémon not found!");
      const data = await response.json();
      setPokemonData(data);
    } catch (err) {
      setError((err as Error).message);
      setPokemonData(null);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Pokémon Search</h1>

      {/* Custom Pokémon Image */}
      <div className="text-center">
        <img src="/images/custom-pokemon.jpg" alt="Custom Pokémon" className="custom-pokemon-img" />
      </div>

      {/* Input for Pokémon name */}
      <div className="text-center">
        <input
          type="text"
          placeholder="Enter Pokémon name..."
          className="form-control w-50 mx-auto"
          value={pokemonName}
          onChange={(e) => setPokemonName(e.target.value)}
        />
        <Button onClick={handleSearch}>Search</Button>
      </div>

      {/* Display Error Message */}
      {error && <p className="text-danger text-center mt-3">{error}</p>}

      {/* Display Pokémon Information */}
      {pokemonData && (
        <div className="mt-4 text-center">
          <h2>{pokemonData.name.toUpperCase()}</h2>
          
          {/* Pokémon Images */}
          <div className="pokemon-images">
            {pokemonData.sprites?.front_default && (
              <img 
                src={pokemonData.sprites.front_default} 
                alt={`${pokemonData.name} front`} 
                className="pokemon-sprite" 
              />
            )}
            {pokemonData.sprites?.back_default && (
              <img 
                src={pokemonData.sprites.back_default} 
                alt={`${pokemonData.name} back`} 
                className="pokemon-sprite" 
              />
            )}
            {pokemonData.sprites?.front_shiny && (
              <img 
                src={pokemonData.sprites.front_shiny} 
                alt={`${pokemonData.name} shiny front`} 
                className="pokemon-sprite" 
              />
            )}
            {pokemonData.sprites?.back_shiny && (
              <img 
                src={pokemonData.sprites.back_shiny} 
                alt={`${pokemonData.name} shiny back`} 
                className="pokemon-sprite" 
              />
            )}
          </div>

          {/* Pokémon Details */}
          <p>Type: {pokemonData.types.map((type: any) => type.type.name).join(", ")}</p>
          <p>Height: {pokemonData.height}</p>
          <p>Weight: {pokemonData.weight}</p>
        </div>
      )}
    </div>
  );
}

export default App;
