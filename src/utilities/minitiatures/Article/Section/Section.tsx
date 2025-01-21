import React from 'react';
import Subsection, { SubsectionProps } from '../Subsection/Subsection';

export interface SectionProps {
  id: number;
  title: string;
  order: number;
  subsections: SubsectionProps[];
}

const Section: React.FC<SectionProps> = ({ title, subsections }) => {
  return (
    <div>
      <h2>{title}</h2>
      {subsections.map((subsection) => (
        <Subsection key={subsection.id} {...subsection} />
      ))}
    </div>
  );
};

export default Section;
