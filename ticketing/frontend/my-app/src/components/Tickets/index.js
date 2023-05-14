import React, { useEffect, useState } from "react";
import "./tickets.css";
import * as Icon from "react-feather";
import Accordion from "react-bootstrap/Accordion";
import {Card, Button, Row} from "react-bootstrap";
import qrHolder from "../../images/qrHolder.jpg"

function Tickets() {

    const [expanded, setExpanded] = useState('0');
    
    //GET EVENTS BY USER (join event user by user_id)
    //GET TICKETS BY USER AND EVENT 

    const handleToggle = (eventKey) => {
        eventKey === '0' ? setExpanded('0') : setExpanded(null);
    };
    
    return (
        <div>
            <h1>Tickets</h1>
            {/*<table>
                <thead>
                <tr>
                    <th>Event Name</th>
                    <th>Event Location</th>
                    <th>Issued Date</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody>
                tickets.map((ticket) => (
                    <tr key={ticket.id}>
                        <td>{ticket.eventName}</td>
                        <td>{ticket.eventLocation}</td>
                        <td>{ticket.issuedDate}</td>
                        <td>{ticket.status}</td>
                    </tr>
                ))
                <tr>
                    <td>PubQuiz</td>
                    <td>Center Mladih Koper</td>
                    <td>13.05.2023</td>
                    <td>Active</td>
                </tr>
                </tbody>
            </table>*/}

            <form className="d-flex my-3 justify-content-center" >
                <input className="form-control me-2 w-75" type="search" placeholder="Search"
                       aria-label="Search"/>
                <button className="btn btn-outline-success" type="submit"><Icon.Search/></button>
            </form>
            <div className="row">
                <Card className="col-md-2 col-12 m-2">
                    <Card.Img variant="top" src={qrHolder} />
                    <Card.Body>
                        <Card.Title>Event Name</Card.Title>
                        <Card.Text>
                            Some quick example text to build on the card title and make up the
                            bulk of the card's content.
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Card className="col-md-2 col-12 m-2">
                    <Card.Img variant="top" src={qrHolder} />
                    <Card.Body>
                        <Card.Title>Event Name</Card.Title>
                        <Card.Text>
                            Some quick example text to build on the card title and make up the
                            bulk of the card's content.
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Card className="col-md-2 col-12 m-2">
                    <Card.Img variant="top" src={qrHolder} />
                    <Card.Body>
                        <Card.Title>Event Name</Card.Title>
                        <Card.Text>
                            Some quick example text to build on the card title and make up the
                            bulk of the card's content.
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Card className="col-md-2 col-12 m-2">
                    <Card.Img variant="top" src={qrHolder} />
                    <Card.Body>
                        <Card.Title>Event Name</Card.Title>
                        <Card.Text>
                            Some quick example text to build on the card title and make up the
                            bulk of the card's content.
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
            
        </div>
    );
}

export default Tickets;
