import React, { useEffect } from "react";

const Avatar = ({ id, fullName }) => {
  let url = `https://cms.nhl.bamgrid.com/images/headshots/current/168x168/${id}.jpg`;

  return (
    <div className='player--avatar'>
      <img src={url} alt={`${fullName}'s Avatar`} />
    </div>
  );
};

export default Avatar;
