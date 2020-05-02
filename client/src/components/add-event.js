import React, {useState} from 'react'
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment'

function AddEvent(props) {
    const [startDateTime, setStartDateTime] = useState(new Date());
    const [endDateTime, setEndDateTime] = useState(new Date());
    const [description, setDescription] = useState("");
    const handleClick = async () => {
        var response = await fetch('/add-event', {method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({event: { summary: description, start: startDateTime, end: endDateTime}})})
        props.updateList.setUpdateList(true)
    }
    return (
        <>
            <h1 class="title is-3 is-spaced">Application Admin</h1>
            <h1 class="subtitle is-5">Add Event</h1>
            <div class="field">
                <label class="label">Description</label>
                <div class="control">
                    <input 
                    value={description}
                    onChange={(event) => setDescription(event.target.value)} class="input" type="text" placeholder="Event Description" />
                </div>
            </div>
            <div class="field">
                <label class="label">Start Date and Time</label>
                <div class="control">
                    <DateTimePicker
                        name='start'
                        onChange={(value) => setStartDateTime(value)}
                        value={startDateTime}
                        disableClock={true} />
                </div>
            </div>
            <div class="field">
                <label class="label">End Date and Time</label>
                <div class="control">
                    <DateTimePicker
                        name='end'
                        onChange={(value) => setEndDateTime(value)}
                        value={endDateTime}
                        disableClock={true} />
                </div>
            </div>
            <div class="field">
                <div class="control">
                    <button class="button is-primary" onClick={handleClick} disabled={description === ""}>Add Event</button>
                </div>
            </div>
        </>
    )
}

export default AddEvent;