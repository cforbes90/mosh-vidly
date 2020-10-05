import React from "react";
//we will extract the id from the URL address bar. We will use location or match.params
const MovieForm = ({ match, history }) => {
  return (
    <div>
      {" "}
      <h1>Movie Form {match.params.id}</h1>
      <button className="bt-primary" onClick={() => history.push("/movies")}>
        Movie Button!
      </button>
    </div>
  );
};

export default MovieForm;
