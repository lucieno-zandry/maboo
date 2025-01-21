import React from 'react';

export interface ParagraphProps {
  id: number;
  content: string;
}

const Paragraph: React.FC<ParagraphProps> = ({ content }) => {
  return <p>{content}</p>;
};

export default Paragraph;
