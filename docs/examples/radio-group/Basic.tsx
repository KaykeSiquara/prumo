import { useState } from "react";
import { RadioGroup } from "@prumo";

export default function Basic() {
  const [value, setValue] = useState("comfortable");
  return (
    <RadioGroup
      legend="Table density"
      name="density"
      value={value}
      onValueChange={setValue}
      options={[
        { value: "comfortable", label: "Comfortable", description: "Easier to scan." },
        { value: "compact", label: "Compact", description: "More rows on screen." },
      ]}
    />
  );
}
