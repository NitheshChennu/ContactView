import React from 'react';
import './ContactDetails.css'

const ContactDetails = ({ contact, onClose }) => (
  <div className="contact-details-overlay">
    <div className="contact-details">
      {/* Close button to exit the contact details view */}
      <button className="close-button" onClick={onClose}>✖️</button>
      
      {/* Display contact details */}
      <p><strong>Name:</strong> {contact.name}</p>
      <p><strong>Email:</strong> {contact.email}</p>
      <p><strong>Phone:</strong> {contact.phone}</p>
      <p><strong>Address:</strong> {contact.address}</p>
    </div>
  </div>
);

export default ContactDetails;
