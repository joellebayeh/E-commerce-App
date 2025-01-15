"use client";

import React from "react";
import { Form, Input, Button } from "antd";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../redux/store";
import CategorySelect from "../components/categorySelect";
import { addProduct, selectAddProduct } from "../redux/slices/addProductSlice";
import LogoutButton from "../components/logoutButton";

const AddProduct: React.FC = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch<AppDispatch>();
    const { status, error } = useSelector(selectAddProduct);

    const handleValueChange = (value: number) => {
        form.setFieldsValue({ categoryId: value });
    };

    const onFinish = async (values: any) => {
        const imagesArray = values.images
            .split(",") // Split by comma
            .map((url: string) => url.trim()) // Remove spaces
            .filter((url: string) => url);
        dispatch(addProduct({ ...values, images: imagesArray }));
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-center text-2xl font-bold mb-6">Add New Product</h2>

                <Form form={form} onFinish={onFinish} layout="vertical">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <Form.Item
                            label="Product Name"
                            name="title"
                            rules={[
                                { required: true, message: "Please enter product name!" },
                            ]}
                        >
                            <Input
                                placeholder="Enter product name"
                                className="shadow-sm"
                                disabled={status === "loading"}
                            />
                        </Form.Item>

                        <Form.Item
                            label="category"
                            name="categoryId"
                            rules={[
                                {
                                    required: true,
                                    message: "Please select a category!",
                                },
                            ]}
                        >
                            <CategorySelect
                                externalLoading={status === "loading"}
                                onValueChange={handleValueChange}
                            ></CategorySelect>
                        </Form.Item>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Form.Item
                            label="Price"
                            name="price"
                            rules={[
                                { required: true, message: "Please enter product price!" },
                            ]}
                        >
                            <Input
                                type="number"
                                min={1}
                                placeholder="Enter price"
                                className="shadow-sm"
                                disabled={status === "loading"}
                            />
                        </Form.Item>

                        <Form.Item
                            label="Images (URL)"
                            name="images"
                            rules={[{ required: true, message: "Please enter image URL!" }]}
                        >
                            <Input
                                placeholder="Enter image URL"
                                className="shadow-sm"
                                disabled={status === "loading"}
                            />
                        </Form.Item>
                    </div>

                    <Form.Item
                        label="Description"
                        name="description"
                        rules={[
                            { required: true, message: "Please enter product description!" },
                        ]}
                    >
                        <Input.TextArea
                            placeholder="Enter description"
                            className="shadow-sm"
                            disabled={status === "loading"}
                        />
                    </Form.Item>

                    {(() => {
                        switch (status) {
                            case "loading":
                                return (
                                    <div className="text-blue-500 text-center pb-6 max-w-md">
                                        Adding product, please wait...
                                    </div>
                                );
                            case "succeeded":
                                return (
                                    <div className="text-green-500 text-center pb-6 max-w-md">
                                        Product added successfully!
                                    </div>
                                );
                            case "failed":
                                return (
                                    <div className="text-red-500 text-center pb-6 max-w-md">
                                        {error}
                                    </div>
                                );
                            default:
                                return null;
                        }
                    })()}

                    <div className="flex justify-center items-center">
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="bg-blue-500 text-white hover:bg-blue-600"
                            loading={status === "loading"}
                        >
                            Add Product
                        </Button>
                    </div>
                </Form>
            </div>
            <LogoutButton />
        </div>
    );
};

export default AddProduct;
