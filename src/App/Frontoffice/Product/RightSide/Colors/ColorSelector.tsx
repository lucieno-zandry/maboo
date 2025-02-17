import React from 'react';

interface Color {
  id: number;
  code: string;
  name: string;
  product_id: string;
  created_at: string;
}

interface ColorSelectorProps {
  colors: Color[];
  onChange: (color: Color) => void;
  selectedColor: Color | null;
}

const ColorSelector: React.FC<ColorSelectorProps> = ({ colors, onChange, selectedColor }) => {
  return (
    <div className="color-selector-container mt-4">
      <div className="color-label mb-2">
        Couleur: {selectedColor?.name || 'SELECT COLOR'}
      </div>
      <div className="color-options d-flex gap-2">
        {colors.map((color) => (
          <button
            key={color.id}
            onClick={() => onChange(color)}
            className={`color-swatch ${selectedColor?.id === color.id ? 'selected' : ''}`}
            style={{
              backgroundColor: color.code,
              // Pour les couleurs claires comme le blanc, ajoutez une bordure visible
              border: color.code.toLowerCase() === '#ffffff' ? '1px solid #e0e0e0' : 'none'
            }}
            title={color.name}
            type="button"
            aria-label={`Select ${color.name} color`}
          />
        ))}
      </div>

      <style>{`
        .color-selector-container {
          font-family: inherit;
        }

        .color-label {
          font-size: 0.9rem;
          color: #666;
          font-weight: 500;
        }

        .color-swatch {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          cursor: pointer;
          padding: 0;
          position: relative;
          transition: transform 0.2s;
        }

        .color-swatch:hover {
          transform: scale(1.1);
        }

        .color-swatch.selected::after {
          content: '';
          position: absolute;
          top: -4px;
          left: -4px;
          right: -4px;
          bottom: -4px;
          border: 2px solid #666;
          border-radius: 50%;
        }
      `}</style>
    </div>
  );
};

export default ColorSelector;