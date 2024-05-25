import React from 'react';
import './footer.css';
import logo from './logo.png';
import {Container} from "react-bootstrap";
import * as Icon from 'react-feather';

const esnSloveniaUrl = "https://esn-slovenia.org/";
const esnSloveniaInstagram = "https://instagram.com/esnslovenia";
const esnSloveniaFacebook = "https://www.facebook.com/people/Erasmus-Student-Network-Slovenia-ESN/61551532850337/";
const esnSloveniaLinkedin = "https://www.linkedin.com/company/erasmus-student-network-slovenia-esn";

function Footer() {
    return (
      
            <footer className="footer">
                <Container>
                    <div className="row">

                        <div className="col-lg-4 col-12 mr-0 float-lg-start float-none text-lg-start ">
                            <h4 className="mb-3">Contact</h4>
                            <p>Karolina Trajkovska</p>
                            <p>Dimitar Pelivanov</p>
                            <p>Milan Milivojcevic</p>
                        </div>

                        <div className="col-lg-4 col-12 d-flex align-items-center justify-content-center py-4">
                            <div>
                                <div className="d-inline-flex mb-2">
                                    <a href={esnSloveniaInstagram}
                                       style = {{color: "inherit", textDecoration:"none"}}
                                       target="_blank"><Icon.Instagram/></a>
                                    <a href={esnSloveniaFacebook}
                                       style = {{color: "inherit", textDecoration:"none"}}
                                       target="_blank"><Icon.Facebook/></a>
                                    <a href={esnSloveniaLinkedin} 
                                       style = {{color: "inherit", textDecoration:"none"}} 
                                       target="_blank"><Icon.Linkedin/></a>
                                </div>
                                <div className="row">
                                    <p>&copy; <a style = {{color: "inherit", textDecoration:"none"}} 
                                                 href = {esnSloveniaUrl} target="_blank"
                                    >ESN Slovenia</a></p>
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