import { supabaseClient } from "../../../../lib/supabaseClient";
import {
  errorResponse,
  successResponse,
} from "../../../../lib/http/responseHandler";
import { errorHandler, HttpError } from "../../../../lib/http/httpErrors";
import { AuthResponse, LoginRequest } from "../types";

export async function POST(req: Request) {
  try {
    const { email, password }: LoginRequest = await req.json();
    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    });
    if (error)
      throw await errorHandler(
        Response.json(
          { error: { name: error.name, message: error.message } },
          { status: error.status }
        )
      );

    const authRes: AuthResponse = {
      id: data.user.id,
      email: data.user.email!,
      fullName: data.user.user_metadata.full_name,
    };
    return successResponse<AuthResponse>({ data: authRes });
  } catch (err) {
    if (err instanceof HttpError) {
      return errorResponse({ error: err, status: err.statusCode });
    }
  }
}
