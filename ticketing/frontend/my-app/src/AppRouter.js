import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";

import HomePage from "./components/Home";
import Profile from "./components/Profile";
import Tickets from "./components/Tickets";
import Login from "./components/Login";
import CheckQR from "./components/Check";
import EventStatistics from "./components/EventStatistics";
import UserProfile from "./components/Profile/UserView/newView";

function AppRouter() {
    let isUserLoggedIn = sessionStorage.getItem('user')

    return (
        <BrowserRouter>
            <Routes>
                {isUserLoggedIn ? (<Route path="/" element={<HomePage/>}/>) : (<Route path="/" element={<Login/>}/>)}
                <Route path="login" element={<Login/>}/>
                <Route path="profile" element={<Profile/>}/>
                <Route path="tickets" element={<Tickets/>}/>
                <Route path="check" element={<CheckQR/>}/>
                <Route path="event-statistics" element={<EventStatistics/>}/>
                <Route path="user-view" element={<UserProfile/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default AppRouter