import {MdEdit} from "react-icons/md";
import React, {useEffect, useState} from "react";
import {useAuth} from "../Context/AuthContext";
import {BsPlusLg} from "react-icons/bs";
import IbanModal from "../Modals/IbanModal";

function ProfilePage() {

    const [user, setUser] = useState([]);
    const [modalShow, setModalShow] = React.useState(false);

    const {getUser} = useAuth();

    useEffect(() => {
        getUserData();
    }, []);

    const getUserData = async () => {

        const loggedUser = getUser()
        const options = {
            headers: {'Content-type': 'application/json'},
            method: 'POST',
            body: loggedUser.id,
        };

        const response = await fetch('/user/getUserInfo', options)
        const body = await response.json()
        setUser(body);

    }
    return (
        <>
            <section style={{background: "#eee"}}>
                <div className="container py-5">
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="card mb-4">
                                <div className="card-body text-center">
                                    <img
                                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                                        alt="avatar"
                                        className="rounded-circle img-fluid" style={{width: "150px"}}></img>
                                    <h5 className="my-3">{user.name}</h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <div className="card mb-4">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <p className="mb-0">Name:</p>
                                        </div>
                                        <div className="col-sm-7">
                                            {user.name}
                                        </div>
                                        <div className="col-sm-2">
                                            <p className="text-muted mb-0">
                                                <a className="float-end"><MdEdit/></a>
                                            </p>
                                        </div>
                                    </div>
                                    <hr/>
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <p className="mb-0">Street:</p>
                                        </div>
                                        <div className="col-sm-7">
                                            {user.street}
                                        </div>
                                        <div className="col-sm-2">
                                            <p className="text-muted mb-0">
                                                <a className="float-end"><MdEdit/></a>
                                            </p>
                                        </div>
                                    </div>
                                    <hr/>
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <p className="mb-0">Street Number:</p>
                                        </div>
                                        <div className="col-sm-7">
                                            {user.streetNumber}
                                        </div>
                                        <div className="col-sm-2">
                                            <p className="text-muted mb-0">
                                                <a className="float-end"><MdEdit/></a>
                                            </p>
                                        </div>
                                    </div>
                                    <hr/>
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <p className="mb-0">City:</p>
                                        </div>
                                        <div className="col-sm-7">
                                            {user.city}
                                        </div>
                                        <div className="col-sm-2">
                                            <p className="text-muted mb-0">
                                                <a className="float-end"><MdEdit/></a>
                                            </p>
                                        </div>
                                    </div>
                                    <hr/>
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <p className="mb-0">City Code:</p>
                                        </div>
                                        <div className="col-sm-7">
                                            {user.cityCode}
                                        </div>
                                        <div className="col-sm-2">
                                            <p className="text-muted mb-0">
                                                <a className="float-end"><MdEdit/></a>
                                            </p>
                                        </div>
                                    </div>
                                    <hr/>
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <p className="mb-0">Account:</p>
                                        </div>
                                        <div className="col-sm-7">
                                            {user.accounts?.map((acc, ix) => (
                                                <p key={ix + 1}>{acc.number}</p>
                                            ))}
                                        </div>
                                        <div className="col-sm-2">
                                            <div className="float-end">
                                                <div className="row">
                                                    <p className="text-muted mb-0">
                                                        <a href="#" onClick={() => setModalShow(true)}><BsPlusLg/></a>
                                                    </p>
                                                </div>
                                                <div className="row">
                                                    <p className="text-muted mb-0">
                                                        <a href={"#"}><MdEdit/></a>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <IbanModal show={modalShow} onHide={() => setModalShow(false)}
            />
        </>
    )
}

export default ProfilePage