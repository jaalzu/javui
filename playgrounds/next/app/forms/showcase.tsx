"use client";

import {
  Button,
  Checkbox,
  Combobox,
  Field,
  Input,
  InputOTP,
  Radio,
  RadioGroup,
  Select,
  Slider,
  Stack,
  Switch,
  Textarea,
  ToastProvider,
  useToast,
} from "@javui/ui";
import type { FormEvent } from "react";

const countries = [
  { value: "ar", label: "Argentina" },
  { value: "uy", label: "Uruguay" },
  { value: "cl", label: "Chile" },
];
const timezones = countries.map(({ value, label }) => ({
  value,
  label: `America/${label}`,
}));

function FormContent() {
  const { show } = useToast();
  return (
    <form
      onSubmit={(event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        show({
          title: "Ajustes guardados",
          description: "Tu perfil fue actualizado.",
        });
      }}
    >
      <Stack gap="5">
        <Field label="Nombre" required>
        <Input defaultValue="Ada Lovelace" />
        </Field>
        <Field label="Correo" error="Usa un correo corporativo" required>
        <Input type="email" defaultValue="ada@example.com" />
        </Field>
        <Field label="Biografía" description="Una frase sobre tu trabajo">
        <Textarea defaultValue="Construyo herramientas para equipos." />
        </Field>
        <Field label="País">
        <Select items={countries} placeholder="Elige un país" />
        </Field>
        <Field label="Zona horaria">
        <Combobox
          defaultValue="America/Argentina"
          items={timezones}
          placeholder="Busca una zona"
        />
        </Field>
        <Checkbox label="Quiero recibir novedades" defaultChecked />
        <RadioGroup legend="Plan" defaultValue="starter">
        <Radio value="starter" label="Starter" />
        <Radio value="business" label="Business" />
        </RadioGroup>
        <Switch label="Notificaciones" defaultChecked />
        <Field readOnly>
        <Slider label="Volumen" defaultValue={40} />
        </Field>
        <Field label="Código de verificación" loading>
        <InputOTP length={4} />
        </Field>
        <Button type="submit" loading>
        Guardar ajustes
        </Button>
      </Stack>
    </form>
  );
}

export function FormsShowcase() {
  return (
    <ToastProvider>
      <FormContent />
    </ToastProvider>
  );
}
