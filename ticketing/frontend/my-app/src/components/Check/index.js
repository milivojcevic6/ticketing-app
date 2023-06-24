import {useEffect, useState} from "react";
import {Html5QrcodeScanner} from "html5-qrcode";
import axios from "../../api/axios";

function CheckQR() {

    const [scanResult, setScanResult] = useState(null);
    
    const [qrcode, setQrcode] = useState("");

    const [scanStatus, setScanStatus] = useState(false);

    const [info, setInfo] = useState("");

    useEffect(() => {
        const scanner = new Html5QrcodeScanner(
            'reader', {
                qrbox: {
                    width: 250,
                    height: 250,
                },
                fps: 5,
            }
        );

        scanner.render(success, error);

        function success(result) {
            scanner.clear();
            setQrcode(result);
            axios.post(`/api/tickets/check/${result}`)
                .then(response => {
                    setScanResult(response)
                    if (response.toString() !== "Ticket doesn't exist") {
                        setScanStatus(true)
                    }
                })
                .catch(error => console.log(error));
            setScanResult(result);
        }

        function error(err) {
            console.warn(err);
        }

    })

    function verifyUser(e) {
        e.preventDefault();
        axios.post(`/api/tickets/check/ok/${qrcode}`)
            .then(response => setInfo(response.toString))
            .catch(error => console.log(error));
    }

    function goBack(e) {
        e.preventDefault();
        setScanResult(null);
        setQrcode("");
        setScanStatus(false);
        setInfo("");
    }

    return (
        <div>
            <h1> Tickets Scanning </h1>
            {
                scanResult ?
                    <div>{scanResult}</div> : <div id="reader"></div>
            }
            {
                scanStatus ?
                    info === "" ?
                        <button onClick={verifyUser}>Verify</button> : <h4>info</h4>
                    : <div/>
            }
            {
                scanResult?
                    <button onClick={goBack}>Back</button> : <div/>
            }
            
        </div>
    )
}

export default CheckQR;