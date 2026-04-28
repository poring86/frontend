export const getRestaurantBySlug = async (slug: string) => {
  const backendUrl =
    process.env.INTERNAL_API_URL ||
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:3333";

  const response = await fetch(`${backendUrl}/restaurants/${slug}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    next: {
      revalidate: 60, // Optional: Cache for 60 seconds
    },
  });

  if (!response.ok) {
    if (response.status === 404) {
      return null;
    }
    throw new Error(`Failed to fetch restaurant with slug: ${slug}`);
  }

  return response.json();
};
