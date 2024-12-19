import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "antd";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import CategorySelect from "./categorySelect";

interface NavbarProps {
  productInCart?: boolean;
  externalLoading?: boolean;
  onCategoryChange: (value: number) => void;
  onCartClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
  onCategoryChange,
  productInCart,
  onCartClick,
  externalLoading,
}) => {
  const router = useRouter();
  if (
    localStorage &&
    (!localStorage.getItem("token") ||
      localStorage.getItem("role") !== "customer")
  ) {
    router.replace("/");
  }

  return (
    <div className="flex justify-between items-center bg-blue-200 p-4 text-black">
      <h2 className="text-2xl font-semibold">Product List</h2>
      <div className="flex items-center space-x-3">
        <CategorySelect
          externalLoading={externalLoading}
          onValueChange={onCategoryChange}
          allCategories={true}
        ></CategorySelect>
        <Button
          icon={productInCart ? <HeartFilled /> : <HeartOutlined />}
          onClick={onCartClick}
          className="bg-yellow-200"
        >
          Cart
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
