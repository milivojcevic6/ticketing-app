import React, {useEffect, useState} from "react";
import {Badge} from "react-bootstrap";
import axios from "axios";

function HomePage() {
    
    const [events, setEvents] = useState([])
    
    useEffect(() => {
        loadEvents()
    }, [])
    
    const loadEvents = async () => {
        const result = await axios.get("http://localhost:8080/api/events")
        console.log(result);
        setEvents(result.data)
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
                        <div className="col-md-6 px-0">
                            <table className="table table-striped">
                                <thead>
                                <tr>
                                    <th scope="col">Number</th>
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
                    </div>
                </div>

            </div>
            
            
        </div>
    )
}

export default HomePage;