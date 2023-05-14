import React, {useEffect, useState} from "react";
import {Badge} from "react-bootstrap";
import axios from "axios";
import testImage from "../../images/photo_2022-04-29_21-36-13.jpg"

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
                        <div className="col-12 px-0">
                            <div className="card">
                                <div className="card-body">
                                    Discover a world of exciting events with ESN Primorska's ticketing app. Browse, register, and enjoy!                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row py-4">
                        <div className="col-md-5 card p-2">
                            <table className="table table-striped">
                                <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Event Name</th>
                                    <th scope="col">Event Location</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">ESNprice</th>
                                </tr>
                                </thead>
                                <tbody>

                                {events.map((event) => (
                                    <tr key={event.id}>
                                        <th scope="row">{event.id}</th>
                                        <td>{event.name}</td>
                                        <td>{event.location}</td>
                                        <td>{event.price}</td>
                                        <td>{event.esnprice}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="col-md-6 p-2 card ms-auto">
                            <img src={testImage} height={350} style={{ objectFit: "cover" }} className="card-img-top" alt="..."/>
                                <div className="card-body">
                                    <h5 className="card-title">Event Name</h5>
                                    <p className="card-text">This is a wider card with supporting text below as a
                                        natural lead-in to additional content. This content is a little bit longer.</p>
                                    <p className="card-text"><small className="text-muted">Last updated 3 mins
                                        ago</small></p>
                                </div>
                        </div>
                    </div>
                </div>

            </div>
            
            
        </div>
    )
}

export default HomePage;