import React, { useEffect, useState, ChangeEvent } from 'react';
import axios from 'axios';

interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
}

const ContactList: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    axios.get<Contact[]>('http://localhost:3001/contacts')
      .then(response => {
        setContacts(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <h1>Contact List</h1>
      <input
        type="text"
        placeholder="Search contacts"
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <ul>
        {filteredContacts.map(contact => (
          <li key={contact.id}>
            <strong>{contact.name}</strong>
            <p>Email: {contact.email}</p>
            <p>Phone: {contact.phone}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactList;
