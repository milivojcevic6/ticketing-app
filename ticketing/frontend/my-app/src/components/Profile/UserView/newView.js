import React from 'react';
import './new.css';

function UserProfile() {
    return (
        <div className="user-profile">
            <div className="user-profile-header">
                <h2>User Profile</h2>
                <div className="user-profile-actions">
                    <button>CANCEL</button>
                    <button>SAVE</button>
                </div>
            </div>
            <div className="user-profile-body">
                <div className="user-profile-section">
                    <h3>Basic Info</h3>
                    <div className="user-profile-row">
                        <span>Username:</span>
                        <span>Amelia Harper</span>
                    </div>
                    <div className="user-profile-row">
                        <span>Email:</span>
                        <span>amelia@harper.com</span>
                    </div>
                    <div className="user-profile-row">
                        <span>Password:</span>
                        <a href="#">Change password</a>
                    </div>
                </div>
                <div className="user-profile-section">
                    <h3>Contact</h3> {/* Assuming ESNcard code refers to contact information */}
                    <div className="user-profile-row">
                        <span>First Name:</span>
                        <span>Amelia</span>
                    </div>
                    <div className="user-profile-row">
                        <span>Last Name:</span>
                        <span>Harper</span>
                    </div>
                </div>
                <div className="user-profile-section">
                    <h3>ESN details</h3> {/* Assuming ESNcard code refers to contact information */}
                    <div className="user-profile-row">
                        <span>ESNcard:</span>
                        <span>1203415LNBC</span>
                    </div>
                    <div className="user-profile-row">
                        <span>Following sections:</span>
                        <a href="#">Open list</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserProfile;