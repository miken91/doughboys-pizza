import React, {useEffect, useState} from 'react';
import moment from 'moment';

function Banner(props) {
    

    return (
        <>
        {props.event && Object.entries(props.event).length !== 0 ? 
        <div class="notification is-primary" style={{ position: "sticky", top: "0", zIndex: "1", textAlign: "center" }}>
            <strong>Now taking orders to be picked up only at {props.event.description} in St. Louis, MO from {moment(props.event.startTime).format("h:mm a")} to {moment(props.event.endTime).format("h:mm a")} on {moment(props.event.endTime).format("dddd, MMMM Do")}</strong> 
        </div> : null
        }
        </>
    )
}

export default Banner;