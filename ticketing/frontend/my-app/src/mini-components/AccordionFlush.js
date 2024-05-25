import React from "react";
import { Accordion, Card } from "react-bootstrap";

function AccordionFlush() {
    return (
        <Accordion flush>
            <Card>
                <Accordion.Toggle as={Card.Header} eventKey="0">
                    First item
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                    <Card.Body>Content for first item goes here</Card.Body>
                </Accordion.Collapse>
            </Card>
            <Card>
                <Accordion.Toggle as={Card.Header} eventKey="1">
                    Second item
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="1">
                    <Card.Body>Content for second item goes here</Card.Body>
                </Accordion.Collapse>
            </Card>
            <Card>
                <Accordion.Toggle as={Card.Header} eventKey="2">
                    Third item
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="2">
                    <Card.Body>Content for third item goes here</Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    );
}

export default AccordionFlush;
