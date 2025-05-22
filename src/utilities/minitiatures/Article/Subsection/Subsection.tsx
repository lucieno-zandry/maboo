import React from 'react';
import Paragraph, { ParagraphProps } from '../Paragraph/Paragraph';
import './SubsectionP.scss';

export interface SubsectionProps {
  id: number;
  title: string;
  order: number;
  paragraphs: ParagraphProps[];
}

const Subsection: React.FC<SubsectionProps> = ({ title, paragraphs, order }) => {
  
  // const num = Number;
  console.log(order);

  return (
    <div className={`separationdisplay ${order % 2 === 0 ? 'left' : 'right'}`}>
      <h3>{title}</h3>
      {paragraphs.map((paragraph) => (
        <Paragraph key={paragraph.id} {...paragraph} />
      ))}
    </div>
  );
};

export default Subsection;
