import React, { useState } from 'react';
import { Article, Image, Section } from '../../constants/types';
import SectionForm from '../SectionForm/SectionForm';
import ImageForm from '../ImageForm/ImageForm';

interface ArticleFormProps {
  onSubmit: (article: Article) => void;
  initialData?: Article;
}

const ArticleForm: React.FC<ArticleFormProps> = ({ onSubmit, initialData }) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [author, setAuthor] = useState(initialData?.author || '');
  const [sections, setSections] = useState<Section[]>(initialData?.sections || []);
  const [images, setImages] = useState<Image[]>(initialData?.images || []);

  const handleAddSection = () => {
    setSections([...sections, { id: Date.now(), title: '', subsections: [] }]);
  };

  const handleRemoveSection = (id: number) => {
    setSections(sections.filter(section => section.id !== id));
  };

  const handleAddImage = () => {
    setImages([...images, { id: Date.now(), url: '', caption: '' }]);
  };

  const handleRemoveImage = (id: number) => {
    setImages(images.filter(image => image.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ id: initialData?.id || Date.now(), title, author, created_at: new Date().toISOString(), updated_at: new Date().toISOString(), sections, images });
  };

  return (
    <form onSubmit={handleSubmit} className="container">
      <div className='form-group d-flex gap-3 flex-wrap'>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input type="text" className="form-control" title='title' value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Author</label>
          <input type="text" className="form-control" title='author' value={author} onChange={(e) => setAuthor(e.target.value)} required />
        </div>
      </div>
      <div className="mb-3 d-flex flex-column align-items-start">
        <label className="form-label">Sections</label>
        {sections.map((section, index) => (
          <SectionForm key={section.id} section={section} onChange={(updatedSection) => {
            const newSections = [...sections];
            newSections[index] = updatedSection;
            setSections(newSections);
          }} onRemove={() => handleRemoveSection(section.id)} />
        ))}
        <button type="button" className="btn btn-primary btn-sm" onClick={handleAddSection}><i className='fa fa-plus'></i> Add Section</button>
      </div>
      <div className="mb-3 d-flex flex-column align-items-start">
        <label className="form-label">Images</label>
        {images.map((image, index) => (
          <ImageForm key={image.id} image={image} onChange={(updatedImage) => {
            const newImages = [...images];
            newImages[index] = updatedImage;
            setImages(newImages);
          }} onRemove={() => handleRemoveImage(image.id)} />
        ))}
        <button type="button" className="btn btn-primary btn-sm" onClick={handleAddImage}><i className='fa fa-plus'></i> Image</button>
      </div>
      <button type="submit" className="btn btn-success btn-sm"><i className='fa fa-check'></i> Enregistrer</button>
    </form>
  );
};

export default ArticleForm;
