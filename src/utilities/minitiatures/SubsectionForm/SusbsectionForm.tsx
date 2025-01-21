import React, { useState } from 'react';
import { Paragraph, Subsection } from '../../constants/types';
import ParagraphForm from '../ParagraphForm/ParagraphForm';

interface SubsectionFormProps {
  subsection: Subsection;
  onChange: (subsection: Subsection) => void;
}

const SubsectionForm: React.FC<SubsectionFormProps> = ({ subsection, onChange }) => {
  const [title, setTitle] = useState(subsection.title);
  const [paragraphs, setParagraphs] = useState<Paragraph[]>(subsection.paragraphs);

  const handleAddParagraph = () => {
    setParagraphs([...paragraphs, { id: Date.now(), content: '' }]);
  };

  const handleParagraphChange = (index: number, updatedParagraph: Paragraph) => {
    const newParagraphs = [...paragraphs];
    newParagraphs[index] = updatedParagraph;
    setParagraphs(newParagraphs);
    onChange({ ...subsection, title, paragraphs: newParagraphs });
  };

  return (
    <div className="mb-3 ms-5 col-10">
      <input type="text" className="form-control mb-2" value={title} title='title' onChange={(e) => setTitle(e.target.value)} onBlur={() => onChange({ ...subsection, title })} required />
      {paragraphs.map((paragraph, index) => (
        <ParagraphForm key={paragraph.id} paragraph={paragraph} onChange={(updatedParagraph) => handleParagraphChange(index, updatedParagraph)} />
      ))}
      <button type="button" className="btn btn-secondary btn-sm mb-2" onClick={handleAddParagraph}><i className='fa fa-plus'></i> Paragraph</button>
    </div>
  );
};

export default SubsectionForm;
