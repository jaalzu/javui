import { Badge } from "@/ui";
import { ex, type Example } from "@/docs/example";

export const examples: Example[] = [
    ex("Default", `<Badge>Draft</Badge>`, <Badge>Draft</Badge>),
    ex("Success", `<Badge variant="success">Active</Badge>`, <Badge variant="success">Active</Badge>),
    ex("Danger", `<Badge variant="danger">Failed</Badge>`, <Badge variant="danger">Failed</Badge>),
    ex("Brand", `<Badge variant="brand">Beta</Badge>`, <Badge variant="brand">Beta</Badge>),
    ex("Inverted", `<Badge variant="inverted">New</Badge>`, <Badge variant="inverted">New</Badge>),
    ex("Outline", `<Badge variant="outline">3 sources</Badge>`, <Badge variant="outline">3 sources</Badge>),
];
