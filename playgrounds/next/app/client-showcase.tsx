"use client";

import { Button, Field, Input, Modal, ModalClose, ModalContent, ModalTrigger, Select, SelectContent, SelectItem, SelectTrigger } from "@javui/ui";

export default function ClientShowcase() {
  return <section><Button>Client button</Button><Field label="Name"><Input /></Field><Select defaultValue="one"><SelectTrigger aria-label="Choice">Choose</SelectTrigger><SelectContent><SelectItem value="one">One</SelectItem></SelectContent></Select><Modal><ModalTrigger>Open modal</ModalTrigger><ModalContent title="Consumer modal" actions={<ModalClose>Close</ModalClose>}>Client content</ModalContent></Modal></section>;
}
