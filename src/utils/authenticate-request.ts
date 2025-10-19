import { JWT, USER_TYPE } from '../constant';
import jwt from 'jsonwebtoken';

// Define types for clarity
interface AuthResult {
  isAuthenticated: boolean;
  data: any;
  message?: string;
}


/**
 * Validates the request's Authorization and UiAuth headers.
 */
export const IsAuthenticated = (req: Request): AuthResult => {
  try {
    // Extract headers (case-insensitive)
    const authHeader = req.headers.get("authorization");
    const uiAuth = req.headers.get("uiauth");


    // If either header is missing, reject immediately
    if (!authHeader || !uiAuth) {
      return { isAuthenticated: false, data: null, message: "Missing required headers" };
    }

    // Validate UiAuth (frontend app key)
    if (uiAuth !== process.env.JWT_FRONTEND_AUTH) {
      return { isAuthenticated: false, data: null, message: "Invalid UiAuth key" };
    }

    // Extract token from Authorization header
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : null;

    if (!token) {
      return { isAuthenticated: false, data: null, message: "Invalid or missing token" };
    }

    // Verify JWT properly (replace with your secret key)
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);

    return { isAuthenticated: true, data: decoded };
  } catch (error: any) {
    console.error("Authentication error:", error.message);
    return { isAuthenticated: false, data: null, message: "Unauthorized or invalid token" };
  }
};

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
    if(!decodedToken?.role || decodedToken?.role !== USER_TYPE.ADMIN) {
        isAuthenticated = false;
    }

    if(!decodedToken?.frontendAuth || decodedToken?.frontendAuth !== JWT.frontendAuth) {
        isAuthenticated = false;
    }
    // For simplicity, we assume the token is valid if it exists
    return { isAuthenticated, data: decodedToken };
}