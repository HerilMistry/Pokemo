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

      
      <div className="text-center">
        <img src="/images/custom-pokemon.jpg" alt="Custom Pokémon" className="custom-pokemon-img" />
      </div>

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

      {error && <p className="text-danger text-center mt-3">{error}</p>}

      {pokemonData && (
        <div className="mt-4 text-center">
          <h2>{pokemonData.name.toUpperCase()}</h2>
          
          <div className="pokemon-images">
            {Object.entries(pokemonData.sprites)
              .filter(([key, value]) => value && typeof value === "string") 
              .map(([key, value]) => (
                <img key={key} src={value} alt={`${pokemonData.name} ${key}`} className="pokemon-sprite" />
              ))}
          </div>

          <p>Type: {pokemonData.types.map((type: any) => type.type.name).join(", ")}</p>
          <p>Height: {pokemonData.height}</p>
          <p>Weight: {pokemonData.weight}</p>
        </div>
      )}
    </div>
  );
}

export default App;
