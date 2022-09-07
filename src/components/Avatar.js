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

// <img src="imagenotfound.gif" alt="Image not found" onerror="this.onerror=null;this.src='https://www.flickr.com/photos/195527271@N04/52340120977/in/dateposted-public/';" />

/* <a data-flickr-embed="true" href="https://www.flickr.com/photos/195527271@N04/52340120977/in/dateposted-public/" title="default_avatar"><img src="https://live.staticflickr.com/65535/52340120977_f154705256_m.jpg" width="240" height="240" alt="default_avatar"></a><script async src="//embedr.flickr.com/assets/client-code.js" charset="utf-8"></script> */

// onerror="myFunction()"
