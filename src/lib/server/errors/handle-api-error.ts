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
//  SAMPLE USAGE

// import { NextResponse } from "next/server";
// import { requireUser } from "@/lib/require-user";
// import { createTask } from "@/services/task-service";
// import { handleApiError } from "@/lib/handle-api-error";

// export async function POST(request: Request) {
//   const { user, response } = await requireUser();
//   if (response) return response;

//   try {
//     const body = await request.json();
//     const task = await createTask(user.id, body);
//     return NextResponse.json({ task }, { status: 201 });
//   } catch (error) {
//     return handleApiError(error);
//   }
// }
