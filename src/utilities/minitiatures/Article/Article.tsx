import React from 'react';
import Section, { SectionProps } from './Section/Section';
import { ImageProps } from './Image/Image';

interface ArticleProps {
  id: number;
  title: string;
  author: string;
  created_at: string;
  updated_at: string;
  sections: SectionProps[];
  images: ImageProps[];
}

const Article: React.FC<ArticleProps> = ({ title, author, created_at, sections, images }) => {
  return (
    <div className='article'>
      <h1>{title}</h1>
      <p>By {author}</p>
      <p>Created at: {new Date(created_at).toLocaleDateString()}</p>
      {sections.map((section) => (
        <Section key={section.id} {...section} />
      ))}
      {images.map((image) => (
        <img key={image.id} src={image.url} alt={image.caption} />
      ))}
    </div>
  )
}

export default Article;
