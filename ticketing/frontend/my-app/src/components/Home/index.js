import React from "react";
import {Badge} from "react-bootstrap";

function HomePage() {
    return (

        <div>
            <h1>
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
            <br/>
            
        </div>
    )
}

export default HomePage;