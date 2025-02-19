import React, {useEffect, useState} from 'react';
import SigninOptions from './components/SigninOptions';
import AddAssignment from "./components/AddAssignment";
import ShowAssignments from "./components/ShowAssignments";
import SignedIn from "./components/SignedIn";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            const userCheckResponse = await axios.get('/signed-in-check');
            setIsAuthenticated(userCheckResponse.data);
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