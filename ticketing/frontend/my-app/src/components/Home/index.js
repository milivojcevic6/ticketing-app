import React, {useEffect, useState} from "react";
import {Badge} from "react-bootstrap";
import axios from "../../api/axios";
import testImage from "../../images/photo_2022-04-29_21-36-13.jpg"
import Trip from "../../images/1.png"
import Social from "../../images/2.png"
import Sport from "../../images/3.png"
import Education from "../../images/4.png"
import * as Icon from 'react-feather';
import "./home.css";
import { Modal } from 'react-bootstrap';
import SearchBar from "../../mini-components/SearchBar";

function HomePage() {

    const [events, setEvents] = useState([])
    const [eventsShow, setEventsShow] = useState([])
    const [selected, setSelected] = useState()
    const [showModal, setShowModal] = useState(false);
    const [keyword, setKeyword] = useState('');

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [locationUrl, setLocationUrl] = useState('');
    const [capacity, setCapacity] = useState(0.0);
    const [price, setPrice] = useState(0.0);
    const [esnPrice, setEsnPrice] = useState(0.0);
    const [type, setType] = useState('');
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        loadEvents()
            .then(response => console.log(response))
            .catch(error => console.log(error));
    }, [submitted])

    const handleToggleModal = () => {
        setShowModal(!showModal);
    };

    const loadEvents = async () => {
        const result = await axios.get("/api/events")
        console.log(result);
        setEvents(result.data)
        setEventsShow(result.data);
        setSelected(result.data[0])
        console.log(selected)
    }

    const updateKeyword = (keyword) => {
        if (keyword.trim() === '') {
            // If the keyword is empty, reset the filtered events and keyword state
            setKeyword('');
            setEventsShow(events);
        } else {
            const filtered = events.filter(event => {
                return `${event.name.toLowerCase()}`.includes(keyword.toLowerCase());
            });
            setKeyword(keyword);
            setEventsShow(filtered);
        }
    };


    /*const updateKeyword = (keyword) => {
        const filtered = events.filter(event => {
            return `${event.name.toLowerCase()}`.includes(keyword.toLowerCase());
        })
        setKeyword(keyword);
        setEventsShow(filtered);
    }


    
        const{name, description, type, capacity, location, locationUrl, price, esnprice}=newEvent
    const onInputChange = (e) => {
        setNewEvent({...newEvent, [e.target.name]: e.target.value})
    }
    
    const onSubmit = async (e) => {
        console.log(name, description, type, capacity, location, locationUrl,  price, esnPrice)
        e.preventDefault();
        await axios.post("http://localhost:8080/api/events", newEvent);
    }*/

    function onSubmit(e) {
        console.log(name, description, type, capacity, location, locationUrl,  price, esnPrice)
        e.preventDefault();
        const newEvent = {
            name: name,
            description: description,
            type: type,
            capacity: capacity,
            location: location,
            locationUrl: locationUrl,
            price: price,
            esnprice: esnPrice
        };
        console.log(name, description, type, capacity, location, locationUrl,  price, esnPrice)

        axios.post('/api/events', newEvent)
            .then(response => console.log(response))
            .catch(error => console.log(error));
        setSubmitted(true);
        setShowModal(false);
    }

    function onNameChange(event) {
        setName(event.target.value)
    }

    function onDescriptionChange(event) {
        setDescription(event.target.value)
    }

    function onLocationChange(event) {
        setLocation(event.target.value)
    }

    function onCapacityChange(event) {
        setCapacity(event.target.value)
    }

    function onLocationUrlChange(event) {
        setLocationUrl(event.target.value)
    }

    function onTypeChange(event) {
        setType(event.target.value)
    }

    function onPriceChange(event) {
        setPrice(event.target.value)
    }

    function onEsnPriceChange(event) {
        setEsnPrice(event.target.value)
    }

    return (

        <div>
            <div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-5 col-12 px-0">
                            {/*<form className="d-flex">
                                <input className="form-control me-2" type="search" placeholder="Search"
                                       aria-label="Search"/>
                                <button className="btn btn-outline-success" type="submit"><Icon.Search/></button>
                            </form>*/}
                            <SearchBar  keyword={keyword} onChange={updateKeyword}/>
                        </div>
                        <div className="col-lg-6 col-12 pt-2 text-center ms-auto">
                            <div className=""> {/*card*/}
                                <div className="intro"> {/*card-body*/}
                                    Discover our events! Browse, register, and enjoy!                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row py-4">
                        <div className="col-lg-5 col-12 card p-2 mb-lg-0 mb-4 scrollable-div-mobile">
                            <table className="table table-hover text-start">
                                <thead>
                                <tr>
                                    <th scope="col">Event Name</th>
                                    <th scope="col">Event Location</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">ESN price</th>
                                </tr>
                                </thead>
                                <tbody>

                                {eventsShow.map((event) => (
                                    <tr key={event.id} className={selected === event ? 'selected' : ''} onClick={() => setSelected(event)} >
                                        <td >{event.name}</td>
                                        <td>{event.location}</td>
                                        <td scope="row">01.01</td>
                                        <td>{event.price}</td>
                                        <td>{event.esnprice}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                            <div className="bottom-bar position-sticky fixed-bottom" onClick={handleToggleModal} >
                                <h6 className="mt-2"> <Icon.PlusSquare/> New event</h6>
                            </div>
                        </div>
                        <div className="col-lg-6 col-12 p-2 card ms-auto scrollable-div">


                            {
                                selected?.id ?
                                    <div>
                                        {selected.type==='Trip' ?
                                            <img src={Trip} height={250} style={{ objectFit: 'cover', objectPosition: 'top' }} className="card-img-top" alt="..."/> :
                                            selected.type==='Social' ?
                                                <img src={Social} height={250} style={{ objectFit: 'cover', objectPosition: 'top' }} className="card-img-top" alt="..."/> :
                                                selected.type==='Sport' ?
                                                    <img src={Sport} height={250} style={{ objectFit: 'cover', objectPosition: 'top' }} className="card-img-top" alt="..."/> :
                                                    <img src={Education} height={250} style={{ objectFit: 'cover', objectPosition: 'top' }} className="card-img-top" alt="..."/>

                                        }
                                        <div className="card-body">
                                            <h5 className="card-title">
                                                <p>{selected.name}</p>
                                            </h5>
                                            <p className="card-text">{selected.description}</p>
                                            <div className="d-inline-flex">
                                                <span className="me-3"><Icon.MapPin/> {selected.location}</span>
                                                <span className="me-3"><Icon.Clock/> Implement time</span>
                                                <span><Icon.UserCheck/> Implement #registered</span>
                                            </div>
                                            {/*STUDENT
                                            <div className="d-inline-flex my-4">
                                                <button type="button" className="btn btn-primary me-3">Register</button>
                                                <button type="button" className="btn btn-primary me-3">Use Ticket</button>
                                                <button type="button" className="btn btn-primary">Rate Event</button>
                                            </div>*/}
                                            <br/>
                                            {/*SECTION*/}
                                            <div className="d-inline-flex my-4">
                                                <button type="button" className="btn btn-primary me-3">Issue Ticket</button>
                                                <button type="button" className="btn btn-primary me-3">Scan</button>
                                                <button type="button" className="btn btn-primary me-3">Attendees</button>
                                                <button type="button" className="btn btn-primary">Archive </button>
                                            </div>
                                            <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                                        </div>
                                    </div>
                                    :
                                    <p>No event loaded</p>
                            }


                        </div>
                    </div>
                </div>



                {/*MODALS*/}

                <Modal show={showModal} onHide={handleToggleModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>New Event</Modal.Title>
                    </Modal.Header>
                    <form onSubmit={onSubmit}>
                        <Modal.Body>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Name</label>
                                <input type="text" className="form-control" id="name" placeholder="e.g. Erasmus in Schools" onChange={onNameChange} value={name} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="description" className="form-label">Description</label>
                                <textarea className="form-control" id="description" rows="3"
                                          placeholder="e.g. During the Erasmus in Schools event, students will have the opportunity to interact with international students and teachers." onChange={onDescriptionChange} value={description} />
                            </div>

                            <div className="row">
                                <div className="mb-3 col-6">
                                    <label htmlFor="location" className="form-label">Location</label>
                                    <input type="text" className="form-control" id="location" placeholder="e.g. OS Koper" onChange={onLocationChange} value={location} />
                                </div>
                                <div className="mb-3 col-6">
                                    <label htmlFor="capacity" className="form-label">Capacity</label>
                                    <input type="number" className="form-control" id="capacity" placeholder="e.g. 10" onChange={onCapacityChange} value={capacity} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="mb-3 col-6">
                                    <label htmlFor="locationUrl" className="form-label">Location URL</label>
                                    <input type="url" className="form-control" id="locationUrl"
                                           placeholder="e.g. https://maps.google.com/..."  onChange={onLocationUrlChange} value={locationUrl}/>
                                </div>
                                <div className="mb-3 col-6">
                                    <label htmlFor="type" className="form-label">Type</label>
                                    <select className="form-select" id="type" aria-label="Type" onChange={onTypeChange} value={type} >
                                        <option value="">--Please choose an option--</option>
                                        <option value="Education">Education</option>
                                        <option value="Social">Social</option>
                                        <option value="Sport">Sport</option>
                                        <option value="Trip">Trip</option>
                                    </select>
                                </div>
                            </div>
                            <div  className="row">
                                <div className="mb-3 col-6">
                                    <label htmlFor="price" className="form-label">Price</label>
                                    <input type="number" className="form-control" id="price" placeholder="0.0" onChange={onPriceChange} value={price}/>
                                </div>
                                <div className="mb-3 col-6">
                                    <label htmlFor="esnprice" className="form-label">ESN Price</label>
                                    <input type="number" className="form-control" id="esnprice" placeholder="0.0" onChange={onEsnPriceChange} value={esnPrice}/>
                                </div>
                            </div>

                        </Modal.Body>
                        <Modal.Footer>
                            {/*<button type="button" className="btn btn-secondary" onClick={handleToggleModal}>Close</button>*/}
                            <button type="submit" className="btn btn-primary">Create</button>
                        </Modal.Footer>
                    </form>
                </Modal>

            </div>


        </div>
    )
}

export default HomePage;