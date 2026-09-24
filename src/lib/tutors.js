import "server-only";

import { cache } from "react";
import { findTutorById, searchTutors } from "./managed-tutors";

// Convert BSON IDs and dates before passing tutor data to client components.
function serializeTutor(tutor) {
  return JSON.parse(JSON.stringify(tutor));
}

export const getTutors = cache(async () => {
  const tutors = await searchTutors();
  return tutors.map(serializeTutor);
});

export const getFeaturedTutors = getTutors;

export const getTutorDetails = cache(async (id) => {
  const tutor = await findTutorById(id);
  return tutor ? serializeTutor(tutor) : null;
});
