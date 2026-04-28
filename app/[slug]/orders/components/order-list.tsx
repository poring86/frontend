"use client";

import { HomeIcon, Loader2Icon, ScrollTextIcon } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Order, OrderStatus } from "@/data/types";
import { formatCurrency } from "@/helpers/format-currency";

import { repayOrder } from "../actions/repay-order";

interface OrderListProps {
  orders: Order[];
}

const getStatusLabel = (status: OrderStatus) => {
  if (status === "FINISHED") return "Finalizado";
  if (status === "IN_PREPARATION") return "Em preparo";
  if (status === "PENDING") return "Pendente";
  if (status === "PAYMENT_CONFIRMED") return "Pagamento confirmado";
  if (status === "PAYMENT_FAILED") return "Pagamento falhou";
  return "";
};

const OrderList = ({ orders }: OrderListProps) => {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  const [loadingOrderId, setLoadingOrderId] = useState<number | null>(null);

  const handleBackClick = () => router.push(`/${slug}`);

  const handleRepayClick = async (orderId: number) => {
    try {
      setLoadingOrderId(orderId);
      const { url } = await repayOrder(orderId, window.location.origin);
      window.location.href = url;
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingOrderId(null);
    }
  };

  return (
    <div className="space-y-6 p-6">
      <Button
        size="icon"
        variant="secondary"
        className="rounded-full bg-white shadow-sm"
        onClick={handleBackClick}
      >
        <HomeIcon />
      </Button>
      <div className="flex items-center gap-3">
        <ScrollTextIcon />
        <h2 className="text-lg font-semibold">Meus Pedidos</h2>
      </div>
      {orders.map((order) => (
        <Card key={order.id}>
          <CardContent className="space-y-4 p-5">
            <div
              className={`w-fit rounded-full px-2 py-1 text-xs font-semibold text-white ${([OrderStatus.PAYMENT_CONFIRMED, OrderStatus.FINISHED] as OrderStatus[]).includes(order.status) ? "bg-green-500 text-white" : "bg-gray-200 text-gray-800"} `}
            >
              {getStatusLabel(order.status)}
            </div>
            <div className="flex items-center gap-2">
              <div className="relative h-5 w-5">
                <Image
                  src={order.restaurant.avatarImageUrl}
                  alt={order.restaurant.name}
                  className="rounded-sm"
                  fill
                />
              </div>
              <p className="text-sm font-semibold">{order.restaurant.name}</p>
            </div>
            <Separator />
            <div className="space-y-2">
              {order.orderProducts.map((orderProduct) => (
                <div key={orderProduct.id} className="flex items-center gap-2">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-400 text-xs font-semibold text-white">
                    {orderProduct.quantity}
                  </div>
                  <p className="text-sm">{orderProduct.product.name}</p>
                </div>
              ))}
            </div>
            <Separator />
            <p className="text-sm font-medium">{formatCurrency(order.total)}</p>
            {order.status === OrderStatus.PENDING && (
              <Button
                variant="destructive"
                className="w-full rounded-full"
                onClick={() => handleRepayClick(order.id)}
                disabled={loadingOrderId === order.id}
              >
                {loadingOrderId === order.id && (
                  <Loader2Icon className="animate-spin" />
                )}
                Pagar
              </Button>
            )}
          </CardContent>
        </Card>
      ))}
      <Button
        variant="secondary"
        className="w-full rounded-full"
        onClick={handleBackClick}
      >
        Fazer novo pedido
      </Button>
    </div>
  );
};

export default OrderList;
