import { NextFunction, Request, Response } from "express";
import { ControllerError } from "../../models/errors/errorTypes";
import * as ytGet from "yt-get";

export const getMP3fromYoutube = async (req: Request, res: Response, next: NextFunction) => {

	try {
		
        const postData: { link: string } = req.body;
        const base64 = await ytGet.downloadVideoAsBase64(postData.link);

        if (base64 === null) throw new ControllerError(req, "Cannot get base64 data");

		res.json({
			base64: base64
		});

	} catch (error) {
		next(error);
	}
};
