"use server";

import { ConsumptionMethod } from "@/app/types/prisma";
import { headers } from "next/headers";

import { CartProduct } from "../contexts/cart";

interface CreateStripeCheckoutInput {
  products: CartProduct[];
  orderId: number;
  slug: string;
  consumptionMethod: ConsumptionMethod;
  cpf: string;
}

export const createStripeCheckout = async (input: CreateStripeCheckoutInput) => {
  const backendUrl = process.env.INTERNAL_API_URL || process.env.NEXT_PUBLIC_API_URL || "http://localhost:3333";
  const origin = (await headers()).get("origin") as string;
  
  const response = await fetch(`${backendUrl}/checkout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...input, origin }),
  });

  if (!response.ok) {
    const text = await response.text();
    console.error("Stripe checkout error from backend:", text);
    throw new Error(`Failed to create Stripe checkout session: ${text}`);
  }

  return response.json();
};
