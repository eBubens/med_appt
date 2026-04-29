// Following code has been commented with appropriate comments for your reference.
import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';

// Function component ReviewForm to display ReviewForms
const ReviewForm = () => {
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [doctorData, setDoctorData] = useState(null);
  const [appointmentData, setAppointmentData] = useState(null);


  return (
    <div className="review-form">
        <h1>EBU!</h1>
    </div>
  );
};

// Export ReviewForm component for use in other parts of the application
export default ReviewForm;
