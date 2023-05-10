export type Message = {
    id: number;
    sender: string;
    recipient: string;
    content: string;
    createdAt: Date;
    lastEdited: Date | null;
};