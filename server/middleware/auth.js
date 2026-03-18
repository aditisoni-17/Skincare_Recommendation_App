import jwt from 'jsonwebtoken';

export function requireAuth(req, res, next) {
  const header = req.headers.authorization || '';
  const [, token] = header.split(' ');
  if (!token) return res.status(401).json({ error: 'Missing token' });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'dev-secret');
    req.user = { id: payload.sub };
    return next();
  } catch {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

