import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./components/Home";
import Leaderboard from "./components/Leaderboard";
//import Tasks from "./components/Tasks";
//import Rules from "./components/Rules";
import Profile from "./components/Profile";
//import Problem from "./components/Problem";

function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage/>} />
                <Route path="home" element={<HomePage/>} />
                <Route path="leaderboard" element={<Leaderboard/>} />
                <Route path="profile" element={<Profile/>} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRouter