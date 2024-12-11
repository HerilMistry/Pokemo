import React, { useState, useEffect } from "react";
import Button from "./components/Button";
import "./App.css";

function App() {
  const [pokemonName, setPokemonName] = useState(""); 
  const [pokemonData, setPokemonData] = useState<any>(null); 
  const [error, setError] = useState<string | null>(null);

  const [quizQuestion, setQuizQuestion] = useState<string>("");
  const [quizOptions, setQuizOptions] = useState<string[]>([]);
  const [correctAnswer, setCorrectAnswer] = useState<string | null>(null);
  const [userAnswer, setUserAnswer] = useState<string | null>(null);
  const [quizFeedback, setQuizFeedback] = useState<string | null>(null);

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

  
  const generateQuizQuestion = () => {
    const quizQuestions = [
      {
        question: "Who is the champion of Kalos?",
        options: ["Cynthia", "Alder", "Steve", "Diantha"],
        answer: "Diantha"
      },
      {
        question: "Who was the leader of Team Plasma",
        options: ["Maxie", "Cyrus", "N", "Ghetsis"],
        answer: "Charmander"
      },
      {
        question: "How many total Pokémon were introduced in the first generation?",
        options: ["100", "151", "200", "50"],
        answer: "151"
      },
      {
        question: "How to reach Lentimus town in Unova",
        options: ["Road", "Gogoat", "Ship", "Plane"],
        answer: "Plane"
      },

      {
        question: "Which is the largest city in the pokemon universe?",
        options: ["Goldenrod", "Viridian", "Castelia", "Lumiouse"],
        answer: "Lumiouse"
      }
    ];

    const randomIndex = Math.floor(Math.random() * quizQuestions.length);
    const selectedQuestion = quizQuestions[randomIndex];
    setQuizQuestion(selectedQuestion.question);
    setQuizOptions(selectedQuestion.options);
    setCorrectAnswer(selectedQuestion.answer);
    setUserAnswer(null);
    setQuizFeedback(null);
  };

  const checkAnswer = (selectedOption: string) => {
    setUserAnswer(selectedOption);
    if (selectedOption === correctAnswer) {
      setQuizFeedback("Correct! 🎉");
    } else {
      setQuizFeedback(`Incorrect. The correct answer is ${correctAnswer}.`);
    }
  };

  useEffect(() => {
    generateQuizQuestion();
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="text-center">Pokémon Search</h1>

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

          <p>Type: {pokemonData.types.map((type: any) => type.type.name).join(", ")}</p>
          <p>Height: {pokemonData.height}</p>
          <p>Weight: {pokemonData.weight}</p>
        </div>
      )}

      <div className="mt-5">
        <h2 className="text-center">Pokémon Quiz</h2>

        <div className="quiz-section">
          <p><strong>Question:</strong> {quizQuestion}</p>

          <div className="quiz-options">
            {quizOptions.map((option, index) => (
              <button 
                key={index} 
                onClick={() => checkAnswer(option)} 
                className="btn btn-outline-primary m-2"
                disabled={!!userAnswer} 
              >
                {option}
              </button>
            ))}
          </div>

          {quizFeedback && <p className="mt-3 text-center"><strong>{quizFeedback}</strong></p>}

          <button 
            className="btn btn-success mt-3" 
            onClick={generateQuizQuestion}
          >
            Next Question
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
