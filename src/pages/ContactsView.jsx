import React, { useState, useEffect } from 'react';
import ContactCard from '../components/ContactCard';
import ContactForm from '../components/ContactForm';
import ContactDetails from '../components/ContactDetails';
import SearchBar from '../components/SearchBar';
import './ContactsView.css';
import { RiAddLargeLine } from "react-icons/ri";

const ContactsView = () => {
  // State variables
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); 
  const [showForm, setShowForm] = useState(false); 
  const [showDetails, setShowDetails] = useState(false); 
  const [selectedContact, setSelectedContact] = useState(null); 
  const [error, setError] = useState(null); 

  // Fetch contacts data from an API on component mount
  useEffect(() => {
    fetch('https://raw.githubusercontent.com/BitcotDev/fresher-machin-test/main/json/sample.json')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch contacts');
        return res.json();
      })
      .then((data) => setContacts(data))
      .catch((err) => setError(err.message)); // Catch and display errors
  }, []);

  // Handle search term change
  const handleSearch = (term) => setSearchTerm(term);

  // Filter contacts based on search term (name or phone)
  const filteredContacts = contacts.filter((contact) =>
    contact?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact?.phone?.includes(searchTerm)
  );

  // Handle adding a new contact
  const handleAddContact = (newContact) => {
    setContacts([...contacts, { ...newContact, id: contacts.length + 1 }]); 
    setShowForm(false); 
  };

  // Handle editing an existing contact
  const handleEditContact = (updatedContact) => {
    setContacts(
      contacts.map((contact) =>
        contact.id === selectedContact.id ? { ...updatedContact, id: contact.id } : contact
      )
    );
    setSelectedContact(null);
    setShowForm(false); 
  };

  // Handle deleting a contact
  const handleDeleteContact = (id) => setContacts(contacts.filter((contact) => contact.id !== id));

  // Open form for editing a contact
  const openFormForEdit = (contact) => {
    setSelectedContact(contact);
    setShowForm(true); 
  };

  // Open form for adding a new contact
  const openFormForAdd = () => {
    setSelectedContact(null);
    setShowForm(true); 
  };

  return (
    <div className="contacts-view">
      <h1>ALL CONTACTS</h1>

      {/* Display error message if fetching contacts fails */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <button className='add-contact' onClick={openFormForAdd}><RiAddLargeLine/>  Add Contact</button>

      <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />
      <div className="contact-list">
        {filteredContacts.map((contact) => (
          <ContactCard
            key={contact.id}
            contact={contact}
            onView={() => { setSelectedContact(contact); setShowDetails(true); }}
            onEdit={() => openFormForEdit(contact)}
            onDelete={handleDeleteContact} // Handle delete action
          />
        ))}
      </div>

      {/* Conditionally render the contact form (for add/edit) */}
      {showForm && (
        <ContactForm
          initialData={selectedContact || {}} 
          onSubmit={selectedContact ? handleEditContact : handleAddContact} 
          onClose={() => { setSelectedContact(null); setShowForm(false); }} 
          contacts={contacts} // Pass all contacts for validation
        />
      )}

      {/* Conditionally render the contact details view */}
      {showDetails && selectedContact && (
        <ContactDetails
          contact={selectedContact}
          onClose={() => setShowDetails(false)} 
        />
      )}
    </div>
  );
};

export default ContactsView;
