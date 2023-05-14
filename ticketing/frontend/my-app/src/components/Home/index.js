import React, {useEffect, useState} from "react";
import {Badge} from "react-bootstrap";
import axios from "axios";
import testImage from "../../images/photo_2022-04-29_21-36-13.jpg"
import * as Icon from 'react-feather';
import "./home.css";

function HomePage() {

    const [events, setEvents] = useState([])
    const [selected, setSelected] = useState()

    useEffect(() => {
        loadEvents()
    }, [])

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
                            <div className="bottom-bar position-sticky fixed-bottom"  >
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
                                            {/*STUDENT*/}
                                            <div className="d-inline-flex my-4">
                                                <button type="button" className="btn btn-primary me-3">Register</button>
                                                <button type="button" className="btn btn-primary me-3">Use Ticket</button>
                                                <button type="button" className="btn btn-primary">Rate Event</button>
                                            </div>
                                            <br/>
                                            {/*SECTION*/}
                                            <div className="d-inline-flex my-2">
                                                <button type="button" className="btn btn-primary me-3">Issue Ticket</button>
                                                <button type="button" className="btn btn-primary me-3">Scan</button>
                                                <button type="button" className="btn btn-primary me-3">User List</button>
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
                

            </div>
            

        </div>
    )
}

export default HomePage;