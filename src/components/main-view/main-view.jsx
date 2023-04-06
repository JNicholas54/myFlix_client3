import { useState } from "react"; // useState is a hook that allows you to add a state variable to your component
import { useEffect } from "react"; // useEffect is a hook that runs a callback function when any of its dependencies change
import { LoginView } from "../login-view/login-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from "../profile-view/profile-view";
import { NavigationBar } from "../nav-bar/nav-bar";

import { Row, Col, Container } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [movies, setMovies] = useState([]);
    const [user, setUser] = useState(storedUser? (storedUser) : null);
    const [token, setToken] = useState(storedToken? storedToken : null);
    const [viewMovies, setViewMovies] = useState(movies);

    const updateUser = user => {
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
  }

    useEffect(() => {
      if (!token) return;
      
      //fetch("http://localhost:8080/movies", {
      fetch("https://guarded-wave-99547.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then((response) => response.json())
        .then((movies) => {
          setMovies(movies);
      });
    }, [token]); // the array here is called a dependency array which is an array that contains the state variables or functions which are keeping an eye for any changes

    useEffect(() => {
      setViewMovies(movies);
    }, [movies]);

    return (
      <BrowserRouter>
        <NavigationBar
            user={user}
            onLoggedOut={() => {
                setUser(null);
                setToken(null);
                localStorage.clear();
            }}
            onSearch={(query) => {
              setViewMovies(movies.filter(movie => movie.Title.toLowerCase().includes(query.toLowerCase())));
          }}
        />
        <Container>
          <Row className="justify-content-center">
              <Routes>
                  <Route
                      path="/signup"
                      element={
                          <>
                              {user ? (
                                  <Navigate to="/" />
                              ) : (
                                  <Col md={6}>
                                      <SignupView />
                                  </Col>
                              )}
                          </>
                      }                    
                  />
                  <Route
                      path="/login"
                      element={
                          <>
                              {user ? (
                                  <Navigate to="/" />
                              ) : (
                                  <Col md={6}>
                                      <LoginView
                                          onLoggedIn={(user, token) => {
                                              setUser(user);
                                              setToken(token);
                                          }}
                                      />
                                  </Col>
                              )}
                          </>
                      }
                  />
                  <Route
                      path="/profile"
                      element={
                          !user ? (
                              <Navigate to="/login" replace />
                          ) : (
                              <ProfileView user={user} token={token} movies={(movies)}/>
                          )
                      }
                  />
                  <Route
                      path="/movies/:movieId"
                      element={
                          <>
                              {!user ? (
                                  <Navigate to="/login" replace />
                              ) : movies.length === 0 ? ( 
                                  <Col>The list is empty</Col>
                              ) : (
                                  <MovieView user={user} updateUser={updateUser} token={token} movies={movies} />
                              )}
                          </>
                      }
                  />
                  <Route
                      path="/"
                      element={
                          <>
                              {!user ? (
                                  <Navigate to="/login" replace />
                              ) : movies.length === 0 ? ( 
                                  <Col>The list is empty</Col>
                              ) : (
                                  <>
                                      {viewMovies.map(movie => (
                                          <Col className="mb-4" key={movie._id} xl={2} lg={3} md={4} xs={6}>
                                              <MovieCard movie={movie} />
                                          </Col>
                                      ))}
                                  </>
                              )}
                          </>
                      }
                  />
              </Routes>
          </Row>
        </Container>
      </BrowserRouter>
    );
};