import "../src/styles.css";
import React, { useState, useEffect } from 'react';
import Card from "./card";
import Axios from 'axios';
import { Button } from "react-bootstrap";

function App() {

const [url,seturl]=useState('https://pokeapi.co/api/v2/pokemon');
const [nexturl,setnexturl]=useState();
const [prevurl,setprevurl]=useState();
const [pokemonname,setpokemonname]=useState([]);
const [input,setinput]=useState("");
let handleInput = (e) => {
  //convert input text to lower case
  var lowerCase = e.target.value.toLowerCase();
  setinput(lowerCase);
};
  useEffect(() => {
    Axios.get(url)
      .then((res) => {
        setpokemonname(res.data.results);
        setnexturl(res.data.next);
        setprevurl(res.data.previous);
       // Log the results for debugging
      })
      .catch((err) => {
        console.error(err.message); // Log any errors
      });
  }, [url]); // Empty dependency array means this runs once when the component mounts

  return (
    <div className="App ">
      <h1 className="search-button ">Pokemon Data</h1>
      <input className="search-button" type="search" placeholder="Search for pokemon here" id="inputfromuser" onChange={handleInput}/>
 
      <Card NameOfPokemon={pokemonname} inputtext={input}/> {/* Pass the state as a prop to Card */}
      <Button  onClick={()=>{
      seturl(prevurl)
     }} className="button-30">⬅️</Button>
     <Button onClick={()=>{
      seturl(nexturl)
     }} className="button-30">➡️</Button>
      
    </div>
  );
}

export default App;
