import { NextResponse } from "next/server";

interface TasksParams {
  params: {
    id: string;
  }
}
export function GET(req: Request, { params }: TasksParams) {
  const token = req.headers.get('Authorization');

  if (!token) {
    return NextResponse.json({ code: 400, message: 'Bad Request' }, { status: 400 });
  }
  
  return NextResponse.json({
    id: params.id
  });
}

export async function POST(req: Request, { params }: TasksParams) {
  const token = req.headers.get('Authorization');

  if (!token) {
    return NextResponse.json({ code: 400, message: 'Bad Request' }, { status: 400 });
  }

  return NextResponse.json({
    id: params.id
  });
}
