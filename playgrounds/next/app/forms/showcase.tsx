"use client";

import { Button, Checkbox, Combobox, Field, Input, InputOTP, Radio, RadioGroup, Select, Slider, Spinner, Stack, Switch, Textarea, ToastProvider, useToast } from "@javui/ui";

const countries = [{ value: "ar", label: "Argentina" }, { value: "uy", label: "Uruguay" }, { value: "cl", label: "Chile" }];
const timezones = countries.map(({ value, label }) => ({ value, label: `America/${label}` }));

function FormContent() {
  const { show } = useToast();
  return <Stack gap="5" as="form" onSubmit={(event) => { event.preventDefault(); show({ title: "Ajustes guardados", description: "Tu perfil fue actualizado." }); }}>
    <Field label="Nombre" required><Input defaultValue="Ada Lovelace" /></Field>
    <Field label="Correo" error="Usa un correo corporativo" required><Input type="email" defaultValue="ada@example.com" /></Field>
    <Field label="Biografía" description="Una frase sobre tu trabajo"><Textarea defaultValue="Construyo herramientas para equipos." /></Field>
    <Field label="País"><Select items={countries} placeholder="Elige un país" /></Field>
    <Field label="Zona horaria"><Combobox defaultValue="America/Argentina" items={timezones} placeholder="Busca una zona" /></Field>
    <Checkbox label="Quiero recibir novedades" defaultChecked />
    <RadioGroup legend="Plan" defaultValue="starter"><Radio value="starter" label="Starter" /><Radio value="business" label="Business" /></RadioGroup>
    <Switch label="Notificaciones" defaultChecked />
    <Field label="Volumen" readOnly><Slider label="Volumen" defaultValue={40} readOnly /></Field>
    <Field label="Código de verificación" loading><InputOTP length={4} /></Field>
    <Button type="submit" loading startIcon={<Spinner />}>Guardar ajustes</Button>
  </Stack>;
}

export function FormsShowcase() { return <ToastProvider><FormContent /></ToastProvider>; }
