import React, {useEffect, useState} from "react";
import "./tickets.css";
import * as Icon from "react-feather";


// remove later !!
import db from '../database/db.json';
import QRCode from 'qrcode.react';

function Tickets() {
    const [selectedCard, setSelectedCard] =useState(-1);
    
    //GET EVENTS BY USER (join event user by user_id)
    //GET TICKETS BY USER AND EVENT

    const user = JSON.parse(sessionStorage.getItem('user'))
    const [tickets, setTickets] = useState([])
    const [selectedTicket, setSelectedTicket] = useState()
    //const [imageBlob, setImageBlob] = useState() // Blob data retrieved from the database
    const [imageURL, setImageURL] = useState();


    useEffect(() => {
        loadTickets().then(r => console.log(r));
    }, []);

    useEffect(() => {
        if (selectedCard !== -1) {
            getQR().then(r => console.log(r, "in toggleCard"));
        }
    }, [selectedCard]);

    const loadTickets = async () => {
        // try {
        //     const response = await axios.get(`/api/tickets/user/${user.id}`);
        //     setTickets(response.data);
        //     setSelectedCard(response.data[0].id);
        // } catch (error) {
        //     console.error(error);
        // }

        try {
            // Simulating API call to fetch tickets for the user
            const userTickets = db.tickets.filter(ticket => ticket.userId === user.id);
            setTickets(userTickets);
            if (userTickets.length > 0) {
                setSelectedCard(userTickets[0].id);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const getQR = async () => {
        // try {
        //     const response = await axios.get(`/api/tickets/qr/${selectedCard}`, {
        //         responseType: 'arraybuffer',
        //     });
        //
        //     const base64Image = btoa(
        //         new Uint8Array(response.data).reduce(
        //             (data, byte) => data + String.fromCharCode(byte),
        //             ''
        //         )
        //     );
        //     setImageURL(`data:image/jpeg;base64,${base64Image}`);
        // } catch (error) {
        //     console.error(error);
        // }

        try {
            // Simulating API call to fetch QR code for the selected ticket
            const ticket = db.tickets.find(ticket => ticket.id === selectedCard);
            if (ticket) {
                // Simulating generating QR code from ticket data
                const base64Image = generateQRCode(ticket.id); // You would replace this with your QR code generation logic
                setImageURL(base64Image);
            }
        } catch (error) {
            console.error(error);
        }
    };

    // Function to generate QR code data URL
    const generateQRCode = (data) => {
        // Generate QR code data URL
        return QRCode.toDataURL(data);
    };

    
    const toggleCard = (id) => {
        if (selectedCard===id) setSelectedCard(-1)
        else setSelectedCard(id)
        //getQR().then(r => console.log(r, "in toggleCard"));
    }
    
    return (
        <div>
            <h1>Tickets</h1>
            <form className="d-flex my-3 justify-content-center" >
                <input className="form-control me-2 w-75" type="search" placeholder="Search"
                       aria-label="Search"/>
                <button className="btn btn-outline-success" type="submit"><Icon.Search/></button>
            </form>
            <div className="row justify-content-center">
                <div className="col-lg-5 col-12">

                    {tickets.map((ticket) => (
                        <div className="card mb-3" key={ticket.id} style={{maxWidth: '540px'}}>
                            <div className="card-header" onClick={()=> toggleCard(ticket.id)}>
                                <h5 className="mb-0">{selectedCard===ticket.id ? '-' : '+'} {ticket.content.split(',')[1]}</h5>
                            </div>
                            {selectedCard===ticket.id && (
                                <div className="row g-0">
                                    <div className="col-lg-4">
                                        <img src={imageURL} className="img-fluid rounded-start"  width='60%' alt="QR Code"/>
                                    </div>
                                    <div className="col-lg-8">
                                        <div className="card-body">
                                            <p className="card-text">{ticket.status}</p>
                                            <p className="card-text"><small className="text-muted">Issued: {ticket.issuedDate}</small></p>
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
