import React, { useState, useEffect } from 'react';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
import { store } from 'react-notifications-component';

function EditEvent(props) {
    const [events, setEvents] = useState();
    const [description, setDescription] = useState();
    const [eventId, setEventId] = useState();
    const [startDateTime, setStartDateTime] = useState();
    const [endDateTime, setEndDateTime] = useState();
    const [amountOfOrders, setAmountOfOrders] = useState();
    const [index, setIndex] = useState(0);
    const [loading, setLoading] = useState(false);

    const handleEditClick = async () => {
        setLoading(true)
        var response = await fetch('/edit-event/' + eventId, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ event: { summary: description, start: startDateTime, end: endDateTime, amountOfOrders: amountOfOrders } })
        })
        getEvents()
        setLoading(false)
        response = await response.json();
        if (response.message === "Event edited succesfully.") {
            store.addNotification({
                title: "Event Modification",
                message: "Event Edited Succesfully.",
                type: "success",
                insert: "top",
                container: "top-center",
                dismiss: {
                    duration: 1500,
                }
            })
        } else {
            store.addNotification({
                title: "Error",
                message: "Error While Editing Event.",
                type: "danger",
                insert: "top",
                container: "top-center",
                dismiss: {
                    duration: 1500,
                }
            })
        }
    }

    const handleDeleteClick = async () => {
        setLoading(true)
        var response = await fetch('/delete-event/' + eventId, {
            method: 'DELETE',
        })
        getEvents()
        setLoading(false)
        response = await response.json();
        if (response.message === "Event deleted succesfully.") {
            store.addNotification({
                title: "Event Deletion",
                message: "Event Deleted Succesfully.",
                type: "success",
                insert: "top",
                container: "top-center",
                dismiss: {
                    duration: 1500,
                }
            })
        } else {
            store.addNotification({
                title: "Error",
                message: "Error While Deleting Event.",
                type: "danger",
                insert: "top",
                container: "top-center",
                dismiss: {
                    duration: 1500,
                }
            })
        }
        setIndex(0)
    }

    async function getEvents() {
        var response = await fetch('/get-events');
        var eventList = await response.json();
        await setEvents([...eventList]);
    }

    function setEventToEdit(index) {
        setIndex(index);
        setEventId(events[index]._id);
        setDescription(events[index].description);
        setStartDateTime(events[index].startTime);
        setEndDateTime(events[index].endTime);
        setAmountOfOrders(events[index].ordersPerFiveMinutes)
    }

    useEffect(() => {
        getEvents()
        props.updateList.setUpdateList(false)
    }, [props.updateList])

    useEffect(() => {
        if (events) {
            setEventToEdit(0)
        }
    }, [events])

    const handleEventToEditChange = (eventFromChange) => {
        setEventToEdit(eventFromChange.target.value)
    }
    return (
        <>
            <h1 class="subtitle is-5 is-spaced" style={{ marginTop: "1.5em" }}>Edit Existing Events</h1>
            {events && events.length !== 0 ?
                <>
                    <div class="field">
                        <label class="label">Select an Event to Edit</label>

                        <select value={index} onChange={(event) => handleEventToEditChange(event)}>
                            {events.map((event, index) =>
                                <option value={index}>{event.description}--{event.date}</option>
                            )}
                        </select>
                    </div>

                    <div class="field">
                        <label class="label">Description/Address</label>
                        <div class="control">
                            <input name='descEdit' value={description || ""} onChange={(event) => setDescription(event.target.value)} class="input" type="text" placeholder="Event Description" />
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Start Date and Time</label>
                        <div class="control">
                            <DateTimePicker
                                name='startEdit'
                                onChange={(value) => setStartDateTime(value)}
                                value={moment(startDateTime).toDate()}
                                disableClock={true} />
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">End Date and Time</label>
                        <div class="control">
                            <DateTimePicker
                                name='endEdit'
                                onChange={(value) => setEndDateTime(value)}
                                value={moment(endDateTime).toDate()}
                                disableClock={true} />
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Amount of Orders per 5 Minutes</label>
                        <div class="control">
                            <div class="select is-primary">
                                <select value={amountOfOrders} onChange={(event) => setAmountOfOrders(event.target.value)}>
                                    <option value={1}>1</option>
                                    <option value={2}>2</option>
                                    <option value={3}>3</option>
                                    <option value={4}>4</option>
                                    <option value={5}>5</option>
                                    <option value={6}>6</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="level is-mobile">
                        <div class="level-left">
                            <div class="level-item">
                                <div class="field">
                                    <div class="control">
                                        <button disabled={loading} class="button is-primary" onClick={handleEditClick}>Edit Event</button>
                                    </div>
                                </div>
                            </div>
                            <div class="level-item">
                                <div class="field">
                                    <div class="control">
                                        <button disabled={loading} class="button is-danger" onClick={handleDeleteClick}>Delete Event</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {loading ? <progress class="progress is-small is-primary" /> : null}
                </> : <div>No available events to edit.</div>}
        </>
    )
}

export default EditEvent;