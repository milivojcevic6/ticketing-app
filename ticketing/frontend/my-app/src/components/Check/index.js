import {useEffect, useState} from "react";
import {Scanner} from '@yudiel/react-qr-scanner';
import {Html5QrcodeScanner} from "html5-qrcode";
import axios from "../../api/axios";

function CheckQR() {

    const [scanResult, setScanResult] = useState(null);

    const [scanStatus, setScanStatus] = useState(false);


    async function handleScan(result) {
        await axios.get(`/api/tickets/${result[0].rawValue}/`)
            .then(response => {
                setScanResult(response.data);
                setScanStatus(true)
            })
            .catch(error => {
                console.error('Error fetching ticket details:', error);
                alert("Not Valid QR")
            });
    }

    function goBack(e) {
        e.preventDefault();
        setScanResult(null);
        setScanStatus(false);
    }

    return (
        <div className="row m-auto justify-content-center">
            <h1> Tickets Scanning </h1>
            <div className="col-6">
                {scanStatus ?
                    (
                        <div className="card">
                            <div className="card-header">
                                <h3>You arrived</h3>
                            </div>
                            <div className="card-body">
                                {scanResult && (
                                    <div>
                                        <h4><b>Atendee</b>: {scanResult.user_id.first_name} {scanResult.user_id.last_name}</h4>
                                        <h5><b>Event</b>: {scanResult.event_id.name}</h5>
                                    </div>
                                )}
                            </div>
                            <button onClick={goBack}>Back</button>

                        </div>

                    )
                    : (
                        <Scanner onScan={handleScan}/>
                    )}

            </div>

        </div>
    )
}

export default CheckQR;