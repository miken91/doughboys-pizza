import React, { useState, useEffect } from 'react';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment'
import AddEvent from '../components/add-event';
import EditEvent from '../components/edit-event';


function Admin() {
    const [updateList, setUpdateList] = useState(false)
    return (
        <div style={{ "height": "100%" }} class="container">
            <div class="box">
                <div class="columns">
                    <div class="column is-one-third">
                        <AddEvent updateList={{updateList, setUpdateList}}/>
                        <EditEvent updateList={{updateList, setUpdateList}}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Admin;