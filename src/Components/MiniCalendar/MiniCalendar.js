import React, { useEffect, useState } from 'react'
import Calendar from 'react-calendar';
import { Link, useHistory } from 'react-router-dom';

import './MiniCalendar.css';

function Scheduler() {
    return (
        <div className="scheduler">
            <h2 className="header">Calendar</h2>
            <Calendar />
        </div>
    )
}

export default Scheduler
