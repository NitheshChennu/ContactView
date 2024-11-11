import React from 'react';
import './ContactCard.css';
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { TiEye } from "react-icons/ti";
import { IoPersonCircleSharp } from "react-icons/io5";

const ContactCard = ({ contact, onView, onEdit, onDelete }) => {
  // Function to handle the delete action, with a confirmation prompt
  const handleDelete = () => {
    const confirmDelete = window.confirm(`Are you sure you want to delete ${contact.name}?`);
    if (confirmDelete) {
      onDelete(contact.id); // Calls onDelete with the contact ID if confirmed
    }
  };

  return (
    <div className="contact-card">
      {/* Contact name and avatar icon */}
      <div className="contact-info">
        <IoPersonCircleSharp size={30} style={{ marginRight: '10px' }} />
        <span>{contact.name}</span>
      </div>

      {/* Display contact phone */}
      <span>{contact.phone}</span>

      {/* Buttons for viewing, editing, and deleting the contact */}
      <button id='view-button' onClick={() => onView(contact)}><TiEye /></button> {/* View button */}
      <button id='edit-button' onClick={() => onEdit(contact)}><FaEdit /></button> {/* Edit button */}
      <button id='delete-button' onClick={handleDelete}><MdDeleteForever /></button> {/* Delete button */}
    </div>
  );
};

export default ContactCard;
