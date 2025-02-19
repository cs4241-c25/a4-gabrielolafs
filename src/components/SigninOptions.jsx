import React, { useState } from 'react';
import Login from './Login';
import Signup from './Signup';

const SigninOptions = () => {
    const [newUserFlag, setNewUserFlag] = useState(false);

    const toggleUserFlag = () => {
        setNewUserFlag(!newUserFlag);
    };

    const handleAccountCreated = () => {
        setNewUserFlag(false);
    };

    return (
        <div className="App">
            <h1>Task Manager</h1>
                <>
                    {newUserFlag ? <Signup onAccountCreated={handleAccountCreated} /> : <Login />}
                    <button onClick={toggleUserFlag}>
                        {newUserFlag ? 'Switch to Login' : 'Switch to Signup'}
                    </button>
                </>
        </div>
    );
};

export default SigninOptions;