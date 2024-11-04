import { supabaseClient } from "@/lib/supabaseClient";
import { LoginRequest } from "../types";

export async function POST(req: Request, res: Response) {
  try {
    const { email, password }: LoginRequest = await req.json();
    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      const errorBody = JSON.stringify({ message: error.message });
      return new Response(errorBody, { status: error.status });
    }

    return Response.json(data);
  } catch (err) {
    console.log(err);
  }
}
