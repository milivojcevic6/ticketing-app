import React, {useEffect, useState} from "react";
import axios from "../../../api/axios";

function SectionView() {
    const user = JSON.parse(sessionStorage.getItem('user'));
    console.log("USer",user)
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [newPass, setNewPass] = useState("");
    const [insta, setInsta] = useState("");
    const [linkIn, setlinkIn] = useState("");
    const [tiktok, setTiktok] = useState("");
    const [web, setWeb] = useState("");
    const [fb, setFb] = useState("");
    const [location, setLocation] = useState("");
    const [locationUrl, setLocationUrl] = useState("");
    
    const onNameChange = (event) => {
        setName(event.target.value);
    }

    const onDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const onNewPassChange = (event) => {
        setNewPass(event.target.value);
    };
    
    

    function onSubmit(e) {
        e.preventDefault();

        const updatedUser = {
            role: "section",
            id: user.id,
            username: user.username,
            name: name,
            description: description,
            location: location,
            locationUrl: locationUrl,
            webUrl: web,
            password: newPass || undefined,
            instagramUrl: insta,
            linkedInUrl: linkIn,
            facebookUrl: fb,
            tikTokUrl: tiktok
        };

        console.log('updatedUser', updatedUser);

        axios.put('/api/sections/update', updatedUser)
            .then(response => {
                // Handle the response
                console.log(response);
            })
            .catch(error => {
                // Handle the error
                console.log(error);
            });

        sessionStorage.setItem('user', JSON.stringify(updatedUser))

    }

    return (
        <form onSubmit={onSubmit}>
            <div className="row">
                <div className="col-md-6 form-group">
                    <label htmlFor="username">Username:</label>
                    <input type="text" className="form-control" id="username" name="username" placeholder={user?.name} value={user?.name} disabled/>
                </div>
                <div className="col-md-6 form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" className="form-control" id="email" name="email" placeholder={user?.email} value={user?.email} disabled/>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6 form-group">
                    <label htmlFor="name">Name:</label>
                    <input type="text" className="form-control" id="name" name="name" placeholder={user?.name? user?.name : "e.g. Milan" } onChange={(e)=>setName(e.target.value)} value={name} required/>
                </div>
                <div className="col-md-6 form-group">
                    <label htmlFor="lastname">Description:</label>
                    <input type="text" className="form-control" id="lastname" name="lastname" placeholder={user?.description ? user?.description : "A small section on the coast!" } onChange={(e)=>setDescription(e.target.value)} value={description} required/>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6 form-group">
                    <label htmlFor="location">Location:</label>
                    <input type="text" className="form-control" id="location" name="location" placeholder={user?.location ? user?.location : "Koper" } onChange={(e)=> setLocation(e.target.value)} value={location} />
                </div>
                <div className="col-md-6 form-group">
                    <label htmlFor="locationUrl" >Location Url:</label>
                    <input type="text" className="form-control" id="locationUrl" name="locationUrl" placeholder={user?.locationUrl ? user?.locationUrl : "https://goo.gl/maps/zoP8BpJu4CkhpdeWA" }onChange={(e)=> setLocationUrl(e.target.value)} value={locationUrl} />
                </div>
            </div>
            <div className="row">
                <div className="col-md-6 form-group">
                    <label htmlFor="password"> New Password:</label>
                    <input type="password" className="form-control" id="password" name="password" placeholder="Change your password" onChange={(e)=> setNewPass(e.target.value)} value={newPass} />
                </div>
                <div className="col-md-6 form-group">
                    <label htmlFor="web" >Web Url:</label>
                    <input type="text" className="form-control" id="web" name="web" placeholder={user?.web ? user?.web: "https://esn-primorska.si" } onChange={(e)=> setWeb(e.target.value)} value={web} />
                </div>
            </div>
            <div className="row">
                <div className="col-md-6 form-group">
                    <label htmlFor="instagram">Instagram Url:</label>
                    <input type="text" className="form-control" id="instagram" name="instagram" placeholder={user?.insta ? user?.insta : "https://instagram/primorska" } onChange={(e)=> setInsta(e.target.value)} value={insta} />
                </div>
                <div className="col-md-6 form-group">
                    <label htmlFor="fb" >Facebook Url:</label>
                    <input type="text" className="form-control" id="fb" name="fb" placeholder={user?.fb ? user?.fb : "https://facebook/primorska" } onChange={(e)=> setFb(e.target.value)} value={fb} />
                </div>
            </div>
            <div className="row">
                <div className="col-md-6 form-group">
                    <label htmlFor="tik">TikTok Url:</label>
                    <input type="text" className="form-control" id="tik" name="tik" placeholder={user?.tiktok ? user?.tiktok : "https://tiktok/primorska" } onChange={(e)=> setTiktok(e.target.value)} value={tiktok} />
                </div>
                <div className="col-md-6 form-group">
                    <label htmlFor="linked" >LinkedIn Url:</label>
                    <input type="text" className="form-control" id="linked" name="linked" placeholder={user?.linkIn ? user?.linkIn : "https://linkIn/primorska" } onChange={(e)=> setlinkIn(e.target.value)} value={linkIn} />
                </div>
            </div>
            <div className="form-group center-btn">
                <button type="submit" className="btn btn-primary">Save Changes</button>
            </div>
        </form>
    )
}


export default SectionView;