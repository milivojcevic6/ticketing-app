import React, {useEffect, useState} from 'react';
import './new.css';
import countriesData from '../../database/countries.json';
import * as Icon from "react-feather";
import axios from "../../../api/axios";
import {type} from "@testing-library/user-event/dist/type";


function UserProfile() {

    const user = JSON.parse(sessionStorage.getItem('user'));

    const countryNames = countriesData.map(country => country.name);

    const [userData, setUserData] = useState(user);
    const [showEditPopup, setShowEditPopup] = useState(false);
    const [editField, setEditField] = useState('');
    const [editPlaceholder, setEditPlaceholder] = useState('First placeholder :)');
    const [newValue, setNewValue] = useState('');
    const [typeInput, setTypeInput] = useState('text');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [new2Password, setNew2Password] = useState('');
    const [popupErrorMessage, setPopupErrorMessage] = useState(null);
    const [showListPopup, setShowListPopup] = useState(false);
    const [showPasswordPopup, setShowPasswordPopup] = useState(false);
    const [openAddOptions, setOpenAddOptions] = useState(null); // Selected element from list A
    const [selectedCountry, setSelectedCountry] = useState(null); // Selected element from list A
    const [sectionList, setSectionList] = useState([]); // Selected element from list A
    const [selectedSection, setSelectedSection] = useState(null); // Selected element from list B
    const [followingSections, setFollowingSections] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const [alertSave, setAlertSave] = useState(false);
    const [alertCancel, setAlertCancel] = useState(false);
    const [warning, setWarning] = useState('All changes were discarded.');
    const [somethingChanged, setSomethingChanged] = useState(false);
    const [passwordChanged, setPasswordChanged] = useState(false);

    useEffect(() => {
        axios.get(`/api/users/${user.id}/sections/`)
            .then(response => {
                setFollowingSections(response.data);
            })
            .catch(error => {
                console.error("Error fetching sections:", error);
            });
    }, []);

    function handleOpenEditPopup(value) {

        setEditField(value);

        if (value === "first name") {
            setEditPlaceholder(userData.first_name);
            setNewValue("");
            setTypeInput("text")
        }
        if (value === "last name") {
            setEditPlaceholder(userData.last_name);
            setNewValue("");
            setTypeInput("text")
        }
        if (value === "email") {
            setEditPlaceholder(userData.email);
            setNewValue("");
            setTypeInput("email")
        }
        if (value === "username") {
            setEditPlaceholder(userData.username);
            setNewValue("");
            setTypeInput("text")
        }
        if (value === "ESNcard code") {
            setEditPlaceholder("Write your ESNcard code");
            setNewValue("");
            setTypeInput("text")
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

        if (editField === "first name" && newValue !== "") {
            userData.first_name = newValue;
            setSomethingChanged(true);
        }
        if (editField === "last name" && newValue !== "") {
            userData.last_name = newValue;
            setSomethingChanged(true);
        }
        if (editField === "email" && newValue !== "") {
            userData.email = newValue;
            setSomethingChanged(true);
        }
        if (editField === "username" && newValue !== "") {
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

    const handleAddElement = () => {
        if (!openAddOptions) {
            setOpenAddOptions(true)
        } else {
            const exists = followingSections.some(section => section.id === selectedSection.id);

            if (!exists) {
                // If it doesn't exist, add it to the array
                setFollowingSections([...followingSections, selectedSection]);
                setSomethingChanged(true);
            }
        }
    };

    const handleSelectA = async (value) => {
        setSelectedCountry(value);
        setSelectedSection(null);

        setSectionList(await getSectionList(value))
    };


    const handleSelectSection = (value) => {
        console.log(value)
        let s = sectionList.find((section) => section.id === value)
        // console.log(s)
        setSelectedSection(s);
        console.log("Selected section:", s)
    };

    // const handleSelectSection = (event) => {
    //     const value = parseInt(event.target.value, 10); // Convert value to a number
    //     const selectedSection = sectionList.find((section) => section.id === value);
    //
    //     if (selectedSection) {
    //         setSelectedSection(selectedSection);
    //         console.log("Selected section:", selectedSection.name);
    //     } else {
    //         console.log("No matching section found");
    //     }
    // };

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

    function handleDeleteRow() {
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
        setSomethingChanged(true);

    }


    async function getSectionList(selectedCountry) {
        // Implement logic to fetch or filter elements B based on selectedA
        // Example: return ['Element B1', 'Element B2'];
        // console.log(selectedCountry);
        const countryCode = (countriesData.find(c => c.name === selectedCountry)).code;
        // console.log(countryCode);

        try {
            const response = await axios.get(`/api/sections/?country_code=${countryCode}`);
            console.log("Sections:", response);
            return response.data;
        } catch (error) {
            console.error("Error fetching sections:", error);
            return [];
        }
    }

    function handleOpenPasswordPopup() {
        setShowPasswordPopup(true);
    }

    function handleClosePasswordPopup() {
        setOldPassword('');
        setNewPassword('');
        setNew2Password('');
        setShowPasswordPopup(false);
    }

    function handlePasswordElement() {

        if (newPassword !== new2Password) {
            setPopupErrorMessage('Passwords do not match');
        } else {
            setShowPasswordPopup(false);
        }
    }

    function handleOldPasswordChange(event) {
        setNewValue(event.target.value);
    }

    function handleNewPasswordChange(event) {
        setNewValue(event.target.value);
    }

    function handleNew2PasswordChange(event) {
        setNewValue(event.target.value);
    }

    function handleCancel() {
        setUserData(user);
        setWarning('All changes were discarded.');
        setAlertCancel(true);
        setSomethingChanged(false);

        // After 5 seconds, set alert back to false
        setTimeout(() => {
            setAlertCancel(false);
        }, 5000); // 5000 milliseconds = 5 seconds
    }

    function handleSave() {

        if (somethingChanged) {


            const updatedUser = {
                id: userData.id,
                username: userData.username,
                first_name: userData.first_name,
                last_name: userData.last_name,
                email: userData.email,
                card_id: userData.card_id,
                sections: followingSections.map(item => item.id)
            };

            // userData.sections = followingSections;

            console.log(updatedUser);
            // return;
            // api update user
            axios.put('/api/users/', updatedUser)
                .then(response => {
                    // Handle the response
                    setPopupErrorMessage(null)
                    setAlertSave(true);
                    setSomethingChanged(false);
                    setPasswordChanged(false);
                    sessionStorage.setItem('user', JSON.stringify(userData));
                })
                .catch(error => {
                    const firstKey = Object.keys(error.response.data)[0];
                    const firstValue = error.response.data[firstKey];
                    if (firstValue) {
                        setWarning(firstValue);
                        setAlertCancel(true);
                        // setErrorMessage(firstValue)
                    } else {
                        setWarning("There is an error on updating your data!");
                        setAlertCancel(true);
                        // setErrorMessage("There is an error on updating section!")
                    }
                });

        }

        if (passwordChanged && oldPassword !== '' && newPassword !== '') {

            const updatedUser = {
                id: user.id,
                old_password: oldPassword,
                new_password: newPassword
            };

            axios.put('api/users/change-password/', updatedUser)
                .then(response => {
                    // Handle the response
                    // setPopupSuccess(true)
                    setPopupErrorMessage(null)
                    setAlertSave(true);
                    setSomethingChanged(false);
                    setPasswordChanged(false);
                })
                .catch(error => {
                    const firstKey = Object.keys(error.response.data)[0];
                    const firstValue = error.response.data[firstKey];
                    if (firstValue) {
                        setWarning(firstValue);
                        setAlertCancel(true);
                        // setPopupErrorMessage()
                    } else {
                        setWarning("There is an error on updating your data!");
                        setAlertCancel(true);
                        // setPopupErrorMessage("There is an error on updating section!")
                    }
                    // setPopupSuccess(false)
                });
        }


        setAlertSave(true);
        setSomethingChanged(false);
        setPasswordChanged(false);

        // After 5 seconds, set alert back to false
        setTimeout(() => {
            setAlertSave(false);
        }, 5000); // 5000 milliseconds = 5 seconds
    }


    return (

        <div className="user-profile">
            {alertCancel &&
                <div className="alert alert-warning" role="alert">
                    {warning}
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
                            style={{backgroundColor: somethingChanged || passwordChanged ? "red" : "lightgray"}}>
                        CANCEL
                    </button>
                    <button disabled={!somethingChanged}
                            onClick={handleSave}
                            style={{backgroundColor: somethingChanged || passwordChanged ? "green" : "lightgray"}}>
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
                                <button type={"button"} className={"btn btn-secondary btn-sm d-inline"}
                                        onClick={handleOpenPasswordPopup}>
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
                            <button type={"button"} className={"btn btn-secondary btn-sm"}
                                    onClick={handleOpenListPopup}>View
                            </button>
                        </div>
                    </div>
                </div>

                {showEditPopup && (
                    <form onSubmit={handleEditElement}>
                        <div style={{minWidth: "500px"}} className="list-popup show">
                            <h2>Update {editField}</h2>
                            <hr/>

                            <input
                                required
                                type={typeInput}
                                placeholder={editPlaceholder}
                                autoComplete="off"
                                value={newValue}
                                onChange={handleInputChange}
                            />

                            <div style={{maxWidth: "150px", margin: "auto"}}>
                                <div className="d-flex justify-content-between pt-2 pb-2">
                                    <button id="btnAdd" style={{width: "70px"}}>Edit</button>
                                    <button id="btnClose" style={{width: "70px"}}
                                            onClick={handleCloseEditPopup}>Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="list-popup-overlay"></div>
                    </form>
                )}

                {showPasswordPopup && (
                    <form onSubmit={handlePasswordElement}>
                        <div style={{minWidth: "500px"}} className="list-popup show">
                            <h2>Update password</h2>
                            <hr/>
                            {popupErrorMessage && (
                                <div className="alert alert-warning" role="alert">
                                    {popupErrorMessage}
                                </div>
                            )}

                            <span>Write old password:</span>
                            <input
                                required
                                type="password"
                                placeholder="Write old password"
                                autoComplete="off"
                                value={oldPassword}
                                onChange={handleOldPasswordChange}
                            />
                            <span>Write new password:</span>
                            <input
                                required
                                type="password"
                                placeholder="Write old password"
                                autoComplete="off"
                                value={newPassword}
                                onChange={handleNewPasswordChange}
                            />
                            <span>Confirm  new password:</span>
                            <input
                                required
                                type="password"
                                placeholder="Write old password"
                                autoComplete="off"
                                value={new2Password}
                                onChange={handleNew2PasswordChange}
                            />

                            <div style={{maxWidth: "150px", margin: "auto"}}>
                                <div className="d-flex justify-content-between pt-2 pb-2">
                                    <button id="btnAdd" style={{width: "70px"}}>Edit</button>
                                    <button id="btnClose" style={{width: "70px"}}
                                            onClick={handleClosePasswordPopup}>Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="list-popup-overlay"></div>
                    </form>
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
                                                {element.name}
                                            </td>
                                        </tr>
                                    ))}
                                    <tr>
                                        <td id="tdUnfollow" style={{textAlign: 'right'}}>
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
                                <div
                                    className="list-popup-actions d-flex flex-column justify-content-center align-items-center">
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
                                                <option value="">Select a section</option>
                                                {sectionList.map((section, index) => (
                                                    <option key={index} value={section.id}>{section.name}</option>
                                                ))}
                                            </select>
                                            {selectedSection && (
                                                <div className="user-profile-row">
                                                    <span>Selected:</span>
                                                    <span>{selectedSection.name}</span>
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
                                    <button id="btnClose" style={{width: "70px"}} onClick={handleCloseListPopup}>Close
                                    </button>
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