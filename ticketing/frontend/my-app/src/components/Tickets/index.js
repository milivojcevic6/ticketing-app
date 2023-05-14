import React, { useEffect, useState } from "react";
import "./tickets.css";

function Tickets() {


    return (
        <div>
            <h1>Tickets</h1>
            <table>
                <thead>
                <tr>
                    <th>Event Name</th>
                    <th>Event Location</th>
                    <th>Issued Date</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody>
                {/*tickets.map((ticket) => (
                    <tr key={ticket.id}>
                        <td>{ticket.eventName}</td>
                        <td>{ticket.eventLocation}</td>
                        <td>{ticket.issuedDate}</td>
                        <td>{ticket.status}</td>
                    </tr>
                ))*/}
                <tr>
                    <td>PubQuiz</td>
                    <td>Center Mladih Koper</td>
                    <td>13.05.2023</td>
                    <td>Active</td>
                </tr>
                </tbody>
            </table>
        </div>
    );
}

export default Tickets;
