import React from "react";
import { Button, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useParams } from "react-router"
import { MovieCard } from "../movie-card/movie-card";

import "./movie-view.scss";

export const MovieView = ({ movies }) => {
    const { movieId } = useParams();
    const movie = movies.find(m => m._id === movieId);
    const { Name, Bio, dob } = movie.Director;
    const { Name: genreName, Description } = movie.Genre;
    
    return (
        <>
        <Col md={12}>
            <div className="text-dark">
                <img className="w-auto" src={movie.ImgURL} alt="Movie Cover Image" />
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
            </div>
        </Col> 
        </>
    );
};