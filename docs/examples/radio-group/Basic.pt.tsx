import { useState } from "react";
import { RadioGroup } from "@prumo";

export default function Basic() {
  const [value, setValue] = useState("comfortable");
  return (
    <RadioGroup
      legend="Densidade da tabela"
      name="density"
      value={value}
      onValueChange={setValue}
      options={[
        { value: "comfortable", label: "Confortável", description: "Mais fácil de ler." },
        { value: "compact", label: "Compacta", description: "Mais linhas na tela." },
      ]}
    />
  );
}
