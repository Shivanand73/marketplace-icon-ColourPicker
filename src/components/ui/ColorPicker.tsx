import { useState } from "react";
import { ChromePicker } from "react-color";
import { Button } from "./button";

interface Props {
  initialColor?: string;
  onColorSelect: (hex: string) => void;
  onSave: () => Promise<void>;
  saveStatus: "idle" | "saving" | "saved" | "error";
}

export function ColorPicker({
  initialColor = "#ffffff",
  onColorSelect,
  onSave,
  saveStatus,
}: Props) {
  const [color, setColor] = useState(initialColor);

  const handleChange = (colorObj: any) => {
    setColor(colorObj.hex);
    onColorSelect(colorObj.hex);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          🎨 Select Background Color
        </h1>

        {/* Chrome Color Picker */}
        <ChromePicker color={color} onChange={handleChange} />

        {/* Color Preview Box */}
        <div className="mt-6 flex items-center">
          <span className="font-bold text-gray-700 text-lg mr-4">
            Selected Color:
          </span>
          <div
            className="w-20 h-20 rounded-lg border-2 border-gray-400"
            style={{ backgroundColor: color }}
            title={color}
          ></div>
          <span className="ml-4 text-md font-semibold text-gray-600">
            {color}
          </span>
        </div>

        {/* Save Button */}
        <div className="mt-8 text-center">
          <Button
            onClick={onSave}
            disabled={saveStatus === "saving" || saveStatus === "saved"}
          >
            {saveStatus === "saving"
              ? "Saving..."
              : saveStatus === "saved"
              ? "Saved!"
              : saveStatus === "error"
              ? "Error - Try Again"
              : "Save"}
          </Button>
        </div>
      </div>
    </div>
  );
}
