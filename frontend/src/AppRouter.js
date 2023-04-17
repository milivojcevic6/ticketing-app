import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";

import HomePage from "./components/Home";
import AdminPanel from "./components/Admin/adminPanel";
import Login from "./components/Login";
import EditCodes from "./components/Admin/editCodes";
import Upn from "./components/UPN/UpnForm";
import Generator from "./components/UPN/Generator"
import Register from "./components/Register";
import {Error404} from "./components/Error";
import Profile from "./components/Profile";
import ProfilePage from "./components/Profile";

function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<HomePage/>}/>
                <Route exact path="/home" element={<HomePage/>}/>
                <Route exact path="/register" element={<Register/>}/>
                <Route exact path="/admin" element={<AdminPanel/>}/>
                <Route exact path="/login" element={<Login/>}/>
                <Route exact path="/admin/editCodes" element={<EditCodes/>}/>
                <Route exact path="/generate/show" element={<Upn/>}/>
                <Route exact path="/generate/" element={<Generator/>}/>
                <Route exact path="/profile" element={<ProfilePage/>}/>
                <Route path="*" element={<Error404/>}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default AppRouter