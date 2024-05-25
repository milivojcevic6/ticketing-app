import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Lottie from 'react-lottie';
import load_gif from '../../images/load_gif.json'
import "./eventStatistics.css";

// Import the TimeSeriesChart component
import TimeSeriesChart from '../PastEvents/TimeSeriesChart';


// remove later !!
import mockEvents from '../database/events.json';
import * as Icon from "react-feather";
import {AlignRight, ArrowRightCircle, ToggleRight} from "react-feather";

function EventStatistics() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('overview'); // State for active tab
    const [timePeriod, setTimePeriod] = useState('6months'); // Default time period
    const [timeFrame, setTimeFrame] = useState('6months'); // Default time frame

    
    //   UNCOMMENT LATER
    // useEffect(() => {
    //     axios.get('/api/events') // Change this URL to your actual API endpoint
    //         .then(response => {
    //             setEvents(response.data);
    //             setLoading(false);
    //         })
    //         .catch(error => {
    //             setError(error);
    //             setLoading(false);
    //         });
    // }, []);
    //
    // if (loading) {
    //     return <div>Loading...</div>;
    // }
    //
    // if (error) {
    //     return <div>Error loading events: {error.message}</div>;
    // }

    useEffect(() => {
        const fetchEvents = () => {
            try {
                // Simulate API call delay
                setTimeout(() => {
                    setEvents(mockEvents.mockEvents);
                    setLoading(false);
                    // console.log("Loaded:")
                    // console.log(events)
                }, 5000); // 1 second delay
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    const getTotalEvents = () => events.length;

    const getEventsByCategory = () => {
        return events.reduce((acc, event) => {
            acc[event.type] = (acc[event.type] || 0) + 1;
            return acc;
        }, {});
    };

    const getTotalSubscribers = () => 1124; // Replace with data


    const getTotalParticipants = () => {
        return events.reduce((total, event) => total + event.participated, 0);
    };
    
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: load_gif,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    }


    const getTopEventsByParticipation = () => {
        return events
            .map(event => ({
                ...event,
                participationRate: (event.participated / event.capacity) * 100
            }))
            .sort((a, b) => b.participationRate - a.participationRate)
            .slice(0, 3);
    };
    
    if (loading) {
        // return <div>Loading...</div>;
        return <div>
            <br/>
            <Lottie
                options = {defaultOptions}
                height = {200}
                width = {200}
            />
        </div>;
    }

    if (error) {
        return <div>Error loading events: {error.message}</div>;
    }

    const handleTotalEventsClick = () => {
        // Update time series graph based on total events
        // Implement this logic based on the selected time frame
    };

    const handleTotalSubscribersClick = () => {
        // Implement logic to update graph based on total subscribers
        // This functionality can be added similarly to handleTotalEventsClick
    };

    const handleTotalParticipantsClick = () => {
        // Implement logic to update graph based on total participants
        // This functionality can be added similarly to handleTotalEventsClick
    };
    

    function handleToggleMenu() {
        document.querySelector('.full-screen-menu').classList.toggle('active');
    }

    return (
        <div className="dashboard">
            <div className="top-bar">
                <span>Dashboard</span>
                <button className="menu-toggle" onClick={handleToggleMenu}><Icon.ArrowRightCircle/></button>
            </div>
            <div className="sidebar">
                <h2>Dashboard</h2>
                <ul>
                    <li className={activeTab === 'overview' ? 'active' : ''} onClick={() => setActiveTab('overview')}>Overview</li>
                    <li className={activeTab === 'past-events' ? 'active' : ''} onClick={() => setActiveTab('past-events')}>Past Events</li>
                    <li className={activeTab === 'all-events' ? 'active' : ''} onClick={() => setActiveTab('all-events')}>All Events</li>
                </ul>
            </div>
            <div className="full-screen-menu">
                <ul>
                    <li className={activeTab === 'overview' ? 'active' : ''}
                        onClick={function (){handleToggleMenu(); setActiveTab('overview')}}
                    >Overview</li>
                    <li className={activeTab === 'past-events' ? 'active' : ''}
                        onClick={function (){handleToggleMenu(); setActiveTab('past-events')}}
                    >Past Events</li>
                    <li className={activeTab === 'all-events' ? 'active' : ''}
                        onClick={function (){handleToggleMenu(); setActiveTab('all-events')}}
                    >All Events</li>
                </ul>
            </div>
            <div className="main-content">
                {activeTab === 'overview' && (
                    <div>
                        <div>
                            <h1>Overview</h1>
                            <br/>
                            <div className="overview-stats">
                                <div className="overview-statistic" onClick={handleTotalSubscribersClick}>
                                    <h2>{getTotalSubscribers()}</h2>
                                    <p>Total Subscribers</p>
                                </div>
                                <div className="overview-statistic" onClick={handleTotalEventsClick}>
                                    <h2>{getTotalEvents()}</h2>
                                    <p>Total Events</p>
                                </div>
                                <div className="overview-statistic" onClick={handleTotalParticipantsClick}>
                                    <h2>{getTotalParticipants()}</h2>
                                    <p>Total Participants</p>
                                </div>
                            </div>
                        </div>
                        <br/>
                    </div>
                )}
                {activeTab === 'past-events' && (
                    <div>
                        <div className="time-series">
                            <h3>Events Over Time</h3>
                            <div className="time-frame-filter">
                                <label>
                                    <input type="radio" value="1week" checked={timeFrame === '1week'} onChange={() => setTimeFrame('1week')} /> Last Week
                                </label>
                                <label>
                                    <input type="radio" value="1month" checked={timeFrame === '1month'} onChange={() => setTimeFrame('1month')} /> Last Month
                                </label>
                                <label>
                                    <input type="radio" value="6months" checked={timeFrame === '6months'} onChange={() => setTimeFrame('6months')} /> Last 6 Months
                                </label>
                                <label>
                                    <input type="radio" value="1year" checked={timeFrame === '1year'} onChange={() => setTimeFrame('1year')} /> Last Year
                                </label>
                            </div>
                            {/* Placeholder for time series chart */}
                            <TimeSeriesChart data={events} timeFrameFilter={timeFrame} />
                            <br/>
                            <div className="chart-placeholder">
                                Chart displaying number of events over {timePeriod} period
                            </div>
                        </div>
                    </div>
                )}
                {activeTab === 'all-events' && (
                    <div>
                        <h1>All Events</h1>
                        <div className="events-container">
                            {Array.isArray(events) && events.length > 0 ? (
                                events.map(event => (
                                    <div key={event.id} className="event-card">
                                        <h2>{event.name}</h2>
                                        <p>{event.description}</p>
                                        <p>Location: <a href={event.locationUrl} target="_blank" rel="noopener noreferrer">{event.location}</a></p>
                                        <p>Capacity: {event.capacity}</p>
                                        <p>Type: {event.type}</p>
                                        <p>Price: ${event.price}</p>
                                        <p>ESN Price: ${event.esnPrice}</p>
                                        <p>Date and Time: {new Date(event.dateTime).toLocaleString()}</p>
                                        <p>Participants: {event.participated}</p>
                                    </div>
                                ))
                            ) : (
                                <p>No events to display</p>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default EventStatistics;
