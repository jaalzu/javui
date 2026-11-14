import { Heading, Stack, Text } from "@javui/ui";
import { FormsShowcase } from "./showcase";

export default function FormsPage() { return <Stack gap="6"><Stack gap="2"><Text variant="label">Configuración</Text><Heading as="h1" size={1}>Preferencias de cuenta</Heading><Text size="lg" tone="muted">Actualiza la información que comparte tu equipo y define cómo quieres recibir novedades.</Text></Stack><FormsShowcase /></Stack>; }
