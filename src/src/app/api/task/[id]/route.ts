import { NextResponse } from "next/server";

interface TaskRouteParams {
    params: {
        id: number
    }
}

export function GET(req: Request, { params }: TaskRouteParams) {
    return NextResponse.json({ id: params.id });
}