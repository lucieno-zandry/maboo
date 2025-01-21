import React, { useState } from 'react';
import { Image } from '../../constants/types';

interface ImageFormProps {
  image: Image;
  onChange: (image: Image) => void;
  onRemove: () => void;
}

const ImageForm: React.FC<ImageFormProps> = ({ image, onChange, onRemove }) => {
  const [url, setUrl] = useState(image.url);
  const [caption, setCaption] = useState(image.caption);

  return (
    <div className="mb-3">
      <input type="text" className="form-control mb-2" title='url' value={url} onChange={(e) => setUrl(e.target.value)} onBlur={() => onChange({ ...image, url })} required />
      <input type="text" className="form-control mb-2" title='caption' value={caption} onChange={(e) => setCaption(e.target.value)} onBlur={() => onChange({ ...image, caption })} required />
      <button type="button" className="btn btn-danger" onClick={onRemove}>Remove Image</button>
    </div>
  );
};

export default ImageForm;
