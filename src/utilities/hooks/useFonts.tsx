import { useEffect } from 'react';
import aristaPro from '../../assets/fonts/aristaPro/Arista-Pro-Regular-trial.ttf'; // Adjust path as needed

const useFonts = () => {

  useEffect(() => {
    const font = new FontFace('MyMainFont', `url(${aristaPro}) format('truetype')`); // Specify format
    font.load().then(() => {
      document.body.style.fontSize = '18px';
    });
  }, []);
};

export default useFonts;