import Modal from 'react-bootstrap/Modal';
import {useAuth} from "../Context/AuthContext";
import {isValidIBAN} from "ibantools";
import React, {useState} from "react";


function IbanModel(props) {

    const {getUser} = useAuth();
    const [errorMessage,setErrorMessage] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault()

        const data = new FormData(e.target)

        const req = {
            number: data.get('number').replace(/\s+/g, ''),
            id: data.get('id'),
        }

        if(!isValidIBAN(req.number)){
            setErrorMessage(
                "Iban is invalid"
            )
            document.getElementById("greski").hidden =false

            return;
        } else {

            const options = {
                headers: {'Content-type': 'application/json'},
                method: 'POST',
                body: JSON.stringify(req)
            };

            const response = await fetch('/user/addIban', options).then((res) => res.text())

            alert(response)
            window.location.reload()
        }

    };

    return (
        <Modal
            show={props.show} onHide={props.onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add New IBAN Account </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit} id="ibanForm">
                    <input name="id" hidden value={getUser().id} readOnly/>
                    <div className="container alert-danger mb-3 p-2" id="greski" hidden>{errorMessage}</div>
                    <input maxLength="42" minLength="16" className={"form-control"} required name="number"
                           placeholder={"Number"}
                           onKeyUp={e => {
                               let val = e.target.value;
                               const len = val.length;
                               const key = e.key;

                               if(key === "Backspace")
                                   if(len === 5 || len === 10 || len === 15 || len === 20 || len === 25 || len === 30 || len === 35 || len === 40 )
                                       e.target.value=val.slice(0,-1)
                                   else e.target.value=val
                               else if(len === 4 || len === 9 || len === 14 || len === 19 || len === 24 || len === 29 || len === 34 || len === 39)
                                   e.target.value=(val + " ")
                               else e.target.value=val
                           }}/>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <button className={"btn btn-danger"} onClick={props.onHide} >Close</button>
                <button type="submit" className={"btn btn-primary"} form="ibanForm">Add</button>
            </Modal.Footer>
        </Modal>
    );
}

export default IbanModel