"use server";

export async function repayOrder(orderId: number, origin: string) {
  const backendUrl =
    process.env.INTERNAL_API_URL ||
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:3333";

  const response = await fetch(`${backendUrl}/checkout/${orderId}/repay`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ origin }),
  });

  if (!response.ok) {
    throw new Error("Failed to create Stripe repayment session");
  }

  return response.json();
}
