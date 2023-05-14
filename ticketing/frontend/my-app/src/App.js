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
import React from "react";
import {Container, Image, Nav, Navbar} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import AppRouter from "./AppRouter";
import Footer from "./components/Footer";
import logo from './logo.png';

function App() {
    return (

        <div className="App">
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/home" >
                        {/*<img src={logo} height={30} className="d-inline-block align-top" alt=""/>{' '}*/}
                        Ticketing app
                    </Navbar.Brand>
                    <Nav className="mr-2">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/profile">Profile</Nav.Link>
                        <Nav.Link href="/tickets">Tickets</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
            <br/>
            <Container>
                <AppRouter/>
            </Container>
            <Footer/>
        </div>
    );
}

export default App;
















