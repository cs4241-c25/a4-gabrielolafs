import React, { useEffect, useState } from 'react';
import axios from "axios";

const SignedIn = () => {
    const [username, setUsername] = useState('');

    useEffect(() => {
        async function fetchUsername() {
            try {
                const response = await axios.get('/user-info');
                console.log('User info:', response.data); // Debugging line
                setUsername(response.data.username);
            } catch (error) {
                console.error('Error fetching user info:', error);
            }
        }

        fetchUsername();
    }, []);

    return (
        <div className="App">
            <h1>Signed in as {username}.</h1>
        </div>
    );
};

export default SignedIn;