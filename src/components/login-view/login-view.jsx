import React from "react";
import { useState } from "react";

export const LoginView = ({ onLoggedIn}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            Username: username,
            Password: password
        };

        // fetch("https://guarded-wave-99547.herokuapp.com/users")
        fetch("http://localhost:8080/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
            }).then((response) => response.json())
            .then((data) => {
                console.log("Login response: ", data);
                if(data.user) {
                    onLoggedIn(data.user, data.token);
                } else {
                    alert("No such user");
                }
            })
            .catch((e) => {
                alert("Somerthing went wrong with the login");
            });
    }
            

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Username:
                <input 
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required 
                />
            </label>
            <label>
                Password:
                <input 
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </label>
            <button type="submit">Submit</button>
        </form>
    );
};