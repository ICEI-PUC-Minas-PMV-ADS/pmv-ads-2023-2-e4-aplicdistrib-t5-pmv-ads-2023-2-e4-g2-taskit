import jwt from "jsonwebtoken";
import { AuthService } from "@/app/api/v1/auth/auth.service";

export async function verifyToken(req: Request) {
  const auth = req.headers?.get('Authorization');
  if (!auth) return false;

  const token = auth.replace('Bearer ', '');
  if (!token) return false;

  const decoded: any = jwt.decode(token);
  if (!decoded) return false;

  const session = await AuthService.Get(token, decoded.id);
  if (!session) return false;

  const now = new Date();
  if (session.expires < now) return false;

  return true;
}
