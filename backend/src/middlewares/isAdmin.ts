// src/middlewares/isAdmin.ts
import { Request, Response, NextFunction } from 'express';

export function isAdmin(req: Request, res: Response, next: NextFunction) {
  if (!req.user?.isAdmin) {
    return res.status(403).json({ error: 'Acesso negado. Somente administradores podem acessar este recurso.' });
  }
  next();
}
