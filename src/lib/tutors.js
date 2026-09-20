export async function getTutors() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tutors`, {
    next: { revalidate: 60 }, // cache 60s, avoids hammering Express on every request
  });

  if (!res.ok) {
    throw new Error("Failed to fetch tutors");
  }

  return res.json();
}

export async function getFeaturedTutors() {
  return getTutors();
}

export async function getTutorDetails(id) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tutors/${id}`, {
    next: { revalidate: 60 },
  });

  if (res.status === 404) return null;
  if (!res.ok) throw new Error("Failed to fetch tutor details");

  return res.json();
}
