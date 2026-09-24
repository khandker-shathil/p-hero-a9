import "server-only";

import { MongoClient, ObjectId } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db("mediaqueue");
const tutors = db.collection("tutors");

const fields = [
  "name", "photo", "subject", "availableDays", "availableTime",
  "hourlyFee", "totalSlot", "sessionStartDate", "institution",
  "experience", "location", "teachingMode",
];

function validateTutor(data) {
  const required = ["name", "subject", "availableDays", "availableTime", "hourlyFee", "totalSlot", "sessionStartDate", "institution", "experience", "location", "teachingMode"];
  for (const field of required) {
    if (data[field] === undefined || data[field] === null || data[field] === "") {
      throw new Error(`${field} is required.`);
    }
  }

  const hourlyFee = Number(data.hourlyFee);
  const totalSlot = Number(data.totalSlot);
  const experience = Number(data.experience);
  const sessionStartDate = new Date(data.sessionStartDate);

  if (!Number.isFinite(hourlyFee) || hourlyFee < 0) throw new Error("Hourly fee must be a valid positive number.");
  if (!Number.isInteger(totalSlot) || totalSlot < 0) throw new Error("Total slots must be zero or a positive whole number.");
  if (!Number.isFinite(experience) || experience < 0) throw new Error("Experience must be zero or a positive number.");
  if (Number.isNaN(sessionStartDate.getTime())) throw new Error("Session start date is invalid.");

  return {
    name: String(data.name).trim(),
    photo: String(data.photo || "").trim(),
    subject: String(data.subject).trim(),
    availableDays: String(data.availableDays).trim(),
    availableTime: String(data.availableTime).trim(),
    hourlyFee,
    totalSlot,
    sessionStartDate,
    institution: String(data.institution).trim(),
    experience,
    location: String(data.location).trim(),
    teachingMode: String(data.teachingMode).trim(),
  };
}

function tutorId(id) {
  if (!ObjectId.isValid(id)) throw new Error("Invalid tutor ID.");
  return new ObjectId(id);
}

export async function createTutor(data, user) {
  const tutor = validateTutor(data);
  const now = new Date();
  const result = await tutors.insertOne({
    ...tutor,
    ownerId: user.id,
    ownerName: user.name,
    ownerEmail: user.email,
    createdAt: now,
    updatedAt: now,
  });

  return { _id: result.insertedId, ...tutor };
}

export async function getTutorsByOwner(ownerId) {
  return tutors.find({ ownerId }).sort({ createdAt: -1 }).toArray();
}

export async function searchTutors({ name = "", startDate = "", endDate = "" } = {}) {
  const query = {};
  if (name.trim()) query.name = { $regex: name.trim(), $options: "i" };

  if (startDate || endDate) {
    query.sessionStartDate = {};
    if (startDate) query.sessionStartDate.$gte = new Date(`${startDate}T00:00:00.000Z`);
    if (endDate) query.sessionStartDate.$lte = new Date(`${endDate}T23:59:59.999Z`);
  }

  return tutors.find(query).sort({ createdAt: -1 }).toArray();
}

export async function updateTutor(id, data, ownerId) {
  const result = await tutors.findOneAndUpdate(
    { _id: tutorId(id), ownerId },
    { $set: { ...validateTutor(data), updatedAt: new Date() } },
    { returnDocument: "after" }
  );

  if (!result) throw new Error("Tutor not found or you do not have permission to edit it.");
  return result;
}

export async function deleteTutor(id, ownerId) {
  const result = await tutors.deleteOne({ _id: tutorId(id), ownerId });
  if (result.deletedCount === 0) throw new Error("Tutor not found or you do not have permission to delete it.");
}

export async function findTutorById(id) {
  if (!ObjectId.isValid(id)) return null;
  return tutors.findOne({ _id: new ObjectId(id) });
}
