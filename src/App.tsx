import { useState } from "react";
import { useMarketplaceClient } from "./utils/hooks/useMarketplaceClient";
import { ColorPicker } from "./components/ui/ColorPicker";

function App() {
  const { client } = useMarketplaceClient();
  const [color, setColor] = useState<string>("#ffffff");
  const [saveStatus, setSaveStatus] = useState<
    "idle" | "saving" | "saved" | "error"
  >("idle");

  const handleSave = async () => {
    setSaveStatus("saving");
    try {
      await client?.setValue(color, true);
      setSaveStatus("saved");
      setTimeout(() => client?.closeApp(), 1000);
    } catch {
      setSaveStatus("error");
      setTimeout(() => setSaveStatus("idle"), 3000);
    }
  };

  return (
    <ColorPicker
      initialColor={color}
      onColorSelect={setColor}
      onSave={handleSave}
      saveStatus={saveStatus}
    />
  );
}

export default App;
