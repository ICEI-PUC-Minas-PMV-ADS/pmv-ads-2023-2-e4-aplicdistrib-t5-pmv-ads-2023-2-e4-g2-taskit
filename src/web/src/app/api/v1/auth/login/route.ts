import { sha256 } from "js-sha256";
import { UserService } from "../../users/user.service";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const user: any = await req.json();

  if (!user.email || !user.password) return NextResponse.json({ code: 400, message: "Bad Request" }, { status: 400 });

  const hash = sha256.hmac(user.email.toLowerCase(), user.password);
  const login = await UserService.Login(user.email, hash);

  if (!login) return NextResponse.json({ code: 401, message: "Invalid Credentials" }, { status: 401 });  

  return NextResponse.json(login);
}
