import React, {useState} from 'react';
import './new.css';
import countriesData from '../../database/countries.json';
import * as Icon from "react-feather";
import {Edit} from "react-feather";

function getBList(selectedCountry) {
    // Implement logic to fetch or filter elements B based on selectedA
    // Example: return ['Element B1', 'Element B2'];
    console.log(selectedCountry);
    const countryCode = (countriesData.find(c => c.name === selectedCountry)).code;
    console.log(countryCode);
    return ['Element B1', 'Element B2'];
}

function UserProfile() {
    
    const user = JSON.parse(window.sessionStorage.getItem('user'));
    
    const countryNames = countriesData.map(country => country.name);

    const [userData, setUserData] = useState(user);
    const [showEditPopup, setShowEditPopup] = useState(false);
    const [editField, setEditField] = useState('');
    const [editPlaceholder, setEditPlaceholder] = useState('First placeholder :)');
    const [newValue, setNewValue] = useState('');
    const [showListPopup, setShowListPopup] = useState(false);
    const [openAddOptions, setOpenAddOptions] = useState(null); // Selected element from list A
    const [selectedCountry, setSelectedCountry] = useState(null); // Selected element from list A
    const [selectedSection, setSelectedSection] = useState(null); // Selected element from list B
    const [followingSections, setFollowingSections] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const [alertSave, setAlertSave] = useState(false); 
    const [alertCancel, setAlertCancel] = useState(false); 
    const [somethingChanged, setSomethingChanged] = useState(false); 
    

    function handleOpenEditPopup(value) {
        
        setEditField(value);
        
        if (value === "first name") {
            setEditPlaceholder(userData.first_name);
            setNewValue("");
        }
        if (value === "last name") {
            setEditPlaceholder(userData.last_name);
            setNewValue("");
        }
        if (value === "email") {
            setEditPlaceholder(userData.email);
            setNewValue("");
        }
        if (value === "username") {
            setEditPlaceholder(userData.username);
            setNewValue("");
        }
        if (value === "ESNcard code") {
            setEditPlaceholder(userData?.card_id?.code);
            setNewValue("");
        }
        setShowEditPopup(true);
    }


    function handleCloseEditPopup() {
        setEditField("");
        setNewValue("");
        setShowEditPopup(false);
    }
    
    function handleInputChange(event) {
        setNewValue(event.target.value);
    }
    
    function handleEditElement() {

        if (editField === "first name" && newValue!=="") {
            userData.first_name = newValue;
            setSomethingChanged(true);
        }
        if (editField === "last name" && newValue!=="") {
            userData.last_name = newValue;
            setSomethingChanged(true);
        }
        if (editField === "email" && newValue!=="") {
            userData.email = newValue;
            setSomethingChanged(true);
        }
        if (editField === "username" && newValue!=="") {
            userData.username = newValue;
            setSomethingChanged(true);
        }
        if (editField === "ESNcard code") {
            userData.card_id.code = newValue;
            setSomethingChanged(true);
        }
        
        
        // Optionally, you can add code to update the user state and/or close the popup
        // console.log("Updated user:", user);
        handleCloseEditPopup();
    }

    const handleOpenListPopup = () => {
        setShowListPopup(true);
    };

    const handleCloseListPopup = () => {
        setSelectedCountry(null); // Reset selected country
        setSelectedSection(null); // Reset selected section
        setShowListPopup(false); // Close popup
        setOpenAddOptions(false)
    };

    const handleAddElement = (element) => {
        if(!openAddOptions){
            setOpenAddOptions(true)
        }else {
            setFollowingSections([...followingSections, selectedSection])            
        }
    };

    const handleSelectA = (value) => {
        setSelectedCountry(value);
        setSelectedSection("");
    };
    
    const handleSelectSection = (value) => {
        setSelectedSection(value);
    };

    const filteredSections = selectedCountry ? getBList(selectedCountry) : []; // Filter elements B

    const handleSelectRow = (isChecked, rowIndex) => {
        const newSelectedRows = [...selectedRows]; // Copy existing state

        if (isChecked) {
            newSelectedRows.push(rowIndex); // Add index to selected if checked
            // console.log(newSelectedRows)
        } else {
            const index = newSelectedRows.indexOf(rowIndex); // Find index to remove
            newSelectedRows.splice(index, 1); // Remove index if unchecked
        }

        setSelectedRows(newSelectedRows);
    };

    const handleDeleteRow = () => {
        // Implement logic to delete the row with index 'rowIndex'
        // This might involve filtering 'followingSections' and updating state
        const newFollowingSections = [...followingSections]; // Copy existing data
        
        // Sort selectedRows in descending order (optional)
        const sortedSelectedRows = [...selectedRows].sort((a, b) => b - a);

        // Iterate through selected rows in reverse order
        sortedSelectedRows.forEach((rowIndex) => {
            newFollowingSections.splice(rowIndex, 1); // Remove element at each index
        });
        // newFollowingSections.splice(selectedRows, 1); // Remove element at index
        setFollowingSections(newFollowingSections); // Update state with modified data
        setSelectedRows([]);
    };


    function handleCancel() {
        setUserData(user);
        setAlertCancel(true);
        setSomethingChanged(false)
        
        // After 5 seconds, set alert back to false
        setTimeout(() => {
            setAlertCancel(false);
        }, 5000); // 5000 milliseconds = 5 seconds
    }

    function handleSave() {
        window.sessionStorage.setItem('user', JSON.stringify(userData));
        setAlertSave(true);
        setSomethingChanged(false);
        
        // After 5 seconds, set alert back to false
        setTimeout(() => {
            setAlertSave(false);
        }, 5000); // 5000 milliseconds = 5 seconds
    }

    return (
        
        <div className="user-profile">
            {alertCancel &&
                <div className="alert alert-warning" role="alert">
                    All changes were discarded.    
                </div>}

            {alertSave ? (
                <div className="alert alert-success" role="alert">
                    Changes have be saved successfully.
                </div>
            ) : (
                <div/>
            )
            }
            <div className="user-profile-header">
                <h2>User Profile</h2>
                <div className="user-profile-actions">
                    <button disabled={!somethingChanged} 
                            onClick={handleCancel}
                            style={{backgroundColor: somethingChanged? "red": "lightgray"}}>
                        CANCEL
                    </button>
                    <button disabled={!somethingChanged} 
                            onClick={handleSave}
                            style={{backgroundColor: somethingChanged? "green": "lightgray"}}>
                        SAVE
                    </button>
                </div>
            </div>
            <div className="user-profile-body">
                <div className="user-profile-section">
                    <h3>Basic Info</h3>
                    <div className="user-profile-row">
                        <span className="user-profile-row">Username:</span>
                        <span>
                            <div className="user-info-btn">
                                <button value="username" type={"button"} className={"btn btn-secondary btn-sm d-inline"}
                                        onClick={() => handleOpenEditPopup("username")}>
                                    {userData?.username}
                                </button>
                            </div>
                        </span>
                    </div>
                    <div className="user-profile-row">
                        <span className="fieldFont">Email:</span>
                        <span>
                            <div className="user-info-btn">
                                <button type={"button"} className={"btn btn-secondary btn-sm d-inline"}
                                        onClick={() => handleOpenEditPopup("email")}>
                                    {userData?.email}
                                </button>
                            </div>
                        </span>
                    </div>
                    <div className="user-profile-row">
                        <span className="fieldFont">Password:</span>
                        <span>
                            <div className="user-info-btn">
                                <button type={"button"} className={"btn btn-secondary btn-sm d-inline"}>
                                    Change password
                                </button>
                            </div>
                        </span>
                        {/*<a href="#">Change password</a>*/}
                    </div>
                </div>
                <div className="user-profile-section">
                    <h3>Contact</h3>
                    <div className="user-profile-row">
                        <span className="fieldFont">First Name:</span>
                        <span>
                            <div className="user-info-btn">
                                <button type={"button"} className={"btn btn-secondary btn-sm d-inline"}
                                        onClick={() => handleOpenEditPopup("first name")}>
                                    {userData?.first_name}
                                </button>
                            </div>
                        </span>
                    </div>
                    <div className="user-profile-row">
                        <span className="fieldFont">Last Name:</span>
                        <span>
                            <div className="user-info-btn">
                                <button type={"button"} className={"btn btn-secondary btn-sm d-inline"}
                                        onClick={() => handleOpenEditPopup("last name")}>
                                    {userData?.last_name}
                                </button>
                            </div>
                        </span>
                    </div>
                </div>
                <div className="user-profile-section">
                    <h3>ESN details</h3>
                    <div className="user-profile-row">
                        <span className="fieldFont">ESNcard:</span>
                        <span>
                            <div className="user-info-btn">
                                <button type={"button"} className={"btn btn-secondary btn-sm d-inline"}
                                        onClick={() => handleOpenEditPopup("ESNcard code")}>
                                    {userData?.card_id?.code ? userData.card_id.code : "Add card"}
                                </button>
                            </div>
                        </span>
                    </div>
                    <div className="user-profile-row">
                    <span className="fieldFont">Following sections:</span>
                        <div className="user-info-btn">
                            <button type={"button"} className={"btn btn-secondary btn-sm"} onClick={handleOpenListPopup}>View</button>
                        </div>
                    </div>
                </div>

                {showEditPopup && (
                    <>
                        <div style={{minWidth: "500px"}} className="list-popup show">
                            <h2>Update {editField}</h2>
                            <hr/>

                            <input
                                type="text"
                                placeholder={editPlaceholder}
                                autoComplete="off"
                                value={newValue}
                                onChange={handleInputChange}  
                            />
                            
                            <div style={{maxWidth: "150px", margin: "auto"}}>
                                <div className="d-flex justify-content-between pt-2 pb-2">
                                    <button id="btnAdd" style={{width: "70px"}} onClick={handleEditElement}>Edit</button>
                                    <button id="btnClose" style={{width: "70px"}} onClick={handleCloseEditPopup}>Cancel</button>
                                </div>
                            </div>
                        </div>
                        <div className="list-popup-overlay"></div>
                    </>
                )}

                {showListPopup && (
                    <>
                        <div style={{minWidth: "500px"}} className="list-popup show">
                            <h2>Sections you follow</h2>
                            <hr/>
                            {followingSections.length === 0 ? (
                                <p>You do not follow any section. Click <b>Add</b> to find them.</p>
                            ) : (
                                // <ul>
                                //     {followingSections.map((element) => (
                                //         <li key={element}>{element}</li>
                                //     ))}
                                // </ul>
                                <table>
                                    <tbody>
                                        {followingSections.map((element, index) => (
                                            <tr key={index}>
                                                <td>
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedRows.includes(index)}
                                                        onChange={(e) => handleSelectRow(e.target.checked, index)}
                                                    />
                                                    {element}
                                                </td>
                                            </tr>
                                        ))}
                                        <tr>
                                            <td id="tdUnfollow" style={{ textAlign: 'right' }}>
                                                <a onClick={() => handleDeleteRow()}>
                                                    <Icon.Trash2 style={{width: "15px"}}/>
                                                    Unfollow
                                                </a>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            )}
                            {openAddOptions && (
                                <div className="list-popup-actions d-flex flex-column justify-content-center align-items-center">
                                    <br/>
                                    <span>Please select section's country:</span>
                                    <select onChange={(e) => handleSelectA(e.target.value)}>
                                        <option value={null}>Select section's country</option>
                                        {countryNames.map((countryName, index) => (
                                            <option key={index}>{countryName}</option>
                                        ))}
                                    </select>
                                    {selectedCountry && (
                                        <>
                                            <span>Please select section from the list:</span>
                                            <select onChange={(e) => handleSelectSection(e.target.value)}>
                                                <option value="">Select from List B</option>
                                                {filteredSections.map((countryName, index) => (
                                                    <option key={index}>{countryName}</option>
                                                ))}
                                            </select>
                                            {selectedSection && (
                                                <div className="user-profile-row">
                                                    <span>Selected:</span>
                                                    <span>{selectedSection}</span>
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>
                            )}
                            <br/>                            
                            <div style={{maxWidth: "150px", margin: "auto"}}>
                                <div className="d-flex justify-content-between pt-2 pb-2">
                                    <button id="btnAdd" style={{width: "70px"}} onClick={handleAddElement}>Add</button>
                                    <button id="btnClose" style={{width: "70px"}} onClick={handleCloseListPopup}>Close</button>
                                </div>
                            </div>
                        </div>
                        <div className="list-popup-overlay"></div>
                    </>
                )}
            </div>
        </div>
    );
}

export default UserProfile;