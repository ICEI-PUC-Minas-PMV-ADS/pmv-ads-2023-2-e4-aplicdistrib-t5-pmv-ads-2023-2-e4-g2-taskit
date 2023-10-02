import { NextResponse } from "next/server";
import JWT from 'jsonwebtoken';

import { useServerAuth } from "@/shared/api/useServerAuth";
import { TaskService } from "./task.service";

export async function POST(req: Request) {
  const url = new URL(req.url);
  const isAuthenticated = await useServerAuth(req);
  if (!isAuthenticated) return NextResponse.json({ message: 'Access Denied', code: 401, redirectTo: url.host + '/login' }, { status: 401 });  
  
  try {
    const token = req.headers?.get('Authorization')?.split('Bearer ')[1]!;
    const user: any = JWT.decode(token);
    JWT.verify(token, user.email);
  } catch (err) {
    return NextResponse.json({ code: 401, message: "Invalid Token" }, { status: 401 });
  }

  const task = await req.json();
  if (!task || !task.ownerId) return NextResponse.json({ code: 400, message: "Bad Request" }, { status: 400 });

  const createdTask = await TaskService.Create(task);
  return NextResponse.json(createdTask);
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const isAuthenticated = await useServerAuth(req);
  if (!isAuthenticated) return NextResponse.json({ message: 'Access Denied', code: 401, redirectTo: url.host + '/login' }, { status: 401 });
  
  const token = req.headers?.get('Authorization')?.split('Bearer ')[1]!;
  const user: any = JWT.decode(token);

  try {
    JWT.verify(token, user.email);
  } catch (err) {
    return NextResponse.json({ code: 401, message: "Invalid Token" }, { status: 401 });
  }
  
  if (!user.id) return NextResponse.json({ code: 400, message: "Bad Request" }, { status: 400 });

  const task = await TaskService.List(Number(user.id));
  if (!task || task.length === 0) return NextResponse.json({ code: 204, message: "There are no tasks for this user." }, { status: 204 });
  
  return NextResponse.json(task);
}
