import React from 'react';
import './Title.scss';

interface TitleProps {
  text: string;
  className?: string;
}

/**
 * Component de titre générique pour l'affichage des titres dans l'application
 */
const Title: React.FC<TitleProps> = ({ text, className = '' }) => {
  return (
    <h2 className={`title-component ${className}`}>
      {text}
    </h2>
  );
};

export default Title;
