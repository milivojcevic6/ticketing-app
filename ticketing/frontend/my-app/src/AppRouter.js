import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./components/Home";
import Profile from "./components/Profile";
import Tickets from "./components/Tickets";
import Login from "./components/Login";
import {LogIn} from "react-feather";

function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage/>} />
                <Route path="login" element={<Login/>} />
                <Route path="profile" element={<Profile/>} />
                <Route path="tickets" element={<Tickets/>} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRouter