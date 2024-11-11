import React from 'react';
import './ContactCard.css';
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { TiEye } from "react-icons/ti";
import { IoPersonCircleSharp } from "react-icons/io5";



const ContactCard = ({ contact, onView, onEdit, onDelete }) => {
  const handleDelete = () => {
    const confirmDelete = window.confirm(`Are you sure you want to delete ${contact.name}?`);
    if (confirmDelete) {
      onDelete(contact.id);
    }
  };

  return (
    <div className="contact-card">
      <div className="contact-info">
        <IoPersonCircleSharp size={30} style={{ marginRight: '10px' }} /> {/* Icon with some spacing */}
        <span>{contact.name}</span>
      </div>
      <span>{contact.phone}</span>
      <button id='view-button' onClick={() => onView(contact)}><TiEye /></button>
      <button id='edit-button' onClick={() => onEdit(contact)}><FaEdit /></button>
      <button id='delete-button' onClick={handleDelete}><MdDeleteForever /></button>
    </div>
  );
};

export default ContactCard;
