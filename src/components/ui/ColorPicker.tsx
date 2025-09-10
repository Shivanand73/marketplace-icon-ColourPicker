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

  const handleChangeComplete = (colorObj: any) => {
    setColor(colorObj.hex);
    onColorSelect(colorObj.hex);
  };

  return (
    <div className="p-6 h-screen">
      <h1 className="text-xl mb-4">🎨 Select Background Color</h1>
      <ChromePicker color={color} onChangeComplete={handleChangeComplete} />

      <div className="mt-6">
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
  );
}
