import React from 'react';
import './footer.css';
import logo from './logo.png';
import {Container} from "react-bootstrap";
import * as Icon from 'react-feather';

function Footer() {
    return (
      
            <footer className="footer">
                <Container>
                    <div className="row">

                        <div className="col-lg-4 col-12 mr-0 float-lg-start float-none text-lg-start ">
                            <h4 className="mb-3">Contact</h4>
                            <p>Milan Milivojcevic</p>
                            <p>Karolina Trajkovska</p>
                        </div>

                        <div className="col-lg-4 col-12 d-flex align-items-center justify-content-center py-4">
                            <div>
                                <div className="d-inline-flex mb-2">
                                    <Icon.Instagram/>
                                    <Icon.Facebook/>
                                    <Icon.Linkedin/>
                                </div>
                                <div className="row">
                                    <p>&copy; ESN Slovenia</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="col-lg-4 col-12 px-lg-0">
                            <img src={logo} height={130} className="d-inline-block float-lg-end float-none" alt=""/>
                        </div>
                        
                    </div>
                </Container>
                
            </footer>
        
        
    );
}

export default Footer;