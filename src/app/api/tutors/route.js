import { auth } from "@/lib/auth";
import { createTutor, searchTutors } from "@/lib/managed-tutors";
import { headers } from "next/headers";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const startDate = searchParams.get("startDate") || "";
  const endDate = searchParams.get("endDate") || "";

  if ((startDate && Number.isNaN(new Date(startDate).getTime())) || (endDate && Number.isNaN(new Date(endDate).getTime()))) {
    return Response.json({ message: "Invalid date filter." }, { status: 400 });
  }

  const tutors = await searchTutors({ name: searchParams.get("name") || "", startDate, endDate });
  return Response.json(tutors);
}

export async function POST(request) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return Response.json({ message: "Please log in first." }, { status: 401 });

  try {
    const tutor = await createTutor(await request.json(), session.user);
    return Response.json(tutor, { status: 201 });
  } catch (error) {
    return Response.json({ message: error.message || "Could not create tutor." }, { status: 400 });
  }
}
