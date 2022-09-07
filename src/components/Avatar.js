import React, { useState } from "react";

const Avatar = ({ id, fullName }) => {
  const defaultImgUrl =
    "https://live.staticflickr.com/65535/52340120977_f154705256_m.jpg";
  const playerImgUrl = `https://cms.nhl.bamgrid.com/images/headshots/current/168x168/${id}.jpg`;

  const [photo, setPhoto] = useState(playerImgUrl);

  // add default image if player image is broken
  const addDefaultSrc = (e) => {
    setPhoto(defaultImgUrl);
    e.onerror = null;
    e.target.src = defaultImgUrl;
  };

  return (
    <div className='player--avatar'>
      <img src={photo} alt={`${fullName}'s Avatar`} onError={addDefaultSrc} />
    </div>
  );
};

export default Avatar;
