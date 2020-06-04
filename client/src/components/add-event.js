import React, {useState} from 'react'
import DateTimePicker from 'react-datetime-picker';
import { store } from 'react-notifications-component';

function AddEvent(props) {
    const [startDateTime, setStartDateTime] = useState(new Date());
    const [endDateTime, setEndDateTime] = useState(new Date());
    const [amountOfOrders, setAmountOfOrders] = useState(2);
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const handleClick = async () => {
        setLoading(true)
        var response = await fetch('/add-event', {method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({event: { summary: description, start: startDateTime, end: endDateTime, amountOfOrders: amountOfOrders}})})
        response = await response.json()
        setLoading(false)
        if (response.message === "Event added succesfully.") {
            store.addNotification({
                title: "Event Added",
                message: "Event Added Succesfully",
                type: "success",
                insert: "top",
                container: "top-center",
                dismiss: {
                    duration: 1500,
                }
            })
            setStartDateTime(new Date());
            setEndDateTime(new Date());
            setDescription("");
            setAmountOfOrders(2);
        } else {
            store.addNotification({
                title: "Error",
                message: "Error While Adding Event.",
                type: "danger",
                insert: "top",
                container: "top-center",
                dismiss: {
                    duration: 1500,
                }
            })
        }
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
            <div class="field">
                <div class="control">
                    <button class="button is-primary" onClick={handleClick} disabled={description === "" || loading}>Add Event</button>
                </div>
            </div>
            {loading ? <progress class="progress is-small is-primary" /> : null}
        </>
    )
}

export default AddEvent;