import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ContactList from './components/ContactList';
import SearchBar from './components/SearchBar';
import AddContactForm from './components/AddContactForm';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import EmptyState from './components/EmptyState';
import { Users, Plus, Search } from 'lucide-react';
import { apiService } from './services/api';
import { Button } from './components/ui/button';
import { Card, CardContent } from './components/ui/card';

function App() {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  // Load contacts from API
  useEffect(() => {
    const loadContacts = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const data = await apiService.getContacts();
        setContacts(data);
        setFilteredContacts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadContacts();
  }, []);

  // Filter contacts based on search term
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredContacts(contacts);
    } else {
      const filtered = contacts.filter(contact =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.phone.includes(searchTerm)
      );
      setFilteredContacts(filtered);
    }
  }, [searchTerm, contacts]);

  const handleAddContact = async (newContact) => {
    try {
      const createdContact = await apiService.createContact(newContact);
      setContacts(prev => [createdContact, ...prev]);
      setShowAddForm(false);
    } catch (err) {
      console.error('Failed to create contact:', err);
      // You could add toast notification here
    }
  };

  const handleDeleteContact = async (id) => {
    try {
      await apiService.deleteContact(id);
      setContacts(prev => prev.filter(contact => contact.id !== id));
    } catch (err) {
      console.error('Failed to delete contact:', err);
      // You could add toast notification here
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Contact List
            </h1>
          </div>
          <p className="text-gray-600 text-lg">
            Manage your contacts with ease
          </p>
        </motion.div>

        {/* Search and Add Button */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          className="flex flex-col sm:flex-row gap-4 mb-8"
        >
          <div className="flex-1">
            <SearchBar
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
            />
          </div>
          <Button
            onClick={() => setShowAddForm(true)}
            className="flex items-center gap-2 whitespace-nowrap"
          >
            <Plus className="w-5 h-5" />
            Add Contact
          </Button>
        </motion.div>

        {/* Main Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Card className="glass-effect">
            <CardContent className="p-6">
          {loading && <LoadingSpinner />}
          
          {error && <ErrorMessage message={error} onRetry={() => window.location.reload()} />}
          
          {!loading && !error && filteredContacts.length === 0 && searchTerm && (
            <EmptyState
              icon={Search}
              title="No contacts found"
              description={`No contacts match "${searchTerm}". Try adjusting your search terms.`}
            />
          )}
          
          {!loading && !error && filteredContacts.length === 0 && !searchTerm && (
            <EmptyState
              icon={Users}
              title="No contacts yet"
              description="Get started by adding your first contact."
              actionText="Add Contact"
              onAction={() => setShowAddForm(true)}
            />
          )}
          
          {!loading && !error && filteredContacts.length > 0 && (
            <ContactList
              contacts={filteredContacts}
              onDeleteContact={handleDeleteContact}
            />
          )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Add Contact Modal */}
        <AddContactForm
          open={showAddForm}
          onAddContact={handleAddContact}
          onClose={() => setShowAddForm(false)}
        />
      </div>
    </div>
  );
}

export default App;