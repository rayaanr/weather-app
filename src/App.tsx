import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import Home from './pages/Home.tsx';
import LoginForm from './pages/LoginForm.tsx';
import {useState} from 'react';

function App() {
    const [loggedIn, setLoggedIn] = useState(false);

    const handleLogin = () => {
        setLoggedIn(true);
    };

    return (
        <>
            <main className="min-h-screen flex justify-center items-center">
                <Router>
                    <Routes>
                        <Route path="/"
                            element={loggedIn ? (<Navigate to="/weather"/>) // If logged in, redirect to /weather
                                    : (<LoginForm handleLogin={handleLogin}/>)  // Else, show login form
                            }
                        />
                        {/* Prevent access to /weather if not logged in*/}
                        <Route path="/weather"
                            element={loggedIn ? <Home/> : <Navigate to="/"/>}   // If logged in, show Home page, else redirect to /
                        />
                    </Routes>
                </Router>
            </main>
        </>
    );
}

export default App;

