import { Alert, Button } from "@prumo";

export default function WithAction() {
  return (
    <Alert tone="warning" title="3 documents have no receipt" action={<Button size="sm">Review</Button>}>
      They cannot be included in the report until a receipt is attached.
    </Alert>
  );
}
