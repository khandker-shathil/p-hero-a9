import { auth } from "@/lib/auth";
import { cancelBooking } from "@/lib/bookings";
import { headers } from "next/headers";

export async function PATCH(_request, { params }) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return Response.json({ message: "Please log in first." }, { status: 401 });

  try {
    const { id } = await params;
    await cancelBooking({ bookingId: id, userId: session.user.id });
    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ message: error.message || "Could not cancel booking." }, { status: 400 });
  }
}
