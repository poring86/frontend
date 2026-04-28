"use server";

import { ConsumptionMethod } from "@/app/types/prisma";
import { revalidatePath } from "next/cache";

interface CreateOrderInput {
  customerName: string;
  customerCpf: string;
  products: Array<{
    id: string;
    quantity: number;
  }>;
  consumptionMethod: ConsumptionMethod;
  slug: string;
}

export const createOrder = async (input: CreateOrderInput) => {
  const backendUrl = process.env.INTERNAL_API_URL || process.env.NEXT_PUBLIC_API_URL || "http://localhost:3333";
  const response = await fetch(`${backendUrl}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    throw new Error("Failed to create order");
  }

  const order = await response.json();
  revalidatePath(`/${input.slug}/orders`);
  return order;
};
