import { Card, Col, Form, Button } from "react-bootstrap";
import { useState } from "react";

export const ProfileView = ({ user, token }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");

    const handleSubmit = event => {
        event.preventDefault();

        const data = {
            username,
            password,
            email,
            birthday
        }
        fetch("https://guarded-wave-99547.herokuapp.com/users/${user.username}", {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                alert("Changing user data failed");
                return false;
            }
        })
        .then(user => {
            if (user) {
                alert("Successfully changed userdata");
                localStorage.setItem("user", JSON.stringify(user));
                window.location.reload();
            }
        })
        .catch(e => {
            alert(e);
        });
    }

    return (
        <>
            <Col md={6}>           
                <Card className="mt-2 mb-3">
                    <Card.Body>
                        <Card.Title>Your info</Card.Title>
                        <p>Username: {user.username}</p>
                        <p>Email: {user.email}</p>
                        <p>Birthday: {user.birthday.slice(0, 10)}</p>
                    </Card.Body>
                </Card>
            </Col>
            <Col md={6}>
                <Card className="mt-2 mb-3">
                    <Card.Body>
                        <Card.Title>Update your info</Card.Title>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group>
                                <Form.Label>Username:</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={username}
                                    onChange={e => setUsername(e.target.value)}
                                    required
                                    minLength="5"
                                    className="bg-light"
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Password:</Form.Label>
                                <Form.Control
                                    type="password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    required
                                    minLength="8"
                                    className="bg-light"
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Email:</Form.Label>
                                <Form.Control
                                    type="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    required
                                    className="bg-light"
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Birthday:</Form.Label>
                                <Form.Control
                                    type="date"
                                    value={birthday}
                                    onChange={e => setBirthday(e.target.value)}
                                    required
                                    className="bg-light"
                                />
                            </Form.Group>
                            <Button className="mt-3" variant="primary" type="submit">Submit</Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Col>
        </>
    );
}