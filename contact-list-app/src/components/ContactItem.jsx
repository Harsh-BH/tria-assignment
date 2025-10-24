import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Trash2, Edit, User } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';

const ContactItem = ({ contact, onDelete, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDelete = () => {
    onDelete(contact.id);
    setShowDeleteConfirm(false);
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
        ease: 'easeOut',
      },
    },
    hover: {
      scale: 1.02,
      transition: {
        duration: 0.2,
        ease: 'easeOut',
      },
    },
  };

  return (
    <>
      <motion.div
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <Card className="card-hover">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              {/* Avatar */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="relative"
              >
                <img
                  src={contact.avatar}
                  alt={contact.name}
                  className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(contact.name)}&background=random&color=fff&size=64`;
                  }}
                />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </motion.div>

              {/* Contact Info */}
              <div className="flex-1 min-w-0">
                <h3 className="text-xl font-semibold text-foreground truncate">
                  {contact.name}
                </h3>
                <div className="flex items-center space-x-4 mt-2">
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <Mail className="w-4 h-4" />
                    <span className="text-sm truncate">{contact.email}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <Phone className="w-4 h-4" />
                    <span className="text-sm">{contact.phone}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ 
                  opacity: isHovered ? 1 : 0.7,
                  x: 0 
                }}
                transition={{ duration: 0.2 }}
                className="flex items-center space-x-2"
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground hover:text-primary"
                  title="Edit contact"
                >
                  <Edit className="w-4 h-4" />
                </Button>
                
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowDeleteConfirm(true)}
                  className="text-muted-foreground hover:text-destructive"
                  title="Delete contact"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Trash2 className="w-5 h-5 text-destructive" />
              <span>Delete Contact</span>
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to delete <strong>{contact.name}</strong>? 
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDeleteConfirm(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ContactItem;

