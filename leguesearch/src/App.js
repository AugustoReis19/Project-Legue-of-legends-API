import React, { useState } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

function App() {
  const [searchText, setSearchText] = useState("");
  const [playerData, setPlayerData] = useState({});
  const API_KEY = "RGAPI-c738adec-3da1-447b-8e4a-1759241a533c"

  function searchForPlayer(event) {
    //Set up the correct API cail
    var APICallString = "https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/"+ searchText + "?api_key=" + API_KEY;
    // Handle the API call
    axios.get(APICallString).then(function (response) {
      //sucess
      setPlayerData(response.data);
      console.log(playerData);
    }).catch(function(error){
      //error
      console.log(error);
    })
  }

  return (
    <div className="App">
        <div className='container'>
          <h5>Legue of legends Player Searcher</h5>
          <input type='text'onChange={e => setSearchText(e.target.value)}></input>
          <button onClick={e => searchForPlayer(e)}>Search for player</button>
        </div>
        {JSON.stringify(playerData) != '{}' ?
         <>
            <p>{playerData.name}</p>
            <img width="100" height="100" src={"http://ddragon.leagueoflegends.com/cdn/13.10.1/img/profileicon/"+ playerData.profileIconId + ".png"}></img>
            <p>SummonerLevel {playerData.summonerLevel}</p>
         </> 
         : 
         <><p>No player data</p></>
        }
    </div>
  );
}

export default App;
