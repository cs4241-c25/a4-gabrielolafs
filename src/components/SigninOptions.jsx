import React, { useState, useEffect } from 'react';
import Login from './Login';
import Signup from './Signup';
import SignedIn from './SignedIn';

const SigninOptions = () => {
    const [newUserFlag, setNewUserFlag] = useState(false);
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [username, setUsername] = useState('');

    useEffect(() => {
        async function checkAuthStatus() {
            const response = await fetch('/auth-check');
            console.log('Checking auth status');
            console.log(response)
            if (response.ok) {
                setIsSignedIn(false);
            } else {
                setIsSignedIn(false);
            }
        }

        checkAuthStatus();
    }, []);

    const toggleUserFlag = () => {
        setNewUserFlag(!newUserFlag);
    };

    const handleAccountCreated = () => {
        setNewUserFlag(false);
    };

    return (
        <div className="App">
            <h1>Task Manager</h1>
            {isSignedIn ? (
                <SignedIn></SignedIn>
            ) : (
                <>
                    {newUserFlag ? <Signup onAccountCreated={handleAccountCreated} /> : <Login />}
                    <button onClick={toggleUserFlag}>
                        {newUserFlag ? 'Switch to Login' : 'Switch to Signup'}
                    </button>
                </>
            )}
        </div>
    );
};

export default SigninOptions;