import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./movie-card.scss";

export const MovieCard = ({ movie }) => {
    return (
        <Card className="h-100">
            <Card.Img variant="top" src={movie.ImgURL} alt="" />
            <Card.Body>
                <Card.Title>{movie.Title}</Card.Title>
                <Link to={`/movies/${encodeURIComponent(movie._id)}`} className="mt-auto">
                    <Button variant="link">Open</Button>
                </Link>
            </Card.Body>
        </Card>
        // <div
        //     onClick={() => {
        //         onMovieClick(movie);
        //     }}
        // >
        //     {movie.Title}
        // </div>
    );
};
// Here is where I define all the props constraints for the MovieCard
MovieCard.propTypes = {
    movie: PropTypes.shape({
        title: PropTypes.string
    }).isRequired,
};