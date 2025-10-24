import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const LoadingSpinner = () => {
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
      className="flex flex-col items-center justify-center py-16"
    >
      <motion.div
        variants={itemVariants}
        className="relative"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-16 h-16 border-4 border-blue-200 border-t-blue-500 rounded-full"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-purple-500 rounded-full"
        />
      </motion.div>
      
      <motion.div
        variants={itemVariants}
        className="mt-6 text-center"
      >
        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          Loading Contacts
        </h3>
        <p className="text-gray-500">
          Please wait while we fetch your contacts...
        </p>
      </motion.div>

      {/* Animated dots */}
      <motion.div
        variants={itemVariants}
        className="flex space-x-1 mt-4"
      >
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: index * 0.2,
            }}
            className="w-2 h-2 bg-blue-500 rounded-full"
          />
        ))}
      </motion.div>
    </motion.div>
  );
};

export default LoadingSpinner;


