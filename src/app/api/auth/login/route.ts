import { supabaseClient } from "@/lib/supabaseClient";
import { LoginRequest } from "../types";
import { errorResponse, successResponse } from "@/lib/http/responseHandler";
import { BadRequestError, HttpError } from "@/lib/http/httpErrors";

export async function POST(req: Request, res: Response) {
  try {
    const { email, password }: LoginRequest = await req.json();
    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    });
    console.log("Error POST::: ", error);
    if (error) throw new BadRequestError(error?.message);
    // if (error) return Response.json(error, { status: error.status });

    return successResponse({ data });
  } catch (err) {
    if (err instanceof HttpError) {
      return errorResponse({ error: err, status: err.statusCode });
    }
  }
}
