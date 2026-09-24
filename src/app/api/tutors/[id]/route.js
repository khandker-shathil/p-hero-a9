import { auth } from "@/lib/auth";
import { deleteTutor, updateTutor } from "@/lib/managed-tutors";
import { headers } from "next/headers";

async function currentUser() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) throw new Error("Please log in first.");
  return session.user;
}

export async function PATCH(request, { params }) {
  try {
    const user = await currentUser();
    const { id } = await params;
    const tutor = await updateTutor(id, await request.json(), user.id);
    return Response.json(tutor);
  } catch (error) {
    const status = error.message === "Please log in first." ? 401 : 400;
    return Response.json({ message: error.message || "Could not update tutor." }, { status });
  }
}

export async function DELETE(_request, { params }) {
  try {
    const user = await currentUser();
    const { id } = await params;
    await deleteTutor(id, user.id);
    return Response.json({ success: true });
  } catch (error) {
    const status = error.message === "Please log in first." ? 401 : 400;
    return Response.json({ message: error.message || "Could not delete tutor." }, { status });
  }
}
