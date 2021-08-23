import { Request, Response, NextFunction } from "express";

export function requestLogger(req: Request, res: Response, next: NextFunction) {
    const params: any = {};
    if (Object.keys(req.query).length !== 0 && req.query.constructor === Object) params["query"] = req.query;
    if (Object.keys(req.body).length !== 0 && req.body.constructor === Object) params["body"] = req.body;
    if (Object.keys(req.params).length !== 0 && req.params.constructor === Object) params["params"] = req.params;
    req.logger.info({params}, req.method, req.path);
    res.setHeader('X-Powered-By', 'Oracle OCI: [exadata-2]');
    return next();
}
