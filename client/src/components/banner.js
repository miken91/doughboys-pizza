import React, {useEffect, useState} from 'react';
import moment from 'moment';

function Banner() {
    const [event, setEvent] = useState();
    useEffect(() => {
        async function getEvent() {
            let response = await fetch('/next-event')
            let event = await response.json();
            console.log(event)
            setEvent(event);
        }
        getEvent();
    }, [])

    return (
        <div class="notification is-primary" style={{ position: "sticky", top: "0", zIndex: "1", textAlign: "center" }}>
            {event ?
            <strong>Now taking orders to be picked up only at {event.description} in St. Louis, MO from {moment(event.startTime).format("h:mm a")} to {moment(event.endTime).format("h:mm a")} on {moment(event.endTime).format("dddd, MMMM Do")}</strong> 
            : null }
        </div>
    )
}

export default Banner;