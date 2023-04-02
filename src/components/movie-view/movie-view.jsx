import PropTypes from "prop-types";
import { Button, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useParams } from "react-router"
import { MovieCard } from "../movie-card/movie-card";

import "./movie-view.scss";

export const MovieView = ({ movie }) => {
    const { Name, Bio, dob } = movie.Director;
    const { Name: genreName, Description } = movie.Genre;
    const movie = movie.find(m => m.id === movieId);
    const similarMovies = movie.filter(movie => movie.genre === movie.genre ? true : false)

    return (
        <div>
            <div>
                <img src={movie.ImgURL} alt="" className="w-100" />
            </div>

            <div>
                <span>Title: <strong>{movie.Title}</strong></span>
            </div>
            <br></br>

            <div>
                <span>Director: <strong>{Name}</strong></span>
                <div>
                    <p>{Bio}</p>
                    <p>Born: <strong>{dob}</strong></p>
                </div>
            </div>

            <div>
                <span>Genre: <strong>{genreName}</strong></span>
                <div>
                    <p>{Description}</p>
                </div>
            </div>
            
            <button onClick={onBackClick} className="back-button" style={{ cursor: "pointer" }}>Back</button>
        </div>
    );
};

MovieView.propTyoes = {
    movies: PropTypes.arrayof(PropTypes.shape({
        _id: PropTypes.string.isRequired,
        Title: PropTypes.string.isRequired,
        Director: PropTypes.string.isRequired,
        Genre: PropTypes.string.isRequired,
        ImgURL: PropTypes.string.isRequired
    }))
}