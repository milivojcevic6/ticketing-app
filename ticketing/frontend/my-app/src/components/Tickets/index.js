import React, {useEffect, useState} from "react";
import "./tickets.css";
import * as Icon from "react-feather";


// remove later !!
import QRCode from 'react-qr-code'
import axios from "axios";

function Tickets() {
    const baseUrl = window.location.origin;


    const [selectedCard, setSelectedCard] = useState(-1);

    //GET EVENTS BY USER (join event user by user_id)
    //GET TICKETS BY USER AND EVENT

    const user = JSON.parse(sessionStorage.getItem('user'))
    const [tickets, setTickets] = useState([])
    //const [imageBlob, setImageBlob] = useState() // Blob data retrieved from the database
    const [imageURL, setImageURL] = useState();


    useEffect(() => {
        loadTickets().then(r => console.log(r));
    }, []);

    const loadTickets = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/users/${user.id}/tickets/`);
            setTickets(response.data);
            setSelectedCard(response.data[0]);
        } catch (error) {
            console.error(error);
        }

    };


    const toggleCard = (id) => {
        if (selectedCard === id) setSelectedCard(-1)
        else setSelectedCard(id)
    }

    return (
        <div>
            <h1>Tickets</h1>
            <form className="d-flex my-3 justify-content-center">
                <input className="form-control me-2 w-75" type="search" placeholder="Search"
                       aria-label="Search"/>
                <button className="btn btn-outline-success" type="submit"><Icon.Search/></button>
            </form>
            <div className="row justify-content-center">
                <div className="col-lg-5 col-12">

                    {tickets.map((ticket) => (
                        <div className="card mb-3" key={ticket.id} style={{maxWidth: '540px'}}>
                            <div className="card-header" onClick={() => toggleCard(ticket.id)}>
                                <h5 className="mb-0">{selectedCard === ticket.id ? '-' : '+'} {ticket.event_id.name} ({ticket.event_id.section.name})</h5>
                            </div>
                            {selectedCard === ticket.id && (
                                <div className="row g-0">
                                    <div className="col-lg-4">
                                        <QRCode value={`${baseUrl}/ticket-info/${ticket.id}`} />
                                    </div>
                                    <div className="col-lg-8">
                                        <div className="card-body">
                                            <p className="card-text">{ticket.status}</p>
                                            <p className="card-text"><small
                                                className="text-muted">Issued: {ticket.issued_date}</small></p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}


                </div>

            </div>

        </div>
    );
}

export default Tickets;
