import jwt from 'jsonwebtoken';

export function generateToken(userId: string | null) {
    const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
    return jwt.sign(
        { id: userId },
        JWT_SECRET
    );
}