import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

const ToggleButton = ({ handleToggleStats, isToggled }) => {
  return (
    <button type='button' className='toggleStats' onClick={handleToggleStats}>
      {isToggled ? (
        <FontAwesomeIcon icon={faMinus} size='lg' />
      ) : (
        <FontAwesomeIcon icon={faPlus} size='lg' />
      )}
    </button>
  );
};

export default ToggleButton;
