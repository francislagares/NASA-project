import path from 'path';
import { Request, Response } from 'express';

function get(req: Request, res: Response): void {
  if (!req.body) {
    res.status(400).json({
      success: false,
      message: 'Something went wrong!',
    });
  }
  res.sendFile(path.join(__dirname, '..', '..', 'public', 'index.html'));
}

export default {
  get,
};
