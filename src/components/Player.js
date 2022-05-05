import React, { useState, useEffect } from "react";
import Avatar from "./Avatar";
import ToggleButton from "./ToggleButton";

const Player = ({ id, position, handleTag, tags }) => {
  const [isToggled, setIsToggled] = useState(false);
  const [player, setPlayer] = useState([]);
  const [stats, setStats] = useState({});
  const playerUrl = `https://statsapi.web.nhl.com/api/v1/people/${id}?expand=person.stats&stats=careerRegularSeason&expand=stats.team&site=en_nhlCA`;
  useEffect(() => {
    fetch(playerUrl)
      .then((res) => res.json())
      .then((data) => {
        setPlayer(data.people[0]);
        setStats(data.people[0].stats[0].splits[0]?.stat || {});
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [id, playerUrl]);

  const { fullName, birthCity, birthCountry, birthDate, weight, height } =
    player;

  const handleToggleStats = () => {
    setIsToggled((prev) => !prev);
  };

  const playerStats = (
    <>
      <li>Points: {stats.points || 0}</li>
      <li>Goals: {stats.goals || 0}</li>
      <li>Assists: {stats.assists || 0}</li>
      <li>Penalty Minutes: {stats.penaltyMinutes || 0}</li>
      <li>Hits: {stats.hits || 0}</li>
      <li>Time On Ice Per Game: {stats.timeOnIcePerGame || 0}</li>
    </>
  );
  const goalieStats = (
    <>
      <li>Save Percentage: {stats.savePercentage || 0}</li>
      <li>Wins: {stats.wins || 0}</li>
      <li>Shutouts: {stats.shutouts || 0}</li>
      <li>Goals Against Average: {stats.goalAgainstAverage || 0}</li>
    </>
  );
  const seasonStats = (
    <ul className='stats'>
      {position !== "Goalie" ? playerStats : goalieStats}
    </ul>
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTag = e.target[0].value;
    handleTag(id, newTag);
    e.target.reset();
  };

  const playerForm = (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        className='tag-input'
        id='tag-input'
        placeholder='Add a tag'
      />
    </form>
  );

  const playerTags = (
    <div className='tags'>
      {tags && tags.length > 0 && (
        <ul>
          {tags.map((tag, idx) => (
            <li key={idx}>{tag}</li>
          ))}
        </ul>
      )}
      {playerForm}
    </div>
  );

  const playerDescription = (
    <div className='player--info'>
      <h2>{fullName}</h2>
      <ul>
        <li>Position: {position}</li>

        <li>
          Birthplace: {birthCity}, {birthCountry}
        </li>
        <li>Birthdate: {birthDate}</li>
        <li>Weight: {weight}</li>
        <li>Height: {height}</li>
        <li>Career Regular Season Stats: {isToggled && seasonStats}</li>
      </ul>

      {playerTags}
    </div>
  );

  return (
    <div key={id} className='player'>
      <Avatar id={id} fullName={fullName} />
      {playerDescription}
      <ToggleButton
        handleToggleStats={handleToggleStats}
        isToggled={isToggled}
      />
    </div>
  );
};

export default Player;
