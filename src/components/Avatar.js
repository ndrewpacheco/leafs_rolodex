import React from "react";

const Avatar = ({ id, fullName }) => {
  let playerImgUrl = `https://cms.nhl.bamgrid.com/images/headshots/current/168x168/${id}.jpg`;
  let defaultImgUrl =
    "https://live.staticflickr.com/65535/52340120977_f154705256_m.jpg";

  const addDefaultSrc = (e) => {
    e.target.src = defaultImgUrl;
  };
  return (
    <div className='player--avatar'>
      {" "}
      <img
        src={playerImgUrl}
        alt={`${fullName}'s Avatar`}
        onError={addDefaultSrc}
      />
    </div>
  );
};

export default Avatar;
