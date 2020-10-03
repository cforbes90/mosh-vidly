import React, { Component } from "react";
import ListGroup from "./common/listGroup";
import { getMovies } from "../services/fakeMovieService";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import { getGenres } from "../services/fakeGenreService";
import MoviesTable from "./moviesTable";
import _ from "lodash";

class Movies extends Component {
  state = {
    movies: [],
    like: true,
    pageSize: 4,
    currentPage: 1,
    selectedGenre: "",
    genres: [],
    sortColumn: { path: "titel", order: "asc" },
  };
  componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres });
  }
  handleDelete = (happy) => {
    console.log(happy);
    //If the movie id is NOT equal to happy id, (that is true) then that movie gets to join the constant jokes.
    const jokes = this.state.movies.filter((movie) => movie._id !== happy._id);
    this.setState({ movies: jokes });
  };

  handleLike = (movie) => {
    console.log(movie);

    console.log("Movie liked!");

    //always make a copy that you will change!
    const movies = [...this.state.movies];

    const index = movies.indexOf(movie);
    console.log("This is index", index);
    movies[index] = { ...movies[index] };
    console.log("this is movies index", movies[index]);
    //this just makes the like component to whatever was the opposite
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    //This will set the currentPage in state to whatever our page variable above is. The variable above comes from the onClick event raised in the component that we passed this method to as a prop. Then in that component we use an arrow function to bind to this function AND it passes the specific argument.
    this.setState({ currentPage: page });
  };

  handleGenreSelect = (genre) => {
    //By adding in the page reset, it kills a bug that had us stranded on a nonexistent page 2 or 3 when selecting a new genre.
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };
  render() {
    //this works because length is a function available to this object. So it is destructured and then assigned to our variable count. This allows us to forgo having to write this.state.movies  to access this value in state.
    const { length: dunkin } = this.state.movies;
    const {
      pageSize,
      currentPage,
      selectedGenre,
      movies: allMovies,
      sortColumn,
    } = this.state;
    if (dunkin === 0) return <p> There are no movies in the database!</p>;
    //filter of movies by genre to be displayed in the paginatedMovies,
    const filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
        : allMovies;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    //paginate is a function created from lo dash implementation and placed in the utils folder
    const paginatedMovies = paginate(sorted, currentPage, pageSize);

    return (
      <main className="row">
        <div className="col-2">
          <ListGroup
            items={this.state.genres}
            onItemSelect={this.handleGenreSelect}
            selectedItem={this.state.selectedGenre}
          />
        </div>
        <div className="col">
          <h2> Movies Component</h2>
          <p> Showing {filtered.length} movies in the database. </p>
          <MoviesTable
            paginatedMovies={paginatedMovies}
            sortColumn={sortColumn}
            onDelete={this.handleDelete}
            onLike={this.handleLike}
            onSort={this.handleSort}
          />

          <Pagination
            itemsCount={filtered.length}
            pageSize={pageSize}
            onPageChange={this.handlePageChange}
            currentPage={currentPage}
          />
        </div>
      </main>
    );
  }
}

export default Movies;
