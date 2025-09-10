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
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{ backgroundColor: color }}
    >
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md flex flex-col items-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          🎨 Select Background Color
        </h1>

        <ChromePicker color={color} onChange={handleChange} />

        <div className="mt-6 flex flex-col items-center">
          <span className="font-bold text-gray-700 text-lg mb-2">
            Selected Color:
          </span>
          <div
            className="w-20 h-20 rounded-lg border-2 border-gray-400"
            style={{ backgroundColor: color }}
            title={color}
          />
          <span className="mt-2 text-md font-semibold text-gray-600">{color}</span>
        </div>

        <div className="mt-8">
          <Button
            onClick={onSave}
            disabled={saveStatus === "saving" || saveStatus === "saved"}
            className={`
              px-8 py-3 text-lg font-semibold rounded-md transition-colors duration-300
              ${
                saveStatus === "saving"
                  ? "bg-blue-400 cursor-wait"
                  : saveStatus === "saved"
                  ? "bg-green-500 hover:bg-green-600"
                  : saveStatus === "error"
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-blue-600 hover:bg-blue-700"
              }
              ${saveStatus === "saving" || saveStatus === "saved" ? "cursor-not-allowed" : "cursor-pointer"}
            `}
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
