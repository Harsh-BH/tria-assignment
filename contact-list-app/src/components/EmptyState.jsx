import React from 'react';
import { motion } from 'framer-motion';

const EmptyState = ({ icon: Icon, title, description, actionText, onAction }) => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
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
        delay: 0.1,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center justify-center py-16"
    >
      <motion.div
        variants={itemVariants}
        className="relative mb-6"
      >
        <div className="w-20 h-20 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
          <Icon className="w-10 h-10 text-blue-500" />
        </div>
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
          className="absolute inset-0 w-20 h-20 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full"
        />
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="text-center max-w-md"
      >
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          {title}
        </h3>
        <p className="text-gray-600 mb-6">
          {description}
        </p>
        
        {actionText && onAction && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onAction}
            className="btn-primary"
          >
            {actionText}
          </motion.button>
        )}
      </motion.div>
    </motion.div>
  );
};

export default EmptyState;


