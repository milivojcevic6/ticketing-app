import React, { useEffect, useState } from "react";
import "./tickets.css";
import * as Icon from "react-feather";
import { Accordion, Card } from 'react-bootstrap';
import qrHolder from "../../images/qrHolder.jpg"

function Tickets() {
    const [selectedCard, setSelectedCard] =useState(-1);
    
    //GET EVENTS BY USER (join event user by user_id)
    //GET TICKETS BY USER AND EVENT
    
    const toggleCard = (id) => {
        if (selectedCard===id) setSelectedCard(-1)
        else setSelectedCard(id)
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
                    
                    {/*CARD*/}
                    <div className="card mb-3" style={{maxWidth: '540px'}}>
                        <div className="card-header" onClick={()=> toggleCard(1)}>
                            <h5 className="mb-0">{selectedCard===1 ? '-' : '+'} Event Name</h5>
                        </div>
                        {selectedCard===1 && (
                            <div className="row g-0">
                                <div className="col-lg-4">
                                    <img src={qrHolder} className="img-fluid rounded-start" alt="..."/>
                                </div>
                                <div className="col-lg-8">
                                    <div className="card-body">
                                        <h5 className="card-title">Card title</h5>
                                        <p className="card-text">This is a wider card with supporting text below as a
                                            natural lead-in to additional content. This content is a little bit longer.</p>
                                        <p className="card-text"><small className="text-muted">Last updated 3 mins
                                            ago</small></p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    
                    <div className="card mb-3" style={{maxWidth: '540px'}}>
                        <div className="card-header" onClick={()=> toggleCard(2)}>
                            <h5 className="mb-0">{selectedCard===2 ? '-' : '+'} Event Name</h5>
                        </div>
                        {selectedCard===2 && (
                            <div className="row g-0">
                                <div className="col-lg-4">
                                    <img src={qrHolder} className="img-fluid rounded-start" alt="..."/>
                                </div>
                                <div className="col-lg-8">
                                    <div className="card-body">
                                        <h5 className="card-title">Card title</h5>
                                        <p className="card-text">This is a wider card with supporting text below as a
                                            natural lead-in to additional content. This content is a little bit longer.</p>
                                        <p className="card-text"><small className="text-muted">Last updated 3 mins
                                            ago</small></p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    
                    
                </div>
                
            </div>
            
        </div>
    );
}

export default Tickets;
