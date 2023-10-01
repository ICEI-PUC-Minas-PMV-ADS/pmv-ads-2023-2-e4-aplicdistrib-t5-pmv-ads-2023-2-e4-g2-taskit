import { User } from "@prisma/client";

import { NextResponse } from "next/server";
import { UserService } from "../user.service";
import { sha256 } from "js-sha256";
import { useServerAuth } from "@/shared/api/useServerAuth";

interface UsersParams {
  params: {
    id: number;
  }
}
export async function GET(req: Request, { params }: UsersParams) {
  const url = new URL(req.url);
  const isAuthenticated = await useServerAuth(req);
  if (!isAuthenticated) return NextResponse.json({ message: 'Access Denied', code: 403, redirectTo: url.host + '/login' }, { status: 403 });

  const user = await UserService.Get(Number(params.id));

  if (!user) return NextResponse.json({ code: 404, message: "User not found." }, { status: 404 });

  return NextResponse.json(user);
}

export async function PUT(req: Request, { params }: UsersParams) {
  const url = new URL(req.url);
  const isAuthenticated = await useServerAuth(req);
  if (!isAuthenticated) return NextResponse.json({ message: 'Access Denied', code: 403, redirectTo: url.host + '/login' }, { status: 403 });

  const user: User = await req.json();
  if (user.password && user.password !== '') {
    user.password = sha256.hmac(user.email!.toLowerCase(), user.password);
  }

  const updatedUser = await UserService.Update({ ...user, id: Number(params.id) });
  
  if (!updatedUser) return NextResponse.json({ code: 404, message: "User not found." }, { status: 404 });

  return NextResponse.json(updatedUser);
}
