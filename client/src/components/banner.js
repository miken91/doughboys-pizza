import React, { useContext } from 'react';
import moment from 'moment';
import ApplicationContext from '../ApplicationContext'

function Banner() {
    const state = useContext(ApplicationContext);
    return (
        <> 
            {state.events && state.events.length > 0 ?
            <div class="notification is-primary" style={{ position: "sticky", top: "0", zIndex: "1", textAlign: "center" }}>
                <strong>Now taking orders to be picked up only at </strong>
                {state.events.map((event, index) =>
                    <strong> {event.description} from {moment(event.startTime).format("h:mm a")} to {moment(event.endTime).format("h:mm a")} on {moment(event.endTime).format("dddd, MMMM Do")} {state.events.length > 1 && index != state.events.length - 1  ? <strong> and </strong>: null } </strong>
                )
                }
            </div> : null
            }
        </>
    )
}

export default Banner;