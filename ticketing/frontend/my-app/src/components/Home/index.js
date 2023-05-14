import React, {useEffect, useState} from "react";
import {Badge} from "react-bootstrap";
import axios from "axios";
import testImage from "../../images/photo_2022-04-29_21-36-13.jpg"
import * as Icon from 'react-feather';
import "./home.css";
import { Modal } from 'react-bootstrap';

function HomePage() {

    const [events, setEvents] = useState([])
    const [selected, setSelected] = useState()
    const [showModal, setShowModal] = useState(false);
    
    useEffect(() => {
        loadEvents()
    }, [])
    
    const handleToggleModal = () => {
        setShowModal(!showModal);
    };

    const loadEvents = async () => {
        const result = await axios.get("http://localhost:8080/api/events")
        console.log(result);
        setEvents(result.data)
        setSelected(result.data[0])
        console.log(selected)
    }

    return (

        <div>
            {/*}<h1>
                Welcome!
            </h1>
            <br/>
            <div style={{marginLeft: "35%", width: "30%"}}>
                <a href="tasks">
                    <h2 style={{ float: "left"}}>
                        <Badge bg="secondary" as="Button"
                               style={{width: "200px", height: "70px"}}>
                            Tasks
                        </Badge>
                    </h2>
                </a>
                <a href="rules">
                    <h2  style={{ float: "right"}}>
                        <Badge bg="secondary" as="Button"
                               style={{width: "200px", height: "70px"}}>
                            Rules
                        </Badge>
                    </h2>
                </a>
                <a href="leaderboard">
                    <h2  style={{ float: "left"}}>
                        <Badge bg="secondary" as="Button"
                               style={{width: "200px", height: "70px"}}>
                            Leaderboard
                        </Badge>
                    </h2>
                </a>
                <a href="profile">
                    <h2  style={{ float: "right"}}>
                        <Badge bg="secondary" as="Button"
                               style={{width: "200px", height: "70px"}}>
                            Profile
                        </Badge>
                    </h2>
                </a>
            </div>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>*/}

            <div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-5 col-12 px-0">
                            <form className="d-flex">
                                <input className="form-control me-2" type="search" placeholder="Search"
                                       aria-label="Search"/>
                                    <button className="btn btn-outline-success" type="submit"><Icon.Search/></button>
                            </form>
                        </div>
                        <div className="col-lg-6 col-12 pt-2 text-center ms-auto">
                            <div className=""> {/*card*/}
                                <div className="intro"> {/*card-body*/}
                                    Discover our events! Browse, register, and enjoy!                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row py-4">
                        <div className="col-lg-5 col-12 card p-2 mb-lg-0 mb-4 scrollable-div-mobile">
                            <table className="table table-hover text-start">
                                <thead>
                                <tr>
                                    <th scope="col">Event Name</th>
                                    <th scope="col">Event Location</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">ESN price</th>
                                </tr>
                                </thead>
                                <tbody>

                                {events.map((event) => (
                                    <tr key={event.id} className={selected === event ? 'selected' : ''} onClick={() => setSelected(event)} >
                                        <td >{event.name}</td>
                                        <td>{event.location}</td>
                                        <td scope="row">01.01</td>
                                        <td>{event.price}</td>
                                        <td>{event.esnprice}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                            <div className="bottom-bar position-sticky fixed-bottom" onClick={handleToggleModal} >
                                <h6 className="mt-2"> <Icon.PlusSquare/> New event</h6>
                            </div>
                        </div>
                        <div className="col-lg-6 col-12 p-2 card ms-auto scrollable-div">
                            <img src={testImage} height={250} style={{ objectFit: "cover" }} className="card-img-top" alt="..."/>
                            <div className="card-body">

                                {
                                    selected?.id ?
                                        <div>
                                            <h5 className="card-title">
                                                <p>{selected.name}</p>
                                            </h5>
                                            <p className="card-text">{selected.description}</p>
                                            <div className="d-inline-flex">
                                                <span className="me-3"><Icon.MapPin/> {selected.location}</span>
                                                <span className="me-3"><Icon.Clock/> Implement time</span>
                                                <span><Icon.UserCheck/> Implement #registered</span>
                                            </div>
                                            {/*STUDENT
                                            <div className="d-inline-flex my-4">
                                                <button type="button" className="btn btn-primary me-3">Register</button>
                                                <button type="button" className="btn btn-primary me-3">Use Ticket</button>
                                                <button type="button" className="btn btn-primary">Rate Event</button>
                                            </div>*/}
                                            <br/>
                                            {/*SECTION*/}
                                            <div className="d-inline-flex my-4">
                                                <button type="button" className="btn btn-primary me-3">Issue Ticket</button>
                                                <button type="button" className="btn btn-primary me-3">Scan</button>
                                                <button type="button" className="btn btn-primary me-3">Attendees</button>
                                                <button type="button" className="btn btn-primary">Archive </button>
                                            </div>
                                            <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                                        </div>
                                        :
                                        <p>No event loaded</p>
                                }

                            </div>
                        </div>
                    </div>
                </div>
                
                
                
                {/*MODALS*/}
                
                <Modal show={showModal} onHide={handleToggleModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>New Event</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Name</label>
                                <input type="text" className="form-control" id="name" placeholder="e.g. Erasmus in Schools"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="description" className="form-label">Description</label>
                                <textarea className="form-control" id="description" rows="3"
                                          placeholder="e.g. During the Erasmus in Schools event, students will have the opportunity to interact with international students and teachers."></textarea>
                            </div>
                            
                            <div className="row">
                                <div className="mb-3 col-6">
                                    <label htmlFor="location" className="form-label">Location</label>
                                    <input type="text" className="form-control" id="location" placeholder="e.g. OS Koper"/>
                                </div>
                                <div className="mb-3 col-6">
                                    <label htmlFor="capacity" className="form-label">Capacity</label>
                                    <input type="number" className="form-control" id="capacity" placeholder="e.g. 10"/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="mb-3 col-6">
                                    <label htmlFor="locationUrl" className="form-label">Location URL</label>
                                    <input type="url" className="form-control" id="locationUrl"
                                           placeholder="e.g. https://maps.google.com/..."/>
                                </div>
                                <div className="mb-3 col-6">
                                    <label htmlFor="type" className="form-label">Type</label>
                                    <select className="form-select" id="type" aria-label="Type">
                                        <option selected>Education</option>
                                        <option value="1">Spcial</option>
                                        <option value="2">Sport</option>
                                        <option value="3">Trip</option>
                                    </select>
                                </div>
                            </div>
                            <div  className="row">
                                <div className="mb-3 col-6">
                                    <label htmlFor="price" className="form-label">Price</label>
                                    <input type="number" className="form-control" id="price" placeholder="0.0"/>
                                </div>
                                <div className="mb-3 col-6">
                                    <label htmlFor="esnprice" className="form-label">ESN Price</label>
                                    <input type="number" className="form-control" id="esnprice" placeholder="0.0"/>
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="image" className="form-label">Upload image...</label>
                            </div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        {/*<button type="button" className="btn btn-secondary" onClick={handleToggleModal}>Close</button>*/}
                        <button type="button" className="btn btn-primary">Create</button>
                    </Modal.Footer>
                </Modal>

            </div>
            

        </div>
    )
}

export default HomePage;