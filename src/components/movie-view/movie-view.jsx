import React from "react";
import PropTypes from "prop-types";
import { Button, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useParams } from "react-router"
import { MovieCard } from "../movie-card/movie-card";
import { useEffect, useState } from "react";

import "./movie-view.scss";

export const MovieView = ({ movies, user, token, updateUser }) => {
    const { movieId } = useParams();
    const movie = movies.find(m => m._id === movieId);
    const { Name, Bio, dob } = movie.Director;
    const { Name: genreName, Description } = movie.Genre;

    //const [isFavorite, setIsFavorite] = useState(user.favoriteMovies.includes(movie._id));
    const [isFavorite, setIsFavorite] = useState(user && user.favoriteMovies && user.favoriteMovies.includes(movie._id));


    useEffect(() => {
        setIsFavorite(user && user.favoriteMovies && user.favoriteMovies.includes(movie._id));
        window.scrollTo(0, 0);
    }, [movieId])

    const addFavorite = () => {
        fetch("https://guarded-wave-99547.herokuapp.com/users/${user.username}/movies/${movieId}", {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                alert("Failed");
                return false;
            }
        })
        .then(user => {
            if (user) {
                alert("Successfully added to favorites");
                setIsFavorite(true);
                updateUser(user);
            }
        })
        .catch(e => {
            alert(e);
        });
    }

    const removeFavorite = () => {
        fetch("https://guarded-wave-99547.herokuapp.com/users/${user.username}/movies/${movieId}", {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                alert("Failed");
                return false;
            }
        })
        .then(user => {
            if (user) {
                alert("Successfully deleted from favorites");
                setIsFavorite(false);
                updateUser(user);
            }
        })
        .catch(e => {
            alert(e);
        });
    }
    
    return (
        <>
            <Col md={12}>
                <div className="text-dark">
                    <img style={{ width: '100%', maxHeight: '400px', objectFit: 'contain'}} src={movie.ImgURL} alt="Movie Cover Image" />
                    <h2>{movie.Title}</h2>
                        <p>{movie.Story}</p>
                    <h5>Genre: <strong>{genreName}</strong></h5>
                        <p>{Description}</p>
                    <h5>Director: <strong>{Name}</strong></h5>
                        <p>{Bio}</p>
                        <p>Born: <strong>{dob}</strong></p>
                    <Link to={"/"}>
                        <Button variant="primary" style={{ cursor: "pointer" }}>Back</Button>
                    </Link>
                    <div className="button-container">
                        <Button variant="danger" className="ms-2" onClick={removeFavorite}>Remove from favorites</Button>
                        <Button variant="success" className="ms-2" onClick={addFavorite}>Add to favorites</Button>
                    </div>
                </div>
            </Col> 
        </>
    );
};

MovieView.propTypes = {
    movies: PropTypes.arrayOf(PropTypes.shape({
      _id: PropTypes.string.isRequired,
      Title: PropTypes.string.isRequired,
      Story: PropTypes.string,
      ImgURL: PropTypes.string,
      Genre: PropTypes.shape({
        Name: PropTypes.string,
        Description: PropTypes.string
      }).isRequired,
      Director: PropTypes.shape({
        Name: PropTypes.string,
        Bio: PropTypes.string,
        dob: PropTypes.string
      }).isRequired
    }))}.isRequired
  