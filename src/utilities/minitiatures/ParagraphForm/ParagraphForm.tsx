import React, { useState } from 'react';
import { Paragraph } from '../../constants/types';

interface ParagraphFormProps {
  paragraph: Paragraph;
  onChange: (paragraph: Paragraph) => void;
}

const ParagraphForm: React.FC<ParagraphFormProps> = ({ paragraph, onChange }) => {
  const [content, setContent] = useState(paragraph.content);

  return (
    <div className="mb-3 ms-5">
      <textarea className="form-control" title='content' value={content} onChange={(e) => setContent(e.target.value)} onBlur={() => onChange({ ...paragraph, content })} required />
    </div>
  );
};

export default ParagraphForm;
