"use client";

import {
  Alert,
  Badge,
  Button,
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Checkbox,
  Combobox,
  DescriptionList,
  DescriptionListDetails,
  DescriptionListTerm,
  Field,
  Grid,
  Input,
  InputOTP,
  Radio,
  RadioGroup,
  Select,
  Slider,
  Stack,
  Switch,
  Separator,
  Text,
  Textarea,
  Toast,
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
      <Grid minColumnWidth="22rem" gap="5">
      <Card as="section" variant="surface"><CardHeader><div><CardTitle>Perfil público</CardTitle><CardDescription>Esta información aparece para las personas de tu espacio.</CardDescription></div><CardAction><Badge variant="success">Activo</Badge></CardAction></CardHeader><CardContent><Stack gap="5">
        <Grid minColumnWidth="14rem" gap="4"><Field label="Nombre" required>
        <Input defaultValue="Ada Lovelace" />
        </Field><Field label="Correo" error="Usa un correo corporativo" required>
        <Input type="email" defaultValue="ada@example.com" />
        </Field></Grid>
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
        <Separator />
        <Checkbox label="Quiero recibir novedades" defaultChecked />
        <RadioGroup legend="Plan de facturación" defaultValue="business">
        <Radio value="starter" label="Starter" />
        <Radio value="business" label="Business" />
        </RadioGroup>
      </Stack></CardContent><CardFooter><Button type="submit">Guardar cambios</Button><Text size="sm" tone="muted">Los cambios se guardan para todo tu perfil.</Text></CardFooter></Card>
      <Stack gap="5">
      <Card as="section" variant="surface" size="sm"><CardHeader><CardTitle>Notificaciones</CardTitle><CardDescription>Elige qué actividad requiere tu atención.</CardDescription></CardHeader><CardContent><Stack gap="4"><Switch label="Notificaciones de equipo" defaultChecked /><Switch label="Resumen semanal" defaultChecked /><Switch label="Alertas de facturación" /><Field readOnly>
        <Slider label="Volumen de alertas" defaultValue={40} />
        </Field></Stack></CardContent></Card>
      <Card as="section" variant="surface" size="sm"><CardHeader><CardTitle>Seguridad</CardTitle><CardDescription>Completa la verificación de dos pasos para proteger la cuenta.</CardDescription></CardHeader><CardContent><Stack gap="4"><Alert tone="warning" title="Verificación pendiente">Confirma el código enviado a tu correo de trabajo.</Alert><Field label="Código de verificación">
        <InputOTP length={4} />
        </Field><DescriptionList layout="horizontal"><DescriptionListTerm>Último acceso</DescriptionListTerm><DescriptionListDetails>Hoy, 09:42</DescriptionListDetails><DescriptionListTerm>Dispositivos</DescriptionListTerm><DescriptionListDetails>3 activos</DescriptionListDetails></DescriptionList></Stack></CardContent></Card>
      </Stack>
      </Grid>
    </form>
  );
}

export function FormsShowcase() {
  return (
    <Toast>
      <FormContent />
    </Toast>
  );
}
