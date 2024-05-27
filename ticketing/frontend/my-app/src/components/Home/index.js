import React, {useContext, useEffect, useState} from "react";
import {Badge} from "react-bootstrap";
import axios from "../../api/axios";
import testImage from "../../images/photo_2022-04-29_21-36-13.jpg"
import Trip from "../../images/1.png"
import Social from "../../images/2.png"
import Sport from "../../images/3.png"
import Education from "../../images/4.png"
import * as Icon from 'react-feather';
import "./home.css";
import {Modal} from 'react-bootstrap';
import SearchBar from "../../mini-components/SearchBar";
import moment from 'moment';
import LoginContext from "../../context/LoginContext";


// remove later !!
import db from '../database/db.json';

function HomePage() {

    //const {user} = useContext(LoginContext);

    const user = JSON.parse(sessionStorage.getItem('user'))
    const isSectionUser = user.role === 'section'; // Check if the user's role is "section"

    const [events, setEvents] = useState([])
    const [eventsShow, setEventsShow] = useState([])
    const [selected, setSelected] = useState()
    const [showModal, setShowModal] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const [keyword, setKeyword] = useState('');

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [locationUrl, setLocationUrl] = useState('');
    const [capacity, setCapacity] = useState(0.0);
    const [price, setPrice] = useState(0.0);
    const [date, setDate] = useState('');
    const [publishDate, setPublishDate] = useState('');
    const [time, setTime] = useState('');
    const [eventDateTime, setEventDateTime] = useState();
    const [esnPrice, setEsnPrice] = useState(0.0);
    const [type, setType] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [newEvent, setNewEvent] = useState();

    useEffect(() => {
        loadEvents()
            .then(response => console.log(response))
            .catch(error => console.log(error));
    }, [submitted])

    function formatDate(date) {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
        const year = date.getFullYear();

        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');

        return `${day}.${month}.${year} ${hours}:${minutes}`;
    }

    function formatDateForInput(date) {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');

        return `${year}-${month}-${day}T${hours}:${minutes}`;
    }

    const handleToggleModal = () => {
        setName('')
        setDescription('')
        setPrice('')
        setEsnPrice('')
        setEsnPrice('')
        setLocation('')
        setLocationUrl('')
        setType('')
        setDate('')
        setPublishDate('')
        setCapacity('')
        setShowModal(!showModal);
    };

    const handleToggleModal2 = () => {
        setName(selected?.name ?? '')
        setDescription(selected?.description ?? '')
        setLocation(selected?.location ?? '')
        setLocationUrl(selected?.location_url ?? '')
        setCapacity(selected?.capacity ?? '')
        setType(selected?.type ?? '')
        setPrice(selected?.price ?? '')
        setEsnPrice(selected?.esn_price ?? '')
        setDate(selected?.event_date ?? '')
        setPublishDate(selected?.publish_date ?? '')
        setShowModal2(!showModal2);
    };

    const loadEvents = async () => {

        const result = isSectionUser ?
            await axios.get(`/api/sections/${user?.id}/events/`) :
            await axios.get(`/api/users/${user?.id}/events/`);

        //const result = await axios.get("/api/events")
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
        e.preventDefault();

        const newEvent = {
            section: user.id,
            name: name,
            description: description,
            price: price,
            esn_price: esnPrice,
            location: location,
            location_url: locationUrl,
            type: type,
            event_date: formatDate(new Date(date)),
            publish_date: formatDate(new Date(publishDate)),
            capacity: capacity,
        };

        // UNCOMMENT !!!!
        axios.post('/api/events/', newEvent)
            .then(response => {
                console.log(response)
                setSubmitted(true);
                setShowModal(false);
            })
            .catch(error => {
                console.log(error)
                setSubmitted(false);
                setShowModal(true);
            });

    }

    function onSubmitEdit(e) {
        e.preventDefault();

        const newEvent = {
            section: user.id,
            name: name ?? null,
            description: description ?? null,
            price: price ?? null,
            esn_price: esnPrice ?? null,
            location: location ?? null,
            location_url: locationUrl ?? null,
            type: type,
            event_date: formatDate(new Date(date)) ?? null,
            publish_date: formatDate(new Date(publishDate)) ?? null,
            capacity: capacity,
        };

        console.log(newEvent)

        // UNCOMMENT !!!!
        axios.put(`/api/events/${selected?.id}/`, newEvent)
            .then(response => {
                console.log(response)
                setSubmitted(true);
                setShowModal2(false);
            })
            .catch(error => console.log(error));

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

    function onDateChange(event) {
        setDate(event.target.value)
    }

    function onPublishDateChange(event) {
        setPublishDate(event.target.value)
    }

    const handleRegisterToEvent = async (e) => {
        e.preventDefault();

        console.log("User id ", user.id, " + event id: ", selected?.id, " + Date: ", new Date())

        await axios.post(`/api/tickets/${user.id}/${selected?.id}`, new Date())
            .then(response => {
                console.log(response);
            })
            .catch(error => console.log(error));

    }

    const deleteEvent = async (e) => {
        e.preventDefault()
        await axios.delete(`/api/events/${selected?.id}/delete/`)
            .then(response => {
                console.log(response)
                var updatedEvents = events.filter(item => item.id !== selected?.id);
                setEvents(updatedEvents)
                setEventsShow(updatedEvents)
            })
            .catch(error => console.log(error));
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
                            <SearchBar keyword={keyword} onChange={updateKeyword}/>
                        </div>
                        <div className="col-lg-6 col-12 pt-2 text-center ms-auto">
                            <div className=""> {/*card*/}
                                <div className="intro"> {/*card-body*/}
                                    {/*Hello <b>{user?.username}</b>!*/}
                                    {!isSectionUser ? (
                                        <>
                                            Hello <b>{user?.first_name}</b>!
                                            <span> Discover our events! Browse, register, and enjoy! </span>
                                        </>
                                    ) : (
                                        <>
                                            Hello <b>{user?.name}</b>!
                                            <span> Go on and create your next amazing event!</span>
                                        </>
                                    )
                                    }
                                </div>
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
                                    <tr key={event.id} className={selected === event ? 'selected' : ''}
                                        onClick={() => setSelected(event)}>
                                        <td>{event.name}</td>
                                        <td>{event.location}</td>
                                        <td scope="row">{formatDate(new Date(event.event_date))}</td>
                                        <td scope="row">{formatDate(new Date(event.publish_date))}</td>
                                        <td>{event.price}</td>
                                        <td>{event.esn_price}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                            {isSectionUser ? (
                                <div className="bottom-bar position-sticky fixed-bottom" onClick={handleToggleModal}>
                                    <h6 className="mt-2"><Icon.PlusSquare/> New event</h6>
                                </div>
                            ) : (
                                <div></div>
                            )}

                        </div>
                        <div className="col-lg-6 col-12 p-2 card ms-auto scrollable-div">


                            {
                                selected?.id ?
                                    <div>
                                        {selected.type === 'Trip' ?
                                            <img src={Trip} height={250}
                                                 style={{objectFit: 'cover', objectPosition: 'top'}}
                                                 className="card-img-top" alt="..."/> :
                                            selected.type === 'Social' ?
                                                <img src={Social} height={250}
                                                     style={{objectFit: 'cover', objectPosition: 'top'}}
                                                     className="card-img-top" alt="..."/> :
                                                selected.type === 'Sport' ?
                                                    <img src={Sport} height={250}
                                                         style={{objectFit: 'cover', objectPosition: 'top'}}
                                                         className="card-img-top" alt="..."/> :
                                                    <img src={Education} height={250}
                                                         style={{objectFit: 'cover', objectPosition: 'top'}}
                                                         className="card-img-top" alt="..."/>

                                        }
                                        <div className="card-body">
                                            <h5 className="card-title">
                                                <p>{selected.name}</p>
                                            </h5>
                                            <p className="card-text">{selected.description}</p>
                                            <div className="d-inline-flex">
                                                <span className="me-3">
                                                    <a href={selected?.location_url ?? '#'} style={{
                                                    color: 'black',
                                                    textDecoration: 'none'
                                                }}><Icon.MapPin/> {selected.location}</a>
                                                </span>
                                                {/*             <span
                                                    className="me-3"><Icon.Calendar/> {new Date(selected.eventDateTime).toLocaleDateString()}</span>
                                                <span className="me-3"><Icon.Clock/> {selected.eventDateTime}</span>
                                                <span
                                                    className="me-3"><Icon.Clock/> {new Date(selected.eventDateTime).toISOString().split('T')[1].slice(0, 5)}</span>*/}
                                                <span>
                                                  {/*<Icon.UserCheck/> {selected ? capacity + selected?.tickets.length + "/" + selected.capacity : ""}*/}
                                                </span>

                                            </div>
                                            {/*STUDENT
                                            <div className="d-inline-flex my-4">
                                                <button type="button" className="btn btn-primary me-3">Register</button>
                                                <button type="button" className="btn btn-primary me-3">Use Ticket</button>
                                                <button type="button" className="btn btn-primary">Rate Event</button>
                                            </div>*/}
                                            <br/>
                                            {isSectionUser ? null : (
                                                <div className="d-inline-flex my-4">
                                                    {selected.section.name}
                                                </div>
                                            )}
                                            <br/>
                                            {/*SECTION*/}
                                            {isSectionUser ? (
                                                <div className="d-inline-flex my-4">
                                                    <button type="button" className="btn btn-primary me-3">Scan</button>
                                                    <button type="button" className="btn btn-primary me-3">Attendees
                                                    </button>
                                                    <button type="button" className="btn btn-primary me-3"
                                                            onClick={handleToggleModal2}>Edit
                                                    </button>
                                                    <button type="button" className="btn btn-primary"
                                                            onClick={deleteEvent}>Delete
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="d-inline-flex my-4">
                                                    <button type="button" className="btn btn-primary me-3"
                                                            onClick={handleRegisterToEvent}>Register
                                                    </button>
                                                </div>
                                            )}

                                            {/*<p className="card-text"><small className="text-muted">Last updated 3 mins*/}
                                            {/*    ago</small></p>*/}
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
                                <input type="text" className="form-control" id="name" required
                                       placeholder="e.g. Erasmus in Schools" onChange={onNameChange} value={name}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="description" className="form-label">Description</label>
                                <textarea className="form-control" id="description" rows="3" required
                                          placeholder="e.g. During the Erasmus in Schools event, students will have the opportunity to interact with international students and teachers."
                                          onChange={onDescriptionChange} value={description}/>
                            </div>

                            <div className="row">
                                <div className="mb-3 col-6">
                                    <label htmlFor="location" className="form-label">Location</label>
                                    <input type="text" className="form-control" id="location" required
                                           placeholder="e.g. OS Koper" onChange={onLocationChange} value={location}/>
                                </div>
                                <div className="mb-3 col-6">
                                    <label htmlFor="capacity" className="form-label">Capacity</label>
                                    <input type="number" className="form-control" id="capacity" placeholder="e.g. 10"
                                           required
                                           onChange={onCapacityChange} value={capacity}/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="mb-3 col-6">
                                    <label htmlFor="locationUrl" className="form-label">Location URL</label>
                                    <input type="url" className="form-control" id="locationUrl"
                                           placeholder="e.g. https://maps.google.com/..." onChange={onLocationUrlChange}
                                           value={locationUrl}/>
                                </div>
                                <div className="mb-3 col-6">
                                    <label htmlFor="type" className="form-label">Type</label>
                                    <select required className="form-select" id="type" aria-label="Type"
                                            onChange={onTypeChange}
                                            value={type}>
                                        <option value="">--Please choose an option--</option>
                                        <option value="Education">Education</option>
                                        <option value="Social">Social</option>
                                        <option value="Sport">Sport</option>
                                        <option value="Trip">Trip</option>
                                    </select>
                                </div>
                            </div>
                            <div className="row">
                                <div className="mb-3 col-6">
                                    <label htmlFor="price" className="form-label">Price</label>
                                    <input type="number" className="form-control" id="price" placeholder="0.0" required
                                           onChange={onPriceChange} value={price}/>
                                </div>
                                <div className="mb-3 col-6">
                                    <label htmlFor="esnprice" className="form-label">ESN Price</label>
                                    <input type="number" className="form-control" id="esnprice" placeholder="0.0"
                                           required
                                           onChange={onEsnPriceChange} value={esnPrice}/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="mb-3 col-6">
                                    <label htmlFor="date" className="form-label">Date</label>
                                    <input type="datetime-local" className="form-control" id="date" required
                                           onChange={onDateChange}
                                           value={date}/>
                                </div>
                                <div className="mb-3 col-6">
                                    <label htmlFor="publishDate" className="form-label">Publish Date</label>
                                    <input type="datetime-local" className="form-control" id="publishDate" required
                                           onChange={onPublishDateChange}
                                           value={publishDate}/>
                                </div>
                            </div>

                        </Modal.Body>
                        <Modal.Footer>
                            {/*<button type="button" className="btn btn-secondary" onClick={handleToggleModal}>Close</button>*/}
                            <button type="submit" className="btn btn-primary">Create</button>
                        </Modal.Footer>
                    </form>
                </Modal>

                {/* EDIT MODAL */}

                <Modal show={showModal2} onHide={handleToggleModal2}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Event</Modal.Title>
                    </Modal.Header>
                    <form onSubmit={onSubmitEdit}>
                        <Modal.Body>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Name</label>
                                <input type="text" className="form-control" id="name" placeholder={selected?.name}
                                       onChange={onNameChange} value={name}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="description" className="form-label">Description</label>
                                <textarea className="form-control" id="description" rows="3"
                                          placeholder={selected?.description} onChange={onDescriptionChange}
                                          value={description}/>
                            </div>

                            <div className="row">
                                <div className="mb-3 col-6">
                                    <label htmlFor="location" className="form-label">Location</label>
                                    <input type="text" className="form-control" id="location"
                                           placeholder={selected?.location} onChange={onLocationChange}
                                           value={location}/>
                                </div>
                                <div className="mb-3 col-6">
                                    <label htmlFor="capacity" className="form-label">Capacity</label>
                                    <input type="number" className="form-control" id="capacity"
                                           onChange={onCapacityChange} value={capacity}/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="mb-3 col-6">
                                    <label htmlFor="locationUrl" className="form-label">Location URL</label>
                                    <input type="url" className="form-control" id="locationUrl"
                                           placeholder={selected?.location_url} onChange={onLocationUrlChange}
                                           value={locationUrl}/>
                                </div>
                                <div className="mb-3 col-6">
                                    <label htmlFor="type" className="form-label">Type</label>
                                    <select className="form-select" id="type" aria-label="Type"
                                            onChange={onTypeChange}
                                            value={type}>
                                        <option value="">--Please choose an option--</option>
                                        <option value="Education">Education</option>
                                        <option value="Social">Social</option>
                                        <option value="Sport">Sport</option>
                                        <option value="Trip">Trip</option>
                                    </select>
                                </div>
                            </div>
                            <div className="row">
                                <div className="mb-3 col-6">
                                    <label htmlFor="price" className="form-label">Price</label>
                                    <input type="number" className="form-control" id="price" onChange={onPriceChange}
                                           value={price}/>
                                </div>
                                <div className="mb-3 col-6">
                                    <label htmlFor="esnprice" className="form-label">ESN Price</label>
                                    <input type="number" className="form-control" id="esnprice"
                                           onChange={onEsnPriceChange} value={esnPrice}/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="mb-3 col-6">
                                    <label htmlFor="date" className="form-label">Date</label>
                                    <input type="datetime-local" className="form-control" id="date"
                                           onChange={onDateChange}
                                           value={formatDateForInput(new Date(selected?.event_date))}/>
                                </div>
                                <div className="mb-3 col-6">
                                    <label htmlFor="publish_date" className="form-label">Publish Date</label>
                                    <input type="datetime-local" className="form-control" id="publish_date"
                                           onChange={onDateChange}
                                           value={formatDateForInput(new Date(selected?.publish_date))}/>
                                </div>
                            </div>

                        </Modal.Body>
                        <Modal.Footer>
                            {/*<button type="button" className="btn btn-secondary" onClick={handleToggleModal}>Close</button>*/}
                            <button type="submit" className="btn btn-primary">Save</button>
                        </Modal.Footer>
                    </form>
                </Modal>

            </div>


        </div>
    )
}

export default HomePage;