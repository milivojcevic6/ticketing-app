import {useEffect, useState} from "react";
import { Scanner } from '@yudiel/react-qr-scanner';
import {Html5QrcodeScanner} from "html5-qrcode";
import axios from "../../api/axios";
function CheckQR() {

    const [scanResult, setScanResult] = useState(null);

    const [qrcode, setQrcode] = useState("");

    const [scanStatus, setScanStatus] = useState(false);

    const [info, setInfo] = useState("");


    function handleScan(result) {
        console.log(result)
    }

    function goBack(e) {
        e.preventDefault();
        setScanResult(null);
        setQrcode("");
        setScanStatus(false);
        setInfo("");
    }

    return (
        <div className="row m-auto justify-content-center">
            <h1> Tickets Scanning </h1>
            <div className="col-6">
                <Scanner onScan={handleScan} />
            </div>

            {/*<div className="col" id="reader" style={{width: "600px"}}/>*/}
            {/*{*/}
            {/*    scanResult ?*/}
            {/*        <div>{scanResult}</div> : <div/>*/}
            {/*}*/}
            {/*{*/}
            {/*    scanStatus ?*/}
            {/*        info === "" ?*/}
            {/*            <button onClick={verifyUser}>Verify</button> : <h4>info</h4>*/}
            {/*        : <div/>*/}
            {/*}*/}
            {/*{*/}
            {/*    scanResult ?*/}
            {/*        <button onClick={goBack}>Back</button> : <div/>*/}
            {/*}*/}

        </div>
    )
}

export default CheckQR;