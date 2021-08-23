import {Router} from 'express';
import HttpError from "../../error";
import {NextFunction, Request, Response} from 'express';
/**
 * @constant {express.Router}
 */
const router: Router = Router();

export async function fun(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        res.status(200).json({result: 'ok'});
    } catch (error) {
        next(new HttpError(error.message.status, error.message));
    }
}

router.get('/', fun);


export default router;
