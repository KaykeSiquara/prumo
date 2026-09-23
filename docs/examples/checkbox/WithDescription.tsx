import { Checkbox } from "@prumo";

export default function WithDescription() {
  return (
    <Checkbox label="Email me when a document is due" description="One message per day, at 8 am, only when something is due." defaultChecked />
  );
}
