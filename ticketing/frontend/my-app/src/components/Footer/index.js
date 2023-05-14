import React from 'react';
import './footer.css';
import logo from './logo.png';
import {Container} from "react-bootstrap";

function Footer() {
    return (
      
            <footer className="footer">
                <Container>
                    <div className="row">

                        <div className="col-md-6 mr-0 float-start text-start">
                            <h4>Contact</h4>
                            <p>Milan Milivojcevic</p>
                            <p>Karolina Trajkovska</p>
                            <p>&copy; ESN Slovenia</p>
                        </div>
                        
                        <div className="col-md-6 px-0">
                            <img src={logo} height={130} className="d-inline-block align-top float-end" alt=""/>
                            
                        </div>
                        
                    </div>
                </Container>
            </footer>
        
    );
}

export default Footer;