import { NextResponse } from "next/server";

interface UsersParams {
  params: {
    id: string;
  }
}
export function GET(req: Request, { params }: UsersParams) {
  return NextResponse.json({
    id: params.id
  });
}
