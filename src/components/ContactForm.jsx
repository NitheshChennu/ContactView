import React, { useState } from 'react';
import './ContactForm.css';
import { IoIosCloseCircle } from "react-icons/io";

const ContactForm = ({ onSubmit, onClose, initialData = {}, contacts = [] }) => {
  const [name, setName] = useState(initialData.name || '');
  const [email, setEmail] = useState(initialData.email || '');
  const [phone, setPhone] = useState(initialData.phone || '');
  const [address, setAddress] = useState(initialData.address || '');
  const [errors, setErrors] = useState({});

  // Validate form including duplicates
  const validateForm = () => {
    const newErrors = {};

    if (!name) newErrors.name = 'Name is required';
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(phone)) {
      newErrors.phone = 'Phone number must be 10 digits';
    }
    if (!address) newErrors.address = 'Address is required';

    // Check for duplicates, excluding the current contact being edited
    if (contacts.some(contact => contact.name === name && contact.id !== initialData.id)) {
      newErrors.name = 'This name already exists';
    }
    if (contacts.some(contact => contact.phone === phone && contact.id !== initialData.id)) {
      newErrors.phone = 'This phone number is already registered';
    }
    if (contacts.some(contact => contact.email === email && contact.id !== initialData.id)) {
      newErrors.email = 'This email is already registered';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit({ name, email, phone, address });
      setName(''); setEmail(''); setPhone(''); setAddress(''); // Clear fields after successful submission
    }
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setPhone('');
    setAddress('');
    setErrors({});
  };

  return (
    <div className="contact-form-overlay">
      <div className="contact-form">
        <button className="close-button" onClick={onClose}><IoIosCloseCircle /></button>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            aria-describedby="name-error"
          />
          {errors.name && <div id="name-error" className="error-message">{errors.name}</div>}
          
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            aria-describedby="email-error"
          />
          {errors.email && <div id="email-error" className="error-message">{errors.email}</div>}
          
          <input
            type="text"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            aria-describedby="phone-error"
          />
          {errors.phone && <div id="phone-error" className="error-message">{errors.phone}</div>}
          
          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            aria-describedby="address-error"
          />
          {errors.address && <div id="address-error" className="error-message">{errors.address}</div>}

          <div id="buttons">
            <button id="submit-button" type="submit">Submit</button>
            <button id="reset-button" type="button" onClick={handleReset}>Reset</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
