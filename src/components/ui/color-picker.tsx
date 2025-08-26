import React from 'react';
import { HexColorPicker } from 'react-colorful';
import { Input } from './input';
import { Label } from './label';
import { Button } from './button';
import { Trash2, Plus } from 'lucide-react';

interface ColorPickerProps {
  colors: string[];
  onColorsChange: (colors: string[]) => void;
  maxColors?: number;
}

export function ColorPicker({ colors, onColorsChange, maxColors = 6 }: ColorPickerProps) {
  const [selectedColorIndex, setSelectedColorIndex] = React.useState<number>(0);
  const [newColor, setNewColor] = React.useState('#000000');

  const handleColorChange = (color: string) => {
    const newColors = [...colors];
    newColors[selectedColorIndex] = color;
    onColorsChange(newColors);
  };

  const handleColorInputChange = (index: number, value: string) => {
    const newColors = [...colors];
    newColors[index] = value;
    onColorsChange(newColors);
  };

  const addColor = () => {
    if (colors.length < maxColors) {
      onColorsChange([...colors, '#000000']);
      setSelectedColorIndex(colors.length);
    }
  };

  const removeColor = (index: number) => {
    if (colors.length > 1) {
      const newColors = colors.filter((_, i) => i !== index);
      onColorsChange(newColors);
      setSelectedColorIndex(Math.max(0, index - 1));
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>选择颜色</Label>
          <HexColorPicker 
            color={colors[selectedColorIndex]} 
            onChange={handleColorChange}
            className="w-full mt-2"
          />
        </div>
        <div>
          <Label>颜色列表</Label>
          <div className="space-y-2 mt-2">
            {colors.map((color, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="color"
                  value={color}
                  onChange={(e) => handleColorInputChange(index, e.target.value)}
                  className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
                />
                <Input
                  value={color}
                  onChange={(e) => handleColorInputChange(index, e.target.value)}
                  className="flex-1"
                  placeholder="#000000"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedColorIndex(index)}
                  className={`px-2 ${selectedColorIndex === index ? 'bg-blue-100' : ''}`}
                >
                  {selectedColorIndex === index ? '✓' : index + 1}
                </Button>
                {colors.length > 1 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeColor(index)}
                    className="p-1 text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={16} />
                  </Button>
                )}
              </div>
            ))}
            {colors.length < maxColors && (
              <Button
                variant="outline"
                onClick={addColor}
                className="w-full"
              >
                <Plus size={16} className="mr-2" />
                添加颜色
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}