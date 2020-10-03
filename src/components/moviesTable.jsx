import React, { Component } from "react";
import Like from "./common/like";
import TableHeader from "./common/tableHeader";
import TableBody from "./common/tableBody";

class MoviesTable extends Component {
  //Not making it part of state because it won't change throughout the life cycle of the component.
  columns = [
    { path: "title", label: "Title" },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
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
      <table className="table">
        <TableHeader
          columns={this.columns}
          sortColumn={sortColumn}
          onSort={onSort}
        />
        <TableBody columns={this.columns} data={paginatedMovies} />
      </table>
    );
  }
}

export default MoviesTable;
