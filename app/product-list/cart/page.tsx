"use client";

import React from "react";
import { Button, InputNumber } from "antd";
import LogoutButton from "@/app/components/logoutButton";
import { useRouter } from "next/navigation";
import {useDispatch, useSelector} from "react-redux";
import { selectProducts, updateQuantity } from "@/app/redux/slices/productListSlice";
import {AppDispatch} from "@/app/redux/store";



const CartScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const productInCart = useSelector(selectProducts).likedProduct;
  if (
    localStorage &&
    (!localStorage.getItem("token") ||
      localStorage.getItem("role") !== "customer")
  ) {
    router.replace("/");
  }

  const handleQuantity = (inc: number, id: number) => {
    dispatch(updateQuantity({inc: inc, id: id}))
  };

  const calculateTotal = () =>
      productInCart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen p-6 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-6">My Cart</h1>
      <div className="w-full max-w-3xl bg-white shadow-md rounded-lg p-6">
        {productInCart.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between border-b pb-2 mb-2"
          >
            <div className="flex-1 text-sm xs:text-md">
              <h2 className="">{item.title}</h2>
              <p className=" text-green-500 ">Price: ${item.price}</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                onClick={() => handleQuantity(-1, item.id)}
                disabled={item.quantity <= 1}
                className="w-10 h-10 rounded-full flex items-center justify-center bg-red-50 "
              >
                -
              </Button>
              <InputNumber
                min={1}
                max={20}
                value={item.quantity}
                readOnly
                className="w-12 text-center justify-center"
              />
              <Button
                disabled={item.quantity > 19}
                className="w-10 h-10 rounded-full flex items-center justify-center bg-blue-50 "
                onClick={() => handleQuantity(1, item.id)}
              >
                +
              </Button>
            </div>
          </div>
        ))}
        <div className="flex justify-center items-center mt-6 gap-2">
          <h2 className="text-xl font-bold">Total:</h2>
          <p className="text-xl font-bold text-blue-600">${calculateTotal()}</p>
        </div>
      </div>
      <LogoutButton />
    </div>
  );
};

export default CartScreen;
