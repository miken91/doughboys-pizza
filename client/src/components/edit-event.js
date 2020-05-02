import React, { useState, useEffect } from 'react';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
import { store } from 'react-notifications-component';

function EditEvent(props) {
    const [events, setEvents] = useState([]);
    const [description, setDescription] = useState();
    const [eventId, setEventId] = useState();
    const [startDateTime, setStartDateTime] = useState();
    const [endDateTime, setEndDateTime] = useState();
    const [index, setIndex] = useState(0);
    const [loading, setLoading] = useState(false);

    const handleClick = async () => {
        setLoading(true)
        var response = await fetch('/edit-event/' + eventId, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ event: { summary: description, start: startDateTime, end: endDateTime } })
        })
        getEvents()
        setLoading(false)
        response = await response.json();
        if (response.message === "Event edited succesfully.") {
            store.addNotification({
                title: "Event Modification",
                message: "Event Edited Succesfully",
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
                message: "Error While Editing Event",
                type: "danger",
                insert: "top",
                container: "top-center",
                dismiss: {
                    duration: 1500,
                }
            })
        }
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
    }

    useEffect(() => {
        getEvents()
        props.updateList.setUpdateList(false)
    }, [props.updateList.updateList])

    useEffect(() => {
        if (events.length !== 0) {
            setEventToEdit(index)
        }
    }, [events])

    const handleEventToEditChange = (eventFromChange) => {
        setEventToEdit(eventFromChange.target.value)
    }
    return (
        <>
            <h1 class="subtitle is-5 is-spaced" style={{ marginTop: "1.5em" }}>Edit Existing Events</h1>
            <div class="field">
                <label class="label">Select an Event to Edit</label>
                {events ?
                    <select onChange={(event) => handleEventToEditChange(event)}>
                        {events.map((event, index) =>
                            <option value={index}>{event.description}--{event.date}</option>
                        )}
                    </select> : <div>Retrieving events</div>}
            </div>

            <div class="field">
                <label class="label">Description</label>
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
            <div class="level">
                <div class="level-left">
                    <div class="level-item">
                        <div class="field">
                            <div class="control">
                                <button disabled={loading} class="button is-primary" onClick={handleClick} disabled={description === ""}>Edit Event</button>
                                {loading ? <progress class="progress is-small is-primary" /> : null}
                            </div>
                        </div>
                    </div>
                    <div class="level-item">
                        <div class="field">
                            <div class="control">
                                <button disabled={loading} class="button is-primary" onClick={handleClick} disabled={description === ""}>Edit Event</button>
                                {loading ? <progress class="progress is-small is-primary" /> : null}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditEvent;