import React, {useEffect, useState} from "react";
import "./tickets.css";
import QRCode from 'react-qr-code'


// remove later !!
import axios from "axios";
import {useParams} from "react-router-dom";

function Ticket() {
    const baseUrl = window.location.origin;

    let {id} = useParams();
    const user = JSON.parse(sessionStorage.getItem('user'))
    const [ticket, setTicket] = useState(null);


    useEffect(() => {
        loadTicket().then(r => console.log(r));
    }, []);

    const loadTicket = async () => {
        try {
            await axios.get(`http://localhost:8000/api/tickets/${id}/`).then((response) => {
                setTicket(response.data)
                console.log(response.data)
            }).catch(error => {
                console.log(error)
            })
        } catch (error) {
            console.error(error);
        }

    };

    return (
        <div>
            <h1>Ticket</h1>

            <div className="row justify-content-center">
                <div className="col-lg-5 col-12">

                    <div className="card mb-3" key={ticket?.id}
                         style={{maxWidth: '540px', border: '6px solid #008000'}}>
                        <div className="card-header">
                            <h5 className="mb-0">{ticket?.event_id?.name} ({ticket?.event_id?.section.name})</h5>
                        </div>

                        <div className="row g-0">
                            <div className="col-lg-8">
                                <div className="card-body text-start">
                                    <div><b>Person:</b> {ticket?.user_id?.first_name} {ticket?.user_id?.last_name}</div>
                                    <div><b>Description:</b> {ticket?.event_id?.description}</div>
                                    <div><b>Attendend on Event</b></div>
                                </div>
                                <div className="card-body text-center">
                                    {/*<QRCode value={`${baseUrl}/ticket-info/${ticket.id}`}/>*/}
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
