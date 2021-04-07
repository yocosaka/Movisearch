import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import getMovieData from '../helpers/getMovieData';
import noImg from '../assets/images/no-img.jpg';
import { updateMovie } from '../actions/movies';

class MovieDetail extends React.Component {
  constructor(props) {
    super(props);
    this.getMovie = this.getMovie.bind(this);
  }

  componentDidMount() {
    this.runGetMovie();
  }

  componentDidUpdate() {
    this.runGetMovie();
  }

  runGetMovie = () => {
    const { movie } = this.props;
    const {
      Plot, Director, Actors, Genre,
    } = movie;
    if (!Plot || !Director || !Actors || !Genre) {
      this.getMovie();
    }
  }

  getMovie = async () => {
    const { movie } = this.props;
    const { updateMovie } = this.props;
    const movieData = await getMovieData(movie.imdbID);
    const {
      Plot, Director, Actors, Genre,
    } = movieData;
    updateMovie(movie.imdbID, {
      Plot,
      Director,
      Actors,
      Genre,
    });
  };

  render() {
    const { movie } = this.props;
    const {
      Poster, imdbID, Title, Year, Plot, Director, Actors, Genre,
    } = movie;

    return (
      <div className="container">
        <div className="movie">
          <div className="movie__image-wrap">
            <img src={Poster === 'N/A' ? noImg : Poster} alt={Title || `Movie-${imdbID}`} className="movie__image" />
          </div>
          <div className="movie__title-wrap">
            <h2 className="movie__title">{Title}</h2>
            <div className="movie__year">{Year}</div>
          </div>
          <div className="movie__text-wrap">
            {Plot && <p className="movie__plot movie__spec">{Plot}</p>}
            {Director && (
            <div className="movie__director movie__spec">
              <h3 className="movie__spec__title">
                <span className="iconify" data-icon="bx:bxs-camera-movie" data-inline="false" />
                Director:
              </h3>
              <p className="movie__spec__text">{Director}</p>
            </div>
            )}
            {Actors && (
            <div className="movie__actors movie__spec">
              <h3 className="movie__spec__title">
                <span className="iconify" data-icon="mdi:dance-ballroom" data-inline="false" />
                Actors:
              </h3>
              <p className="movie__spec__text">{Actors}</p>
            </div>
            )}
            {Genre && (
            <div className="movie__genre movie__spec">
              <h3 className="movie__spec__title">
                <span className="iconify" data-icon="ri:movie-2-fill" data-inline="false" />
                Genre:
              </h3>
              <p className="movie__spec__text">{Genre}</p>
            </div>
            )}
          </div>
          <Link to="/" className="btn movie__btn">Back to Home</Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  movie: state.movies.find((movie) => movie.imdbID === props.match.params.id),
});

const mapDispatchToProps = (dispatch) => ({
  updateMovie: (id, update) => dispatch(updateMovie(id, update)),
});

MovieDetail.propTypes = {
  movie: PropTypes.instanceOf(Object),
  updateMovie: PropTypes.func,
};

MovieDetail.defaultProps = {
  movie: {},
  updateMovie: null,
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetail);
