export const getOrders = async (cpf: string) => {
  const backendUrl =
    process.env.INTERNAL_API_URL ||
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:3333";

  const response = await fetch(`${backendUrl}/orders/${cpf}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    next: {
      revalidate: 60,
    },
  });

  if (!response.ok) {
    if (response.status === 404) {
      return [];
    }
    throw new Error(`Failed to fetch orders for CPF: ${cpf}`);
  }

  return response.json();
};
