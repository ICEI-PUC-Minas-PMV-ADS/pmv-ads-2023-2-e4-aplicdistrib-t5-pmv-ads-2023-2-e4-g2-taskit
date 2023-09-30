import { sha256 } from "js-sha256";
import { UserService } from "../../users/user.service";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { AuthService } from "../auth.service";

export async function POST(req: Request) {
  const { email, password, sessionId }: any = await req.json();

  if (!email || !password) return NextResponse.json({ code: 400, message: "Bad Request" }, { status: 400 });

  const hash = sha256.hmac(email.toLowerCase(), password);
  const user = await UserService.Login(email, hash);

  if (!user) return NextResponse.json({ code: 401, message: "Invalid Credentials" }, { status: 401 });

  const token = jwt.sign({ id: user.id, name: user.name, email: user.email }, email, { expiresIn: "336h" });

  const session = await AuthService.Create({ id: sessionId, sessionToken: token, userId: user.id, expires: new Date(Date.now() + 336 * 60 * 60 * 1000) });

  return NextResponse.json({ id: session.id, token: session.sessionToken, expires: session.expires });
}
