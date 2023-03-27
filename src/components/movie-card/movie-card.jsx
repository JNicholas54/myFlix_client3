import PropTypes from "prop-types";

export const MovieCard = ({ movie, onMovieClick }) => {
    return (
        <div
            onClick={() => {
                onMovieClick(movie);
            }}
        >
            {movie.Title}
        </div>
    );
};

// Here is where I define all the props constraints for the MovieCard
MovieCard.propTypes = {
    movie: PropTypes.shape({
        title: PropTypes.string
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
};