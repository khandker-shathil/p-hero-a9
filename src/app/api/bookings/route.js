import { auth } from "@/lib/auth";
import { createBooking } from "@/lib/bookings";
import { headers } from "next/headers";

export async function POST(request) {
  // 1. Get the logged-in user
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return Response.json(
      { message: "Please log in before booking." },
      { status: 401 }
    );
  }

  // 2. Get the tutor ID sent by the Book button
  const { tutorId } = await request.json();

  try {
    // 3. Send BOTH IDs to your booking library
    const booking = await createBooking({
      userId: session.user.id,
      tutorId: tutorId,
    });

    return Response.json(booking, { status: 201 });
  } catch (error) {
    return Response.json(
      { message: error.message },
      { status: 400 }
    );
  }
}