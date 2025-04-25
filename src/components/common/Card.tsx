import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
}

const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  onClick,
  hoverable = false 
}) => {
  const baseClasses = 'bg-white rounded-lg shadow-card overflow-hidden';
  const hoverClasses = hoverable ? 'cursor-pointer transition-all duration-300 hover:shadow-lg' : '';
  const cardClasses = `${baseClasses} ${hoverClasses} ${className}`;
  
  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.4,
        ease: "easeOut"
      }
    },
    hover: {
      y: -5,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: { 
        duration: 0.2
      }
    }
  };

  return (
    <motion.div
      className={cardClasses}
      onClick={onClick}
      initial="hidden"
      animate="visible"
      whileHover={hoverable ? "hover" : undefined}
      variants={variants}
    >
      {children}
    </motion.div>
  );
};

export default Card;