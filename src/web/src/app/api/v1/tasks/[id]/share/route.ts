import { NextResponse } from "next/server";
import JWT from 'jsonwebtoken';

import { verifyToken } from "@/shared/api/utils/verifyToken";
import { TaskService } from "../../task.service";

interface TasksParams {
  params: {
    id: string;
  }
}
export async function PUT(req: Request, { params }: TasksParams) {
  /** Check Token Validity */
  const token = req.headers?.get('Authorization')?.split('Bearer ')[1]!;
  const tokenUser: any = JWT.decode(token);
  try {
    JWT.verify(token, tokenUser.email);
  } catch (err) {
    return NextResponse.json({ code: 401, message: "Access Denied" }, { status: 401 });
  }
  const url = new URL(req.url);
  const isAuthenticated = await verifyToken(req);
  if (!isAuthenticated) return NextResponse.json({ message: 'Access Denied', code: 401, redirectTo: url.host + '/login' }, { status: 401 });
  /** End of Check Token Validity */

  const { userId, permission } = await req.json();
  if (!userId || !permission) return NextResponse.json({ code: 400, message: "Bad Request" }, { status: 400 });

  try {
    if (permission === 'edit') {
      const updatedTask = await TaskService.AddToShareEdit(params.id, tokenUser.id, userId);
      return NextResponse.json(updatedTask, { status: 200 });
    }
    const updatedTask = await TaskService.AddToShareView(params.id, tokenUser.id, userId);
    return NextResponse.json(updatedTask, { status: 200 });
  } catch (err) {
    return NextResponse.json({ code: 404, message: "Task not found." }, { status: 404 });
  }
}

export async function PATCH(req: Request, { params }: TasksParams) {
  /** Check Token Validity */
  const token = req.headers?.get('Authorization')?.split('Bearer ')[1]!;
  const tokenUser: any = JWT.decode(token);
  try {
    JWT.verify(token, tokenUser.email);
  } catch (err) {
    return NextResponse.json({ code: 401, message: "Access Denied" }, { status: 401 });
  }
  const url = new URL(req.url);
  const isAuthenticated = await verifyToken(req);
  if (!isAuthenticated) return NextResponse.json({ message: 'Access Denied', code: 401, redirectTo: url.host + '/login' }, { status: 401 });
  /** End of Check Token Validity */

  const { userId, permission } = await req.json();
  if (!userId || !permission) return NextResponse.json({ code: 400, message: "Bad Request" }, { status: 400 });

  try {
    if (permission === 'edit') {
      const updatedTask = await TaskService.RemoveFromShareEdit(params.id, tokenUser.id, userId);
      return NextResponse.json(updatedTask, { status: 200 });
    }
    const updatedTask = await TaskService.RemoveFromShareView(params.id, tokenUser.id, userId);
    return NextResponse.json(updatedTask, { status: 200 });
  } catch (err) {
    return NextResponse.json({ code: 404, message: "Task not found." }, { status: 404 });
  }
}
