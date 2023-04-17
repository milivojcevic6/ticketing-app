import React, {Component} from 'react';
import {handleLogError} from "../Helpers";
import AuthContext from "../Context/AuthContext";
import {isValidIBAN} from "ibantools";

export class Register extends Component {

    static contextType = AuthContext

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            name: '',
            email: '',
            street: '',
            streetNumber: '',
            city: '',
            cityCode: '',
            iban: '',
            isError: false,
            errorMessage: ''
        }

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault()

        const {username, password, name, email, street, streetNumber, city, cityCode, iban} = this.state


        if (!(username && password && name && email && street && streetNumber && city && cityCode && iban)) {
            this.setState({
                isError: true,
                errorMessage: 'Please, inform all fields!'
            })
            return
        }

        if (!isValidIBAN(iban.replace(/\s+/g, ''))) {
            this.setState({
                isError: true,
                errorMessage: "Iban is invalid"
            })
            return;
        }

        const user = {username, password, name, email, street, streetNumber, city, cityCode, iban}

        const options = {
            headers: {'Content-type': 'application/json'},
            method: 'POST',
            body: JSON.stringify(user),
        };
        fetch('/auth/signup', options)
            .then((response) => response.json()).then((data) => {
            window.location.href = '/login'
        })
            .catch(error => {
                handleLogError(error)
                if (error.response && error.response.data) {
                    const errorData = error.response.data
                    let errorMessage = 'Invalid fields'
                    if (errorData.status === 409) {
                        errorMessage = errorData.message
                    } else if (errorData.status === 400) {
                        errorMessage = errorData.errors[0].defaultMessage
                    }
                    this.setState({
                        isError: true,
                        errorMessage
                    })
                }
            })
    }

    render() {
        const {isLoggedIn, isError, errorMessage} = this.state
        return (
            <>
                <header className="bg-dark py-2">
                    <div className="container px-4 px-lg-5 my-5">
                        <div className="text-center text-white">
                            <h3 className="display-6 fw-bolder">Register</h3>
                        </div>
                    </div>
                </header>
                <div className="container p-5 col-md-7 col-md-4">
                    <form onSubmit={this.handleSubmit}>
                        <div className={"row"}>
                            <div className="col mb-3">
                                <label>Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Name"
                                    name="name"
                                    value={this.state.name}
                                    onChange={this.handleInputChange}
                                />
                            </div>
                            <div className="col mb-3">
                                <label>Username</label>
                                <input type="text" className="form-control" placeholder="Username" name="username"
                                       onChange={this.handleInputChange}
                                       value={this.state.username}
                                />
                            </div>
                        </div>
                        <div className={"row"}>
                            <div className="col mb-3">
                                <label>Email address</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Enter email"
                                    name="email"
                                    onChange={this.handleInputChange}
                                    value={this.state.email}
                                />
                            </div>
                            <div className="col mb-3">
                                <label>Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Enter password"
                                    name="password"
                                    onChange={this.handleInputChange}
                                    value={this.state.password}
                                />
                            </div>
                        </div>
                        <div className={"row"}>
                            <div className="col mb-3">
                                <label>Street</label>
                                <input type="text" className="form-control" placeholder="Street" name="street"
                                       onChange={this.handleInputChange}
                                       value={this.state.street}
                                />
                            </div>
                            <div className="col mb-3">
                                <label>Street Number</label>
                                <input type="text" className="form-control" placeholder="Street Number"
                                       name="streetNumber"
                                       onChange={this.handleInputChange}
                                       value={this.state.streetNumber}
                                />
                            </div>
                        </div>
                        <div className={"row"}>
                            <div className="col mb-3">
                                <label>City</label>
                                <input type="text" className="form-control" placeholder="City" name="city"
                                       onChange={this.handleInputChange}
                                       value={this.state.city}
                                />
                            </div>
                            <div className="col mb-3">
                                <label>City Code</label>
                                <input type="text" className="form-control" placeholder="City Code" name="cityCode"
                                       onChange={this.handleInputChange}
                                       value={this.state.cityCode}
                                />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label>IBAN</label>
                            <input type="text" className="form-control" placeholder="IBAN Number" name="iban"
                                   onChange={this.handleInputChange}
                                   value={this.state.iban}
                                   onKeyUp={e => {
                                       let val = e.target.value;
                                       const len = val.length;
                                       const key = e.key;

                                       if (key === "Backspace")
                                           if (len === 5 || len === 10 || len === 15 || len === 20 || len === 25 || len === 30 || len === 35 || len === 40)
                                               e.target.value = val.slice(0, -1)
                                           else e.target.value = val
                                       else if (len === 4 || len === 9 || len === 14 || len === 19 || len === 24 || len === 29 || len === 34 || len === 39)
                                           e.target.value = (val + " ")
                                       else e.target.value = val
                                   }}
                            />
                        </div>
                        <div className="text-center">
                            <button type="submit" className="btn btn-primary">
                                Sign Up
                            </button>
                            <p className="mt-3">
                                Already registered <a href="/login"> login?</a>
                            </p>
                        </div>
                        {isError && <div>{errorMessage}</div>}
                    </form>
                </div>
            </>
        );
    }
}

export default Register;