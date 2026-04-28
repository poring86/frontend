import { Restaurant } from "./types";

export const getRestaurants = async (): Promise<Restaurant[]> => {
  const backendUrl =
    process.env.INTERNAL_API_URL ||
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:3333";

  const response = await fetch(`${backendUrl}/restaurants`, {
    next: {
      revalidate: 10,
    },
  });

  if (!response.ok) {
    return [];
  }

  return response.json();
};
