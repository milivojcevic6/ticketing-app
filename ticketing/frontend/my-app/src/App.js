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
import LoginContext, {AuthProvider} from "./context/LoginContext";

function App() {
    const [loged, setLoged] = useState(false);
    // const [user, setUser] = useState({});

    const user = JSON.parse(sessionStorage.getItem('user'))
    const isSectionUser = user && (user.role === 'section'); // Check if the user's role is "section"

    function handleLogout() {
        sessionStorage.removeItem('user')
    }
    
    return (

        <div className="App">
            <AuthProvider>
                <Navbar bg="dark" variant="dark" expand="md">
                    <Container>
                        <Navbar.Brand href="/" >
                            <img src={logo} height={20} className="d-inline-block" alt=""/>{' '}
                            Ticketing app
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="">
                                <Nav.Link className={sessionStorage.getItem('user') === null ? "d-none" : ""} href="/">Home</Nav.Link>
                                <Nav.Link className={sessionStorage.getItem('user') === null ? "d-none" : ""} href="/profile">Profile</Nav.Link>
                                <Nav.Link className={(sessionStorage.getItem('user') === null || isSectionUser) ? "d-none" : ""} href="/tickets">TicketWallet</Nav.Link>
                                <Nav.Link className={(sessionStorage.getItem('user') === null || !isSectionUser) ? "d-none" : ""} href="/check">Scan QRcode</Nav.Link>
                                <Nav.Link className={(sessionStorage.getItem('user') === null || !isSectionUser) ? "d-none" : ""} href="/event-statistics">Statistics</Nav.Link>
                                {sessionStorage.getItem('user') === null ? (
                                    <Nav.Link href="/login">Log in</Nav.Link>
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
            </AuthProvider>
        </div>
    );
}

export default App;
















