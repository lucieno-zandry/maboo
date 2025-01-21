import React from 'react';
import Paragraph, { ParagraphProps } from '../Paragraph/Paragraph';

export interface SubsectionProps {
  id: number;
  title: string;
  order: number;
  paragraphs: ParagraphProps[];
}

const Subsection: React.FC<SubsectionProps> = ({ title, paragraphs }) => {
  return (
    <div>
      <h3>{title}</h3>
      {paragraphs.map((paragraph) => (
        <Paragraph key={paragraph.id} {...paragraph} />
      ))}
    </div>
  );
};

export default Subsection;
