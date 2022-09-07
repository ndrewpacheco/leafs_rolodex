import { useEffect, useState } from "react";

import "./App.css";
import Player from "./components/Player";
import SearchInput from "./components/SearchInput";

function App() {
  const [players, setPlayers] = useState([]);
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [searchInputs, setSearchInputs] = useState({ name: "", tag: "" });
  const [tagData, setTagData] = useState({});

  // fetch team roster data
  const teamId = "10"; // Toronto Maple Leafs ID
  const teamRosterLink = `https://statsapi.web.nhl.com/api/v1/teams/${teamId}?expand=team%2Eroster`;

  useEffect(() => {
    fetch(teamRosterLink)
      .then((res) => res.json())
      .then((data) => setPlayers(data.teams[0].roster.roster))
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [teamRosterLink]);

  // Handle tag input
  const handleTag = (playerId, tag) => {
    setTagData((prevData) => {
      if (prevData[playerId]) {
        return {
          ...prevData,
          [playerId]: [...prevData[playerId], tag],
        };
      } else {
        return {
          ...prevData,
          [playerId]: [tag],
        };
      }
    });
  };

  // Handle search input
  const handleSearch = (event, search) => {
    const newSearch = event.target.value;
    setSearchInputs((prevSearchInputs) => ({
      ...prevSearchInputs,
      [search]: newSearch,
    }));
  };

  // Name and tag search logic
  useEffect(() => {
    const nameRegex = new RegExp(searchInputs.name, "i");
    const tagRegex = new RegExp(searchInputs.tag, "i");

    const tagSearchCriteria = (player) =>
      tagData[player.person.id] &&
      tagData[player.person.id].some((tag) => tag.match(tagRegex));

    const nameSearchCriteria = (player) => {
      const [firstName, lastName] = player.person.fullName.split(" ");
      return firstName.match(nameRegex) || lastName.match(nameRegex);
    };

    const searchLogic = (prevPlayers) => {
      if (searchInputs.name.length > 0 && searchInputs.tag.length > 0) {
        return prevPlayers.filter(
          (player) => nameSearchCriteria(player) && tagSearchCriteria(player)
        );
      } else if (searchInputs.name.length > 0) {
        return players.filter(nameSearchCriteria);
      } else if (searchInputs.tag.length > 0) {
        return players.filter(tagSearchCriteria);
      } else {
        return players;
      }
    };

    setFilteredPlayers(searchLogic);
  }, [searchInputs.name, searchInputs.tag, players, tagData]);

  const displayPlayers = (
    <div className='players'>
      {filteredPlayers.map((player) => {
        return (
          <Player
            position={player.position.name}
            key={player.person.id}
            id={player.person.id}
            handleTag={handleTag}
            tags={tagData[player.person.id] ? tagData[player.person.id] : ""}
          />
        );
      })}
    </div>
  );

  const displaySearchInputs = (
    <div className='search-area'>
      <SearchInput
        type='name'
        value={searchInputs.name}
        handleOnChange={(e) => {
          handleSearch(e, "name");
        }}
      />
      <SearchInput
        type='tag'
        value={searchInputs.tag}
        handleOnChange={(e) => {
          handleSearch(e, "tag");
        }}
      />
    </div>
  );

  return (
    <div className='container'>
      {displaySearchInputs}
      {displayPlayers}
    </div>
  );
}

export default App;
