import './profile.css';
import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import UserView from "./UserView";
import SectionView from "./SectionView";

function Profile() {
    const user = JSON.parse(sessionStorage.getItem('user'));
    
    const isSectionUser = user.role === 'section'; // Check if the user's role is "section"
    // const isSectionUser = false; // Check if the user's role is "section"


    /*const [sections, setSections] = useState([]);
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

    const onFirstNameChange = (event) => {
        setFirstName(event.target.value);
    }

    const onLastNameChange = (event) => {
        setLastName(event.target.value);
    };

    const onNewPassChange = (event) => {
        setNewPass(event.target.value);
    };

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
        
    }*/

    


    return(
        <div className="profile-container">
            <h1 className="mb-5">{isSectionUser ? "Section" : "User"} Profile</h1>
            {isSectionUser ? (
                // Render section user view
                <SectionView/>
            ) : (
                // Render user view
                <UserView />
            )}
            <br/>
            <br/>
            <br/>
        </div>
    )}

export default Profile