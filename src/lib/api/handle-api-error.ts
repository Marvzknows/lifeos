import { NextResponse } from "next/server";
import { AppError } from "./errors";

export function handleApiError(error: unknown) {
  if (error instanceof AppError) {
    return NextResponse.json(
      { error: error.message },
      { status: error.statusCode },
    );
  }

  console.error("Unexpected API error:", error);
  return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
}
