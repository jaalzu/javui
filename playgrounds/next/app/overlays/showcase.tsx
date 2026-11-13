"use client";
import { Button, Menu, Modal, Popover, Sheet, Stack, Text, Tooltip } from "@javui/ui";
export function OverlayShowcase() { return <Stack gap="4">
  <Modal><Modal.Trigger><Button>Open dialog</Button></Modal.Trigger><Modal.Content closeLabel="Cerrar"><Modal.Title>Confirmación</Modal.Title><Text>¿Quieres continuar?</Text><Modal.Close><Button>Cerrar</Button></Modal.Close></Modal.Content></Modal>
  <Sheet><Sheet.Trigger><Button variant="secondary">Open sheet</Button></Sheet.Trigger><Sheet.Content closeLabel="Cerrar"><Sheet.Title>Panel lateral</Sheet.Title><Text>Contenido del panel.</Text></Sheet.Content></Sheet>
  <Popover><Popover.Trigger><Button variant="outline">Open popover</Button></Popover.Trigger><Popover.Content><Text>Información contextual.</Text></Popover.Content></Popover>
  <Menu><Menu.Trigger><Button variant="ghost">Open menu</Button></Menu.Trigger><Menu.Positioner><Menu.Popup><Menu.Item>Editar</Menu.Item><Menu.Item>Archivar</Menu.Item></Menu.Popup></Menu.Positioner></Menu>
  <Tooltip.Provider><Tooltip><Tooltip.Trigger render={<Button aria-label="Ayuda">?</Button>} /><Tooltip.Content>Ayuda</Tooltip.Content></Tooltip></Tooltip.Provider>
</Stack>; }
