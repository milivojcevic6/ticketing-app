import React, {useEffect, useState} from 'react';
import './style.css'
import {useLocation} from "react-router-dom";
import {format} from 'date-fns'
import {divideReference, formatAmount, formatIban} from "../Helpers";


export function Upn() {
    const {state} = useLocation();

    const [img, setImg] = useState();
    const fetchImage = async () => {
        const res = await fetch("getImage/" + state.path);
        const imageBlob = await res.blob();
        const imageObjectURL = URL.createObjectURL(imageBlob);
        setImg(imageObjectURL);
    };

    useEffect(() => {
        fetchImage();
    }, []);


    const generatePdf = () => {

    }

    return (
        <div id={"upn"}>
            <div className="frame">
                <div className="potrdilo">
                    <div className="objekt">
                        <label className="upn">UPN QR - potrdilo</label>
                    </div>
                    <div className="fieldsPotrdilo">
                        <div className="objekt">
                            <label className="label">Ime plačnika</label>
                            <textarea spellCheck="false" className="ime"></textarea>
                        </div>
                        <div className="objekt">
                            <label className="label2">Namen in rok plačila</label>
                            <textarea spellCheck="false" className="namen"
                                      value={state.description} readOnly></textarea>
                        </div>
                        <div className="objekt">
                            <div className="objekt">
                                <label className="eur">EUR</label>
                            </div>
                            <label className="label3">Znesek</label>
                            <input className="znesek" value={formatAmount(state.amount)} readOnly></input>
                        </div>
                        <div className="objekt">
                            <label className="label2">IBAN in referenca prejemnika</label>
                            <textarea spellCheck="false" className="iban"
                                      value={formatIban(state.iban) + "\n" + state.reference} readOnly></textarea>
                        </div>
                        <div className="objekt">
                            <label className="label2">Ime prejemnika</label>
                            <textarea spellCheck="false" className="iban"
                                      value={state.name + "\n" + state.address + "\n" + state.city} readOnly></textarea>
                        </div>
                    </div>
                </div>
                <div className="right">
                    <div className="placnik">
                        <div className="fieldsPlacnik">
                            <div className="redica">
                                <div className="objekt">
                                    <label className="label">Koda QR</label>
                                    <div className="qrCode text-center">
                                        <img src={img} alt={"..."}/>
                                    </div>
                                </div>
                                <div className="desno">
                                    <div className="redica">
                                        <label className="label">IBAN plačnika</label>
                                        <input className="ibanPlacnika"></input>
                                        <label className="labelPolog">Polog</label>
                                        <input className="polog" disabled></input>
                                        <label className="labelDvig">Dvig</label>
                                        <input className="dvig" disabled></input>
                                    </div>
                                    <div className="redica">
                                        <label className="label2">Referenca plačnika</label>
                                        <input className="referencaKod"></input>
                                        <input className="referenca"></input>
                                    </div>
                                    <div className="redica">
                                        <label className="label2">Ime, ulica in kraj plačnika</label>
                                        <textarea spellCheck="false" className="imeAdresa"></textarea>
                                    </div>
                                    <div className="redica">
                                        <label className="labelZnesek">Znesek</label>
                                        <div className="objekt">
                                            <label className="eur2">EUR</label>
                                        </div>
                                        <input className="znesek2" value={formatAmount(state.amount)} readOnly></input>
                                        <label className="labelDatum">Datum plačila</label>
                                        <input className="datumPlacila"></input>
                                        <label className="labelNujno">Nujno</label>
                                        <input className="nujno" disabled></input>
                                    </div>
                                </div>
                            </div>
                            <div className="redica">
                                <label className="label2">Koda namena</label>
                                <input className="kodaNamena" value={state.paymentCode} readOnly></input>
                                <div className="objekt">
                                    <label className="labelObjekt">Namen plačila</label>
                                    <input className="namenPlacila" value={state.description} readOnly></input>
                                </div>
                                <div className="objekt">
                                    <label className="labelObjekt">Rok plačila</label>
                                    <input className="rokPlacila"
                                           value={format(new Date(state.deadline), 'dd.MM.yyyy')} readOnly></input>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="prejemnik">
                        <div className="fieldsPrejemnik">
                            <div className="redica">
                                <label className="label">IBAN prejemnika</label>
                                <input className="ibanPrejemnika" value={formatIban(state.iban)} readOnly></input>
                                <div className="objekt">
                                    <label className="upnQR">UPN QR</label>
                                </div>
                            </div>
                            <div className="redica">
                                <div className="levo">
                                    <div className="redica">
                                        <label className="label2">Referenca prejemnika</label>
                                        <input className="referencaKod" value={divideReference(state.reference)[0]} readOnly></input>
                                        <input className="referenca" value={divideReference(state.reference)[1]} readOnly></input>
                                    </div>
                                    <div className="redica">
                                        <label className="label2">Ime, ulica in kraj prejemnika</label>
                                        <textarea spellCheck="false" className="imeAdresa"
                                                  value={state.name + "\n" + state.address + "\n" + state.city} readOnly></textarea>
                                    </div>
                                </div>
                                <div className="podpis">
                                    <div className="linija">
                                        <label className="podpisLabel">Podpis plačnika (neobvezno žig)</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );

}

export default Upn;