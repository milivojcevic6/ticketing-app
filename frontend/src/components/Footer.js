import React from "react";
import {GrGithub, GrInstagram, GrLinkedin} from 'react-icons/gr';
import {Col, Row} from "react-bootstrap";

function Footer() {
    return (
        <footer className={ "container-fluid" }>
            <hr/>
            <br/>
            <Row className={"text-center"}>
                <Col>
                    <div>
                        <span className="mb-3 mb-md-0 text-muted">R. Micev </span>
                        <div className={"text-center"}>
                            <a style={{padding: "5%"}}
                               href={"https://www.instagram.com/ristemicev/"}><GrInstagram/></a>
                            <a href={"https://si.linkedin.com/in/riste-micev-a821b2205"}><GrLinkedin/></a>
                            <a style={{padding: "5%"}} href={"https://github.com/ristemicev/"}><GrGithub/></a>
                        </div>
                    </div>
                    <br/>
                    <div>
                        <span className="mb-3 mb-md-0 text-muted">M. Milivojcevic </span>
                        <div className={"text-center"}>
                            <a style={{padding: "5%"}} href={"#"}><GrInstagram/></a>
                            <a href={"#"}><GrLinkedin/></a>
                            <a style={{padding: "5%"}} href={"#"}><GrGithub/></a>
                        </div>
                        <br/>
                    </div>
                </Col>
                <Col>
                    <img width={"20%"} src={"/eBill.png"}/>
                </Col>
                <Col>
                    <div className={""}>    
                        <span className="text-muted">© 2022 Micev & Milivojcevic </span>
                    </div>
                </Col>
            </Row>
            <br/>
        </footer>
    )
}

export default Footer;