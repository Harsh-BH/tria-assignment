import React from 'react';
import { motion } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';

const SearchBar = ({ searchTerm, onSearchChange }) => {
  const handleClear = () => {
    onSearchChange('');
  };

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="relative"
    >
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
        <Input
          type="text"
          placeholder="Search contacts by name, email, or phone..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-12 pr-12 h-12 bg-background/80 backdrop-blur-sm"
        />
        {searchTerm && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="absolute right-2 top-1/2 transform -translate-y-1/2"
          >
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClear}
              className="h-8 w-8 text-muted-foreground hover:text-foreground"
              title="Clear search"
            >
              <X className="w-4 h-4" />
            </Button>
          </motion.div>
        )}
      </div>
      
      {/* Search results indicator */}
      {searchTerm && (
        <motion.div
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mt-2 text-sm text-muted-foreground"
        >
          <span className="inline-flex items-center px-3 py-1 bg-primary/10 text-primary rounded-full">
            <Search className="w-3 h-3 mr-1" />
            Searching for "{searchTerm}"
          </span>
        </motion.div>
      )}
    </motion.div>
  );
};

export default SearchBar;

