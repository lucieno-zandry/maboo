import React, { useState } from 'react';
import { Section, Subsection } from '../../constants/types';
import SubsectionForm from '../SubsectionForm/SusbsectionForm';

interface SectionFormProps {
  section: Section;
  onChange: (section: Section) => void;
  onRemove: () => void;
}

const SectionForm: React.FC<SectionFormProps> = ({ section, onChange, onRemove }) => {
  const [title, setTitle] = useState(section.title);
  const [subsections, setSubsections] = useState<Subsection[]>(section.subsections);

  const handleAddSubsection = () => {
    setSubsections([...subsections, { id: Date.now(), title: '', paragraphs: [] }]);
  };

  const handleSubsectionChange = (index: number, updatedSubsection: Subsection) => {
    const newSubsections = [...subsections];
    newSubsections[index] = updatedSubsection;
    setSubsections(newSubsections);
    onChange({ ...section, title, subsections: newSubsections });
  };

  return (
    <div className='d-flex gap-3 flex-wrap align-items-start col-12'>
      <input type="text" className="form-control mb-2 col-7" value={title} title='title' onChange={(e) => setTitle(e.target.value)} onBlur={() => onChange({ ...section, title })} required />
      {subsections.map((subsection, index) => (
        <SubsectionForm key={subsection.id} subsection={subsection} onChange={(updatedSubsection) => handleSubsectionChange(index, updatedSubsection)} />
      ))}
      <button type="button" className="btn btn-secondary btn-sm mb-2 col-2" onClick={handleAddSubsection}><i className='fa fa-plus'></i> Subsection</button>
      <button type="button" className="btn btn-danger btn-sm col-2" onClick={onRemove}><i className='fa fa-trash'></i> Section</button>
    </div>
  );
};

export default SectionForm;
