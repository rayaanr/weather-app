import { BrowserRouter as Router, Route, Navigate, Routes } from 'react-router-dom';
import Home from './pages/Home.tsx';
import LoginForm from './pages/LoginForm.tsx';
import { useState } from 'react';

function App() {
    const [loggedIn, setLoggedIn] = useState(false);

    const handleLogin = () => {
        setLoggedIn(true);
    };

    return (
        <>
            <nav className="flex gap-3 absolute w-full justify-center pt-3 items-center">
                <img src="logo.svg" alt="logo" className="w-10 h-auto" />
                <h1 className="text-3xl font-semibold">Weather App</h1>
            </nav>
            <main className="min-h-screen flex justify-center items-center">
                <Router>
                    <Routes>
                        <Route
                            path="/"
                            element={
                                loggedIn ? (
                                    <Navigate to="/weather" />
                                ) : (
                                    <LoginForm handleLogin={handleLogin} />
                                )
                            }
                        />
                        <Route
                            path="/weather"
                            element={
                                loggedIn ? <Home /> : <Navigate to="/" />
                            }
                        />
                    </Routes>
                </Router>
            </main>
        </>
    );
}

export default App;

