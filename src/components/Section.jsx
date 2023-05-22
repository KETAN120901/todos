import React, { useState } from 'react';
import Calendar from 'react-calendar';

import 'react-calendar/dist/Calendar.css';

import Tasks from './Tasks.jsx';
function Section() {
    const [state ,setState]= useState({
        selectedDate: new Date()
        
      });
      function onChange(date){
        
        setState({ selectedDate: date });
        
      };
     
      
    return (
        <div className="section">
            <div className='calender'>
        
        <Calendar
          onChange={onChange}
          value={state.selectedDate}
        />
        
        
      </div>
      <Tasks date={state.selectedDate.toDateString()}/>



        </div>
    )
}
export default Section;