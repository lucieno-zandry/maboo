import React from 'react';

export interface ImageProps {
  id: number;
  url: string;
  caption: string;
  order: number;
}

const Image: React.FC<ImageProps> = ({ url, caption }) => {
  return <img src={url} alt={caption} />;
};

export default Image;
