import avatar from "../assets/default_avatar.jpeg";

const Avatar = ({ id, fullName }) => {
  const playerImgUrl = `https://cms.nhl.bamgrid.com/images/headshots/current/168x168/${id}.jpg`;

  // add default image if player image is broken
  const addDefaultSrc = (e) => {
    e.onerror = null;
    e.currentTarget.src = avatar;
  };

  return (
    <div className='player--avatar'>
      <img
        src={playerImgUrl}
        alt={`${fullName}'s Avatar`}
        onError={addDefaultSrc}
      />
    </div>
  );
};

export default Avatar;
