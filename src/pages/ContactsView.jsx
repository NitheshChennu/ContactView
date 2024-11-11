import React, { useState, useEffect } from 'react';
import ContactCard from '../components/ContactCard';
import ContactForm from '../components/ContactForm';
import ContactDetails from '../components/ContactDetails';
import SearchBar from '../components/SearchBar';
import './ContactsView.css';
import { RiAddLargeLine } from "react-icons/ri";

const ContactsView = () => {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [error, setError] = useState(null); // For fetch error handling

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/BitcotDev/fresher-machin-test/main/json/sample.json')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch contacts');
        return res.json();
      })
      .then((data) => setContacts(data))
      .catch((err) => setError(err.message));
  }, []);

  const handleSearch = (term) => setSearchTerm(term);

  const filteredContacts = contacts.filter((contact) =>
    contact?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact?.phone?.includes(searchTerm)
  );

  const handleAddContact = (newContact) => {
    setContacts([...contacts, { ...newContact, id: contacts.length + 1 }]);
    setShowForm(false); // Close form after adding
  };

  const handleEditContact = (updatedContact) => {
    setContacts(
      contacts.map((contact) =>
        contact.id === selectedContact.id ? { ...updatedContact, id: contact.id } : contact
      )
    );
    setSelectedContact(null);
    setShowForm(false); // Close form after editing
  };

  const handleDeleteContact = (id) => setContacts(contacts.filter((contact) => contact.id !== id));

  const openFormForEdit = (contact) => {
    setSelectedContact(contact); // Set the contact to be edited
    setShowForm(true); // Show the form
  };

  const openFormForAdd = () => {
    setSelectedContact(null); // Clear selected contact
    setShowForm(true); // Show the form for adding a new contact
  };

  return (
    <div className="contacts-view">
      <h1>ALL CONTACTS</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display fetch error */}
      <button className='add-contact' onClick={openFormForAdd}><RiAddLargeLine/>  Add Contact</button>
      <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />
      <div className="contact-list">
        {filteredContacts.map((contact) => (
          <ContactCard
            key={contact.id}
            contact={contact}
            onView={() => { setSelectedContact(contact); setShowDetails(true); }}
            onEdit={() => openFormForEdit(contact)} // Pass contact to edit
            onDelete={handleDeleteContact}
          />
        ))}
      </div>

      {showForm && (
        <ContactForm
          initialData={selectedContact || {}} // If no selected contact, pass empty object
          onSubmit={selectedContact ? handleEditContact : handleAddContact}
          onClose={() => { setSelectedContact(null); setShowForm(false); }}
          contacts={contacts}
        />
      )}

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
