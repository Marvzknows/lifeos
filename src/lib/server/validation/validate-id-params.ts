import { z } from "zod";
import { NotFoundError } from "../errors/errors";

const idSchema = z.string().uuid();

export function validateIdParam(id: string, entityName = "Resource"): string {
    const result = idSchema.safeParse(id);
    if (!result.success) {
        throw new NotFoundError(`${entityName} not found`);
    }
    return result.data;
}