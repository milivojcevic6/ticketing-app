//import logo from './logo.svg';
//import './App.css';
//
//function App() {
//  return (
//    <div className="App">
//      <header className="App-header">
//        <img src={logo} className="App-logo" alt="logo" />
//        <p>
//          Edit <code>src/App.js</code> and save to reload.
//        </p>
//        <a
//          className="App-link"
//          href="https://reactjs.org"
//          target="_blank"
//          rel="noopener noreferrer"
//        >
//          Learn React
//        </a>
//      </header>
//    </div>
//  );
//}
//
//export default App;




import './App.css';
import React, {useState} from "react";
import {Container, Image, Nav, Navbar} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import AppRouter from "./AppRouter";
import Footer from "./components/Footer";
import logo from './images/logic.png';
import {LoginContext} from "./context/LoginContext";

function App() {
    const [loged, setLoged] = useState(false);
    const [user, setUser] = useState({});
    
    function handleLogin() {
        // Perform the login logic (e.g., show a login form, authenticate the user, etc.)
        // Once the user is successfully logged in, update the isLoggedIn state variable to true
        setLoged(true)
    }

    function handleLogout() {
        // Perform the logout logic (e.g., clear the authentication token, reset user data, etc.)
        // Once the user is successfully logged out, update the isLoggedIn state variable to false
        setLoged(false)
    }
    
    return (

        <div className="App">
            <LoginContext.Provider value={{user, setUser, loged, setLoged}}>
                <Navbar bg="dark" variant="dark" expand="md">
                    <Container>
                        <Navbar.Brand href="/" >
                            <img src={logo} height={20} className="d-inline-block" alt=""/>{' '}
                            Ticketing app
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="">
                                <Nav.Link href="/">Home</Nav.Link>
                                <Nav.Link href="/tickets">TicketWallet</Nav.Link>
                                <Nav.Link href="/profile">Profile</Nav.Link>
                                {!loged ? (
                                    <Nav.Link onClick={handleLogin} href="/login">Log in</Nav.Link>
                                ) : (
                                    <Nav.Link onClick={handleLogout} href="/login" >Log out</Nav.Link>
                                )}
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                <br/>
                <Container>
                    <AppRouter/>
                </Container>
                <Footer/>
            </LoginContext.Provider>
        </div>
    );
}

export default App;
















