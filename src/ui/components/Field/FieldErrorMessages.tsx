import { WarningIcon } from "../../icons/icons.generated";

export function FieldErrorMessages({ errors }: { errors: string[] }) {
  return (
    <>
      <WarningIcon size="sm" />
      {errors.length === 1 ? <span>{errors[0]}</span> : <ul>{errors.map((error) => <li key={error}>{error}</li>)}</ul>}
    </>
  );
}
