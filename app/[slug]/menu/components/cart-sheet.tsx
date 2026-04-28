import { useContext, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { formatCurrency } from "@/helpers/format-currency";

import { CartContext } from "../contexts/cart";
import CartProductItem from "./cart-product-item";
import FinishOrderDialog from "./finish-order-dialog";

const CartSheet = () => {
  const [finishOrderDialogIsOpen, setFinishOrderDialogIsOpen] = useState(false);
  const { isOpen, toggleCart, products, total } = useContext(CartContext);
  return (
    <Drawer open={isOpen} onOpenChange={toggleCart}>
      <DrawerContent className="z-50 px-3 pb-8 sm:px-7">
        <div className="mx-auto w-full max-w-[500px]">
          <DrawerHeader>
            <DrawerTitle className="text-left lg:text-xl">Sacola</DrawerTitle>
          </DrawerHeader>
          <div className="flex h-full flex-col gap-7 py-7">
            <div className="flex-auto space-y-5">
              {products.map((product) => (
                <CartProductItem key={product.id} product={product} />
              ))}
            </div>
            <Card className="mb-2 shadow-none border border-gray-200">
              <CardContent className="p-6">
                <div className="flex justify-between items-center">
                  <p className="text-sm text-muted-foreground lg:text-base">Total</p>
                  <p className="text-lg font-bold lg:text-xl">{formatCurrency(total)}</p>
                </div>
              </CardContent>
            </Card>
            <div className="mt-2 flex flex-col gap-3">
              <Button
                className="w-full rounded-full py-4 text-base font-semibold lg:text-lg"
                onClick={() => setFinishOrderDialogIsOpen(true)}
              >
                Finalizar pedido
              </Button>
              <FinishOrderDialog
                open={finishOrderDialogIsOpen}
                onOpenChange={setFinishOrderDialogIsOpen}
              />
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default CartSheet;
