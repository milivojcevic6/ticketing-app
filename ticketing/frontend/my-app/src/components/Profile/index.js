import './profile.css';

function Profile(){
    return(
        <div className="profile-container">
            <h1 className="mb-5">User Profile</h1>
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="fullname">Full Name:</label>
                        <input type="text" className="form-control" id="fullname" name="fullname" placeholder="Milan Milivojcevic" disabled/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input type="email" className="form-control" id="email" name="email" placeholder="998miki@gmail.com" disabled/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="points">Collected Points:</label>
                        <input type="number" className="form-control" id="points" name="points" placeholder="0" disabled/>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="username">Username:</label>
                        <input type="text" className="form-control" id="username" name="username" placeholder="Enter your username" required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input type="password" className="form-control" id="password" name="password" placeholder="Enter your password" required/>
                    </div>
                    <div className="form-group center-btn">
                        <button type="submit" className="btn btn-primary">Save Changes</button>
                    </div>
                </div>
            </div>
            <br/>
            <br/>
            <br/>
        </div>
)}

export default Profile