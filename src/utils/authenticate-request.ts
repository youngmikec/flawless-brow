import { JWT, USER_TYPE } from '@/constant';
import jwt from 'jsonwebtoken';

export const IsAuthenticated = (req: Request): { isAuthenticated: boolean, data: any } => {
    const authHeader = req.headers.get('Authorization');
    let isAuthenticated: boolean = true;
    let decodedToken: any;
    if (!authHeader) {
        isAuthenticated = false;
    }

    const token: any = authHeader && authHeader.split(' ')[1];
    if (!token) {
        isAuthenticated = false;
    }

    // Here you would typically verify the token with your authentication service
    decodedToken = jwt.decode(token);
    if (!decodedToken) {
        isAuthenticated = false;
    }

    if(!decodedToken.frontendAuth || decodedToken.frontendAuth !== JWT.frontendAuth) {
        isAuthenticated = false;
    }
    // For simplicity, we assume the token is valid if it exists
    return { isAuthenticated, data: decodedToken };
}

function isTokenValid(token: string, secret: string): boolean {
  try {
    jwt.verify(token, secret); // throws error if expired or invalid
    return true;
  } catch (err) {
    return false;
  }
}

export const IsValidAdmin = (req: Request): { isAuthenticated: boolean, data: any } => {
    const authHeader: any = req.headers.get('Authorization');
    let isAuthenticated: boolean = true;
    let decodedToken: any;
    if (!authHeader) {
        isAuthenticated = false;
    }

    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        isAuthenticated = false;
    }

    if(!isTokenValid(token, JWT.jwtSecret)) {
        isAuthenticated = false;
    }

    // Here you would typically verify the token with your authentication service
    decodedToken = jwt.decode(token);
    if (!decodedToken) {
        isAuthenticated = false;
    }
    if(!decodedToken.role || decodedToken.role !== USER_TYPE.ADMIN) {
        isAuthenticated = false;
    }

    if(!decodedToken.frontendAuth || decodedToken.frontendAuth !== JWT.frontendAuth) {
        isAuthenticated = false;
    }
    // For simplicity, we assume the token is valid if it exists
    return { isAuthenticated, data: decodedToken };
}