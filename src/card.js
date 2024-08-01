import React, { useState, useEffect } from "react";
import Axios from "axios";

function Card({ NameOfPokemon, inputtext }) {
  const [pokemonDetails, setPokemonDetails] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      const details = await Promise.all(
        NameOfPokemon.map(async (pokemon) => {
          const response = await Axios.get(pokemon.url);
          return {
            name: pokemon.name,
            weight: response.data.weight,
            height: response.data.height,
            nationalNumber: response.data.id,
            image: response.data.sprites.front_default,
            typeone: response.data.types.map((type) => type.type.name),
            ability: response.data.abilities.map((ability) => ability.ability.name),
            baseexperience: response.data.base_experience,
          };
        })
      );
      setPokemonDetails(details);
    };

    fetchPokemonDetails();
  }, [NameOfPokemon]);

  useEffect(() => {
    if (inputtext === '') {
      setFilteredData(pokemonDetails);
    } else {
      setFilteredData(
        pokemonDetails.filter((el) =>
          el.name.toLowerCase().startsWith(inputtext.toLowerCase())
        )
      );
    }
  }, [inputtext, pokemonDetails]);

 
   
     
      return (

      <div className="container fade-transition">
        
        {filteredData
          .sort((a, b) => a.nationalNumber - b.nationalNumber).map((item, index) => (
          <div className="card playwrite-be-vlg-">
          <h2 className="pokemonname">{item.name}</h2>
              <img src={item.image} alt={item.name} className="image" loading="lazy"/>
              <p>National Number: {item.nationalNumber}</p>
              <p>Weight: {item.weight}</p>
              <p>Height: {item.height}</p>
              {item.typeone.map((type, typeIndex) => (
                <p key={typeIndex}>Type {typeIndex+1}: {type}</p>
              ))}
              {item.ability.map((ability, abilityIndex) => (
                <p key={abilityIndex}>Ability {abilityIndex + 1}: {ability}</p>
              ))}
              <p>Base Experience: {item.baseexperience}</p>
            </div>
        ))
        }

   </div>
);}
export default Card;