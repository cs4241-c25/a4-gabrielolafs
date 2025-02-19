import React, {useEffect, useState} from 'react';
import SigninOptions from './components/SigninOptions';
import AddAssignment from "./components/AddAssignment";
import ShowAssignments from "./components/ShowAssignments";
import SignedIn from "./components/SignedIn";
import axios from "axios";

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await axios.get('/auth-check');
                if (response.status === 200) {
                    setIsAuthenticated(true);
                }
            } catch (error) {
                console.error('Error checking authentication:', error);
                setIsAuthenticated(false);
            }
        };

        checkAuth();
    }, []);

    return (
        <div className="App">
            {isAuthenticated ? (
                <>
                    <SignedIn></SignedIn>
                    <AddAssignment />
                    <ShowAssignments />
                </>
            ) : (
                <SigninOptions />
            )}
        </div>
    );
};

export default App;