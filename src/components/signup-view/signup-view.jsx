import React from "react";
import { useState } from "react";
import {Button, Form, Card } from "react-bootstrap";

export const SignupView = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

    const data = {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday
    };

    //fetch("https://localhost:8080/users", {
    fetch("https://guarded-wave-99547.herokuapp.com/users", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    }).then((response) => {
        if (response.ok) {
            alert("Signup successful");
            window.location.reload();
        } else {
            alert("Signup failed");
        }
    });
};

return (
  <Card className="mt-2 mb-3">
    <Card.Body>
      <Card.Title>Sign Up</Card.Title>  
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            minLength="3"
            className="bg-light"
          />
        </Form.Group>

        <Form.Group controlId="signUpFormPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="bg-light"
          />
        </Form.Group>

        <Form.Group controlId="signUpFormEmail">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-light"
          />
        </Form.Group>

        <Form.Group controlId="signUpFormBirthday">
          <Form.Label>Birthday:</Form.Label>
          <Form.Control
            type="date"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
            required
            className="bg-light"
          />
        </Form.Group>

        <Button variant="primary" type="submit">Submit</Button>
      </Form>
    </Card.Body>
  </Card>
);
};