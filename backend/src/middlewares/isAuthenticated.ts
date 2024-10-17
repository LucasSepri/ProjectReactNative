// src/middlewares/isAuthenticated.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  id: string;
  isAdmin: boolean;
}

export function isAuthenticated(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token não fornecido.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default-secret-key') as JwtPayload;
    req.user = { id: decoded.id, isAdmin: decoded.isAdmin }; // Adiciona o usuário ao request
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido.' });
  }
}
