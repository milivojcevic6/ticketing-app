import './profile.css';
import React, { useEffect, useState } from "react";
import axios from "../../api/axios";

function Profile() {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const [sections, setSections] = useState([]);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [selectedSections, setSelectedSections] = useState([]);
    const [newPass, setNewPass] = useState("");

    useEffect(() => {
        loadSections()
            .then(response => console.log(response))
            .catch(error => console.log(error));
    }, []);

    const loadSections = async () => {
        const result = await axios.get("/api/sections");
        console.log(result);
        setSections(result.data);
    };

    function onFirstNameChange(event) {
        setFirstName(event.target.value);
    }

    function onLastNameChange(event) {
        setLastName(event.target.value);
    }

    function onNewPassChange(event) {
        setNewPass(event.target.value);
    }

    const handleSectionChange = (event) => {
        const selectedOptionValues = Array.from(event.target.selectedOptions, (option) => option.value);
        const selectedSectionObjects = sections.filter(section => selectedOptionValues.includes(section.id.toString()));
        setSelectedSections(selectedSectionObjects);
    };

    function onSubmit(e) {
        e.preventDefault();

        const updatedUser = {
            id: user.id,
            username: user.username,
            firstName: firstName,
            lastName: lastName,
            email: user.email,
            sections: selectedSections,
            password: newPass || undefined
        };

        console.log('updatedUser', updatedUser);

        axios.put('/api/users/update', updatedUser)
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


    return(
        <div className="profile-container">
            <h1 className="mb-5">User Profile</h1>
            <form onSubmit={onSubmit}>
                <div className="row">
                    <div className="col-md-6 form-group">
                        <label htmlFor="username">Username:</label>
                        <input type="text" className="form-control" id="username" name="username" placeholder={user?.username} value={user?.username} disabled/>
                    </div>
                    <div className="col-md-6 form-group">
                        <label htmlFor="email">Email:</label>
                        <input type="email" className="form-control" id="email" name="email" placeholder={user?.email} value={user?.email} disabled/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 form-group">
                        <label htmlFor="firstname">First Name:</label>
                        <input type="text" className="form-control" id="firstname" name="firstname" placeholder={user?.firstName ? user?.firstName : "e.g. Milan" } onChange={onFirstNameChange} value={firstName} required/>
                    </div>
                    <div className="col-md-6 form-group">
                        <label htmlFor="lastname">Last Name:</label>
                        <input type="text" className="form-control" id="lastname" name="lastname" placeholder={user?.lastName ? user?.lastName : "e.g.Milivojcevic" } onChange={onLastNameChange} value={lastName} required/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 form-group">
                        <label htmlFor="password">New Password:</label>
                        <input type="password" className="form-control" id="password" name="password" placeholder="Change your password" onChange={onNewPassChange} value={newPass} />
                    </div>
                    <div className="col-md-6 form-group">
                        <label htmlFor="sections" className="form-label">Sections</label>
                        {/*<select className="form-select" id="sections" aria-label="Sections" onChange={onSectionSelectedChange} value={sectionSelected} >
                                <option value="">--Please choose an option--</option>
                                {sections.map((section) => (
                                    <option value={section} key={section?.id} >{section?.username}</option>
                                ))}
                            </select>

                            <select id="section" onChange={handleSectionChange}  value={selectedSections}>
                                <option value="">--Please choose an option--</option>
                                {sections.map(section => (
                                    <option key={section.id} value={section}>{section.username}</option>
                                ))}
                            </select>*/}

                        <select id="section" onChange={handleSectionChange} multiple value={selectedSections.map(section => section.id)}>
                            <option value="">--Please choose an option--</option>
                            {sections.map(section => (
                                <option key={section.id} value={section.id}>{section.username}</option>
                            ))}
                        </select>

                    </div>

                </div>
                <div className="form-group center-btn">
                    <button type="submit" className="btn btn-primary">Save Changes</button>
                </div>
            </form>

            <br/>
            <br/>
            <br/>
        </div>
    )}

export default Profile