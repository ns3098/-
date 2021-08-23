// In Case you need to add some extra property in Request or Response context.
// add PropertyName and its type then Access it using Request.yourProperty

import * as express from 'express';

declare global {
  namespace Express {
    export interface Request {
      logger?: any;
    }
  }
}
