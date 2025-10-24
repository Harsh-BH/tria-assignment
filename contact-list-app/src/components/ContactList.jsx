import React from 'react';
import { motion } from 'framer-motion';
import ContactItem from './ContactItem';

const ContactList = ({ contacts, onDeleteContact }) => {
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
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-4"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Contacts ({contacts.length})
        </h2>
      </div>
      
      <div className="grid gap-4">
        {contacts.map((contact, index) => (
          <motion.div
            key={contact.id}
            variants={itemVariants}
            layout
            className="card-hover"
          >
            <ContactItem
              contact={contact}
              onDelete={onDeleteContact}
              index={index}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ContactList;


