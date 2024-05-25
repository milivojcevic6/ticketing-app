import React, {useEffect, useState} from "react";
import axios from "../../../api/axios";
import * as Icon from "react-feather";

function UserView() {
    const user = JSON.parse(sessionStorage.getItem('user'));
    
    const [sections, setSections] = useState([]);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [selectedSections, setSelectedSections] = useState([]);
    const [newPass, setNewPass] = useState("");
    const [esncode, setEsncode] = useState("");
    const [isDisabledESNcode, setIsDisabledESNcode] = useState(true);

    useEffect(() => {
        loadSections()
            .then(response => console.log(response))
            .catch(error => console.log(error));
    }, []);

    const loadSections = async () => {
        const result = await axios.get("/api/sections/");
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
    
    const onESNcodeChange = (event) => {
        setEsncode(event.target.value);
    };

    const handleSectionChange = (event) => {
        const selectedOptionValues = Array.from(event.target.selectedOptions, (option) => option.value);
        const selectedSectionObjects = sections.filter(section => selectedOptionValues.includes(section.id.toString()));
        setSelectedSections(selectedSectionObjects);
    };


    function onSubmit(e) {
        e.preventDefault();

        const updatedUser = {
            role: "user",
            id: user.id,
            username: user.username,
            firstName: firstName,
            lastName: lastName,
            email: user.email,
            sections: selectedSections,
            password: newPass || undefined,
            esncard_code : esncode || undefined
        };

        // console.log('updatedUser', updatedUser);

        axios.put('/api/users/update', updatedUser)
            .then(response => {
                // Handle the response
                // console.log(response);
            })
            .catch(error => {
                // Handle the error
                // console.log(error);
            });

        sessionStorage.setItem('user', JSON.stringify(updatedUser))

    }
    
    const buttonText = isDisabledESNcode ? <Icon.Edit/> : <Icon.Save/>;



    async function ESNcodeClick() {

        if (!isDisabledESNcode) {
            const esnCode = document.getElementById("ESNcodeInput").value;
            const apiUrl = `https://esncard.org/services/1.0/card.json?code=${esnCode}`;
            console.log(apiUrl)
            console.log("New push!")

            try {
                const response = await fetch(apiUrl, { mode: 'no-cors' });
                const data = await response.json();
                // const data = await response;
                console.log("IN !!!!")
                console.log(response.text())

                if (data.status === "available") {
                    // alert("This ESN card is available!");
                    console.log("This ESN card is available!")
                } else if (data.status === "expired") {
                    // alert("This ESN card is expired.");
                    console.log("This ESN card is expired.")
                } else if (data.status === "active") {
                    console.log("Response is:")
                    console.log(data)
                    document.getElementById("ESNcodeInput").style.border = "4px solid #7AC143";
                    // setIsDisabledESNcode(true); // Disable input after successful activation
                } else {
                    console.error("Unknown status received from API:", data.status);
                    // Handle unexpected responses (optional, e.g., display an error message)
                }
            } catch (error) {
                console.error("Error fetching ESN card data:", error);
                // Handle API request errors (optional, e.g., display an error message)
            }
        }

        setIsDisabledESNcode(!isDisabledESNcode);
    }
    

    return (
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
                    <input type="text" className="form-control" id="firstname" name="firstname" placeholder={user?.firstName ? user?.firstName : "e.g. Milan" } onChange={onFirstNameChange} value={firstName} disabled required/>
                </div>
                <div className="col-md-6 form-group">
                    <label htmlFor="lastname">Last Name:</label>
                    <input type="text" className="form-control" id="lastname" name="lastname" placeholder={user?.lastName ? user?.lastName : "e.g.Milivojcevic" } onChange={onLastNameChange} value={lastName} disabled required/>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6 form-group">
                    <label htmlFor="password">New Password:</label>
                    <input type="password" className="form-control" id="password" name="password" placeholder="Change your password" onChange={onNewPassChange} value={newPass} disabled />
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

                    <select id="section" onChange={handleSectionChange} multiple
                            // placeholder="Please choose sections"
                            value={selectedSections.map(section => section.id)}>
                        <option value="">--Please choose an option--</option>
                        {sections.map(section => (
                            <option key={section.id} value={section.id}>{section.username}</option>
                        ))}
                    </select>                    
                </div>
            </div>
            <div className="row">
                <div className="col-md-6 form-group">
                    <label htmlFor="esncode">ESNcard code:</label>
                    <input type="text" className="form-control" id="esncode" name="ESNcard" placeholder={user?.esncard_code ? user?.esncard_code : "Write the code from the card here" } onChange={onESNcodeChange} value={esncode} disabled required/>
                </div>
                
                <div className="col-md-6 input-container">
                    <label htmlFor="ESNcodeInput">ESNcard code:</label>
                    <input type="text" id="ESNcodeInput" disabled={isDisabledESNcode}
                           placeholder={user?.esncard_code ? user?.esncard_code : "Write the code from the card here" }
                    />
                    <button className="btnESNcode" id="editESNcard" onClick={ESNcodeClick}>{buttonText}</button>
                </div>
                
            </div>
            <div className="form-group center-btn">
                <button type="submit" className="btn btn-primary">Save Changes</button>
            </div>
        </form>
    )
}


export default UserView;