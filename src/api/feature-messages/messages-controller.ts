import { Request, Response } from 'express';
import { Message } from './messages-model';

export const getAllMessages = async (req: Request, res: Response) => {
    try {
        const messageExample: Message = {
            id: 4549,
            sender: "agustin.wet@gmail.com",
            recipient: "antonella.godoy@gmail.com",
            content: "I love you <3",
            createdAt: new Date(),
            lastEdited: null,
        }
        
        // Send the users as the response
        res.status(200).json(messageExample);
    } catch (err) {
        res.status(500).send('Internal Server Error');
    }
}

