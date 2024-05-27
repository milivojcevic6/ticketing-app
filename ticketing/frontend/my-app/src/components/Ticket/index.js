import React, {useEffect, useState} from "react";
import "./tickets.css";
import * as Icon from "react-feather";


// remove later !!
import QRCode from 'react-qr-code'
import axios from "axios";
import {useParams} from "react-router-dom";

function Ticket() {

    let {id} = useParams();
    const user = JSON.parse(sessionStorage.getItem('user'))
    const [ticket, setTicket] = useState(null);


    useEffect(() => {
        console.log(user, id)
    }, []);

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

                    <div className="card mb-3" key={ticket.id} style={{maxWidth: '540px'}}>
                        <div className="card-header">
                            <h5 className="mb-0">{ticket.event_id.name} ({ticket.event_id.section.name})</h5>
                        </div>

                            <div className="row g-0">
                                <div className="col-lg-8">
                                    <div className="card-body">
                                        <p className="card-text">{ticket.status}</p>
                                        <p className="card-text"><small
                                            className="text-muted">Issued: {ticket.issued_date}</small></p>
                                    </div>
                                </div>
                            </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Ticket;
