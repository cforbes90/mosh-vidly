import React, { Component } from "react";
import Like from "./common/like";
import Table from "./common/table";
import { Link } from "react-router-dom";

class MoviesTable extends Component {
  //Not making it part of state because it won't change throughout the life cycle of the component.
  columns = [
    {
      path: "title",
      label: "Title",
      //We aer using a template literal within the curly braces so we can dynamically insert values into that string. It will be a part of the address bar path.
      content: (movie) => (
        <Link to={`/movies/${movie._id}`}> {movie.title} </Link>
      ),
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    //You use this content keyword to render unique buttons in a semi-automated way. The button below will render the Like component AND pass an onClick function via props
    {
      key: "like",
      content: (pie) => (
        <Like onClick={() => this.props.onLike(pie)} liked={pie.liked} />
      ),
    },
    {
      key: "delete",
      content: (pie) => (
        <button
          onClick={() => this.props.onDelete(pie)}
          className="btn btn-danger btn-sm"
        >
          Delete your Account Nephew
        </button>
      ),
    },
  ];
  render() {
    //do your destructuring. if this is a class component you write this.props. If it was just a stateless component then you write props in the arrow function
    const {
      paginatedMovies,

      onSort,
      sortColumn,
    } = this.props;
    return (
      <Table
        columns={this.columns}
        data={paginatedMovies}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default MoviesTable;
