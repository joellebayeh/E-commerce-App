import React, { useState } from "react";
import { Card, Carousel, Button, Image } from "antd";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import useExtractUrl from "@/app/hooks/useExtractUrl";

interface ProductCardProps {
  product: any;
  isInCart: boolean;
  onAddToCart: (value: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  isInCart,
}) => {
  const { title, price, description, category, images } = product;
  const [isDescriptionExpanded, setDescriptionExpanded] = useState(false);

  const handleToggleDescription = () => {
    setDescriptionExpanded(!isDescriptionExpanded);
  };

  const processedImages = (typeof images === "string" ? JSON.parse(images) : images).map((img) => useExtractUrl(img));

  return (
    <Card
      hoverable
      className="shadow-lg "
      cover={
        <Carousel autoplay>
          {processedImages.map((img, index) => (
              <Image
              key={index}
              alt={title}
              src={img}
              className="object-cover w-full h-64"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg\n"; // Path to your default image
              }}
            />
          ))}
        </Carousel>
      }

    >
      <Card.Meta title={title} description={`Category: ${category.name}`} />
      <p className="text-lg font-semibold text-green-500">Price: ${price}</p>
      <div
        className={`text-sm text-gray-500 mt-2 ${
          isDescriptionExpanded ? "" : "line-clamp-3"
        }`}
      >
        {description}
      </div>

      <div className="flex justify-between items-center mt-2">
        <Button
          type="link"
          onClick={handleToggleDescription}
          className="text-xs text-blue-400 hover:text-blue-600"
        >
          {isDescriptionExpanded ? "Read Less" : "Read More"}
        </Button>
        <Button
          onClick={() => onAddToCart(product)}
          icon={isInCart ? <HeartFilled /> : <HeartOutlined />}
          className={`text-xl border-none ${
            isInCart ? "text-red-600" : "text-gray-500"
          }`}
        ></Button>
      </div>
    </Card>
  );
};

export default ProductCard;
