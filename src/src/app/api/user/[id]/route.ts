import { NextResponse } from "next/server";

interface UserRouteParams {
    params: {
        id: number
    }
}

export function GET(req: Request, { params }: UserRouteParams) {
    return NextResponse.json({ id: params.id });
}