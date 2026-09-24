import "server-only";

import { MongoClient, ObjectId } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db("mediaqueue");

// This is a named export, so the route can use:
// import { createBooking } from "@/lib/bookings";
export async function createBooking({ userId, tutorId }) {
  if (!userId) {
    throw new Error("Please log in before booking.");
  }

  if (!ObjectId.isValid(tutorId)) {
    throw new Error("Invalid tutor ID.");
  }

  const tutors = db.collection("tutors");
  const bookings = db.collection("bookings");
  const tutorObjectId = new ObjectId(tutorId);

  // Only reduce the slot when at least one is available.
  const tutor = await tutors.findOneAndUpdate(
    { _id: tutorObjectId, totalSlot: { $gt: 0 } },
    { $inc: { totalSlot: -1 } },
    { returnDocument: "after" }
  );

  if (!tutor) {
    throw new Error("This tutor is fully booked.");
  }

  const booking = {
    userId,
    tutorId: tutor._id,
    status: "confirmed",
    createdAt: new Date(),
  };

  try {
    await bookings.insertOne(booking);
    return booking;
  } catch (error) {
    // Put the slot back if saving the booking fails.
    await tutors.updateOne(
      { _id: tutorObjectId },
      { $inc: { totalSlot: 1 } }
    );
    throw error;
  }
}

export async function getBookingsForUser(userId) {
  if (!userId) return [];

  return db
    .collection("bookings")
    .aggregate([
      { $match: { userId } },
      {
        $lookup: {
          from: "tutors",
          localField: "tutorId",
          foreignField: "_id",
          as: "tutor",
        },
      },
      { $unwind: { path: "$tutor", preserveNullAndEmptyArrays: true } },
      { $sort: { createdAt: -1 } },
    ])
    .toArray();
}

export async function cancelBooking({ bookingId, userId }) {
  if (!userId) throw new Error("Please log in before cancelling a booking.");
  if (!ObjectId.isValid(bookingId)) throw new Error("Invalid booking ID.");

  const bookings = db.collection("bookings");
  const tutors = db.collection("tutors");
  const bookingObjectId = new ObjectId(bookingId);

  // A user can cancel only their own confirmed booking.
  const booking = await bookings.findOneAndUpdate(
    { _id: bookingObjectId, userId, status: "confirmed" },
    { $set: { status: "cancelled", cancelledAt: new Date(), updatedAt: new Date() } },
    { returnDocument: "before" }
  );

  if (!booking) throw new Error("Confirmed booking not found.");

  try {
    const tutorUpdate = await tutors.updateOne(
      { _id: booking.tutorId },
      { $inc: { totalSlot: 1 } }
    );

    if (tutorUpdate.matchedCount === 0) throw new Error("Tutor not found.");
  } catch (error) {
    // Keep the booking confirmed if its slot could not be restored.
    await bookings.updateOne(
      { _id: bookingObjectId },
      { $set: { status: "confirmed" }, $unset: { cancelledAt: "", updatedAt: "" } }
    );
    throw error;
  }
}
