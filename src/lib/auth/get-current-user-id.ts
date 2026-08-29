import { NextRequest } from "next/server";
import { ForbiddenError } from "../server/errors/errors";

export function getCurrentUserId(req: NextRequest): string {
  const userId = req.headers.get("x-user-id");
  if (!userId) throw new ForbiddenError("Not authenticated");
  return userId;
}
