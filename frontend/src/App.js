import React from "react";
import "bootstrap/dist/css/bootstrap.css"
import AppRouter from "./AppRouter";
import {AuthProvider} from "./components/Context/AuthContext";
import Footer from "./components/Footer.js";
import NavBar from "./components/Navbar";

function App() {
    return (
        <AuthProvider>
            <NavBar/>
            <AppRouter/>
            <Footer/>
        </AuthProvider>
    );
}

export default App;
