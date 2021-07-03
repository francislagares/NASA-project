import path from 'path';
import { Request, Response } from 'express';

function get(req: Request, res: Response): void {
  res.sendFile(path.join(__dirname, '..', '..', 'public', 'index.html'));
}

export default {
  get,
};
