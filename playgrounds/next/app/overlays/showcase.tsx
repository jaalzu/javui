"use client";
import { Button, Menu, Modal, ModalClose, ModalContent, ModalTrigger, Popover, PopoverContent, PopoverTrigger, Sheet, Stack, Text, Tooltip } from "@javui/ui";
export function OverlayShowcase() { return <Stack direction="row" gap="3" wrap align="center">
  <Modal><ModalTrigger>Open dialog</ModalTrigger><ModalContent title="Confirmación" closeLabel="Cerrar diálogo" actions={<ModalClose>Cerrar</ModalClose>}>¿Quieres continuar?</ModalContent></Modal>
  <Modal role="alertdialog" color="critical" description="Esta acción no se puede deshacer."><ModalTrigger variant="danger">Eliminar</ModalTrigger><ModalContent title="¿Eliminar proyecto?" closeLabel="Cerrar confirmación" actions={<><ModalClose>Cancelar</ModalClose><ModalClose variant="danger">Eliminar</ModalClose></>}/></Modal>
  <Sheet trigger="Open sheet" closeLabel="Cerrar panel" title="Panel lateral" description="Opciones secundarias."><Text>Contenido del panel.</Text></Sheet>
  <Popover><PopoverTrigger variant="outline">Open popover</PopoverTrigger><PopoverContent title="Información" description="Detalles contextuales."><Text>Información contextual.</Text></PopoverContent></Popover>
  <Menu label="Open menu" items={[{ label: "Editar" }, { label: "Archivar" }]} />
  <Tooltip content="Ayuda"><Button aria-label="Ayuda">?</Button></Tooltip>
</Stack>; }
