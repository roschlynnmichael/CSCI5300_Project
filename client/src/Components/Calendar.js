import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './CSS/Calendar.css'; // Ensure you have appropriate styles for the calendar

const CalendarComponent = ({ onDateClick }) => {
  return (
    <div className="calendar-container">
      <Calendar
        onClickDay={(value) => onDateClick(value)}
      />
    </div>
  );
};

export default CalendarComponent;
