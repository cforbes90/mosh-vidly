import React from "react";
//Input: Is the movie liked?
//output: onClick event
//Since this is a functional component you have to delete all references to "this and pass in props manually"
const Like = (props) => {
  let classes = "fa fa-heart";
  if (!props.liked) classes += "-o";

  return (
    <i
      className={classes}
      aria-hidden="true"
      onClick={props.onClick}
      //This changes the mouse to be a finger
      style={{ cursor: "pointer" }}
    />
  );
};

export default Like;
