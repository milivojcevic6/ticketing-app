import React, {useEffect, useState} from "react";
import axios from "../../../api/axios";

function SectionView() {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const [success, setSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [popupErrorMessage, setPopupErrorMessage] = useState(null);
    const [popupSuccess, setPopupSuccess] = useState(false);
    const [showEditPopup, setShowEditPopup] = useState(false);
    const [old_password, setOldPassword] = useState("");
    const [repeat_password, setRepeatPassword] = useState("");
    const [new_password, setNewPassword] = useState("");
    const [name, setName] = useState(null);
    const [username, setUsername] = useState(null);
    const [email, setEmail] = useState(null);
    const [description, setDescription] = useState(null);
    const [insta, setInsta] = useState(null);
    const [linkIn, setlinkIn] = useState(null);
    const [tiktok, setTiktok] = useState(null);
    const [web, setWeb] = useState(null);
    const [fb, setFb] = useState(null);
    const [location, setLocation] = useState(null);
    const [locationUrl, setLocationUrl] = useState(null);

    function handleCloseEditPopup() {
        setShowEditPopup(false);
    }

    function handleOpenEditPopup() {
        setShowEditPopup(true);
    }

    function updateSection(e) {
        e.preventDefault();

        const updatedUser = {
            id: user.id,
            name: name ?? user.name,
            section_username: username ?? user.section_username,
            description: description ?? user.description,
            location: location ?? user.location,
            location_url: locationUrl ?? user.location_url,
            website_url: web ?? user.website_url,
            email: email ?? user.email,
            facebook_url: fb ?? user.facebook_url,
            instagram_url: insta ?? user.instagram_url,
            linkedin_url: linkIn ?? user.instagram_url,
            tiktok_url: tiktok ?? user.tiktok_url
        };

        console.log('updatedUser', updatedUser);


        axios.put('/api/sections/update/', updatedUser)
            .then(response => {
                // Handle the response
                setSuccess(true)
                setErrorMessage(null)
                updatedUser.role = "section"
                sessionStorage.setItem('user', JSON.stringify(updatedUser))
            })
            .catch(error => {
                const firstKey = Object.keys(error.response.data)[0];
                const firstValue = error.response.data[firstKey];
                if (firstValue) {
                    setErrorMessage(firstValue)
                } else {
                    setErrorMessage("There is an error on updating section!")
                }
                setSuccess(false)

            });
    }

    function changePassword(e) {
        e.preventDefault();

        if (new_password !== repeat_password) {
            setPopupErrorMessage('Passwords do not match');
            setPopupSuccess(false)
        } else {

            const updatedUser = {
                id: user.id,
                old_password: old_password,
                new_password: new_password
            };

            axios.put('/api/sections/change-password/', updatedUser)
                .then(response => {
                    // Handle the response
                    setPopupSuccess(true)
                    setPopupErrorMessage(null)

                })
                .catch(error => {
                    const firstKey = Object.keys(error.response.data)[0];
                    const firstValue = error.response.data[firstKey];
                    if (firstValue) {
                        setPopupErrorMessage(firstValue)
                    } else {
                        setPopupErrorMessage("There is an error on updating section!")
                    }
                    setPopupSuccess(false)

                });

        }

    }

    return (
        <>
            {showEditPopup && (
                <form onSubmit={changePassword}>

                    <div style={{minWidth: "500px"}} className="list-popup show">
                        <h2>Change Password</h2>
                        <hr/>
                        {popupErrorMessage && (
                            <div className="alert alert-warning" role="alert">
                                {popupErrorMessage}
                            </div>
                        )}
                        {popupSuccess && (
                            <div className="alert alert-success" role="alert">
                                You have successfully changed your password.
                            </div>
                        )}
                        {!popupSuccess && (
                            <>
                                <input
                                    required
                                    type="password"
                                    placeholder="Old Password"
                                    autoComplete="off"
                                    value={old_password}
                                    onChange={(e) => setOldPassword(e.target.value)}
                                />

                                <input
                                    required
                                    type="password"
                                    placeholder="New Password"
                                    autoComplete="off"
                                    value={new_password}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />

                                <input
                                    required
                                    type="password"
                                    placeholder="Repeat New Password"
                                    autoComplete="off"
                                    value={repeat_password}
                                    onChange={(e) => setRepeatPassword(e.target.value)}
                                />

                                <div style={{maxWidth: "150px", margin: "auto"}}>
                                    <div className="d-flex justify-content-between pt-2 pb-2">
                                        <button id="btnAdd" style={{width: "70px"}}>Change</button>
                                        <button type={"button"} id="btnClose" style={{width: "70px"}}
                                                onClick={handleCloseEditPopup}>Cancel
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                    <div className="list-popup-overlay"></div>
                </form>
            )}
            <form onSubmit={updateSection}>
                {errorMessage &&
                    <div className="alert alert-warning" role="alert">
                        {errorMessage}</div>}

                {success ? (
                    <div className="alert alert-success" role="alert">
                        You have successfully updated your data.
                    </div>
                ) : (
                    <div/>
                )
                }
                <div className="row">
                    <div className="col-md-6 form-group">
                        <label htmlFor="username">Username:</label>
                        <input type="text" className="form-control" id="username" name="username"
                               placeholder={user?.section_username} value={user?.section_username ?? ''} disabled/>
                    </div>
                    <div className="col-md-6 form-group">
                        <label htmlFor="email">Email:</label>
                        <input type="email" className="form-control" id="email" name="email" placeholder={user?.email}
                               value={user?.email ?? ''} disabled/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 form-group">
                        <label htmlFor="name">Name:</label>
                        <input type="text" className="form-control" id="name" name="name"
                               placeholder={user?.name ?? ""}
                               onChange={(e) => setName(e.target.value)} value={name ?? user.name ?? ''} required/>
                    </div>
                    <div className="col-md-6 form-group">
                        <label htmlFor="lastname">Description:</label>
                        <input type="text" className="form-control" id="lastname" name="lastname"
                               placeholder={user?.description ?? ""}
                               onChange={(e) => setDescription(e.target.value)}
                               value={description ?? user.description ?? ''}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 form-group">
                        <label htmlFor="location">Location:</label>
                        <input type="text" className="form-control" id="location" name="location"
                               placeholder={user?.location ? user?.location : "Koper"}
                               onChange={(e) => setLocation(e.target.value)} value={location ?? user.location ?? ''}/>
                    </div>
                    <div className="col-md-6 form-group">
                        <label htmlFor="locationUrl">Location Url:</label>
                        <input type="text" className="form-control" id="locationUrl" name="locationUrl"
                               placeholder={user?.locationUrl ?? ""}
                               onChange={(e) => setLocationUrl(e.target.value)}
                               value={locationUrl ?? user.location_url ?? ''}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 form-group">
                        <label htmlFor="web">Web Url:</label>
                        <input type="text" className="form-control" id="web" name="web"
                               placeholder={user?.website_url ?? ""}
                               onChange={(e) => setWeb(e.target.value)} value={web ?? user.website_url ?? ''}/>
                    </div>
                    <div className="col-md-6 form-group">
                        <label htmlFor="instagram">Instagram Url:</label>
                        <input type="text" className="form-control" id="instagram" name="instagram"
                               placeholder={user?.instagram_url ?? ""}
                               onChange={(e) => setInsta(e.target.value)} value={insta ?? user.instagram_url ?? ''}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 form-group">
                        <label htmlFor="fb">Facebook Url:</label>
                        <input type="text" className="form-control" id="fb" name="fb"
                               placeholder={user.facebook_url ?? ""}
                               onChange={(e) => setFb(e.target.value)} value={user.facebook_url ?? ''}/>
                    </div>
                    <div className="col-md-6 form-group">
                        <label htmlFor="tik">TikTok Url:</label>
                        <input type="text" className="form-control" id="tik" name="tik"
                               placeholder={user?.tiktok_url ?? ""}
                               onChange={(e) => setTiktok(e.target.value)} value={tiktok ?? user.tiktok_url ?? ''}/>
                    </div>
                </div>
                <div className="row">

                    <div className="col-md-6 form-group">
                        <label htmlFor="linked">LinkedIn Url:</label>
                        <input type="text" className="form-control" id="linked" name="linked"
                               placeholder={user?.linkedin_url ?? ""}
                               onChange={(e) => setlinkIn(e.target.value)} value={linkIn ?? user.linkedin_url ?? ''}/>
                    </div>
                </div>
                <div className="form-group center-btn">
                    <button type="submit" className="btn btn-primary">Save Changes</button>
                    <button type="button" className="btn btn-secondary ms-2" onClick={handleOpenEditPopup}>Change
                        Password
                    </button>
                </div>

                {/*            <div className="col-md-6 form-group">
                <label htmlFor="password"> New Password:</label>
                <input type="password" className="form-control" id="password" name="password"
                       placeholder="Change your password" onChange={(e) => setNewPass(e.target.value)}
                       value={newPass}/>
            </div>*/}

            </form>
        </>

    )
}


export default SectionView;