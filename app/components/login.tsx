"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../redux/store";
import { Tabs, Typography } from "antd";
import LoginForm from "./loginForm";
import { selectAuth, loginUser } from "../redux/slices/authSlice";
import { fetchUserDetails, selectUser } from "../redux/slices/userSlice";

const { Title } = Typography;

const Login: React.FC = () => {
  const router = useRouter();
  if (localStorage && localStorage.getItem("token")) {
    router.replace(
      `${
        localStorage.getItem("role") === "admin"
          ? "/add-product"
          : "/product-list"
      } `
    );
  }
  const dispatch = useDispatch<AppDispatch>();
  const [isSucceeded, setIsSucceeded] = useState<boolean>(false);
  const {
    status: loginStatus,
    error: loginError,
    token,
  } = useSelector(selectAuth);
  const { status: getDetailsStatus, error: getDetailsError } =
    useSelector(selectUser);
  const [activeTab, setActiveTab] = useState<string>("customer");

  const isLoading =
    loginStatus === "succeeded"
      ? getDetailsStatus === "succeeded"
        ? true
        : getDetailsStatus === "loading"
        ? true
        : false
      : loginStatus === "loading"
      ? true
      : false;

  const handleLogin = (values: { email: string; password: string }) => {
    dispatch(loginUser(values)).then(() => {
      setIsSucceeded(true);
    });
  };

  useEffect(() => {
    if (loginStatus === "succeeded" && isSucceeded) {
      dispatch(fetchUserDetails({ token, activeTab })).then(() => {
        if (getDetailsStatus === "succeeded") {
          router.push(activeTab === "admin" ? "add-product" : "product-list");
        }
        setIsSucceeded(false);
      });
    }
  }, [
    activeTab,
    dispatch,
    getDetailsStatus,
    loginStatus,
    router,
    token,
    isSucceeded,
  ]);

  // Define tab items
  const tabItems = [
    {
      key: "customer",
      label: "Customer",
      children: (
        <LoginForm
          role="customer"
          buttonText="Sign-in as Customer"
          onFinish={handleLogin}
          loading={isLoading}
          error={getDetailsError ? getDetailsError : loginError}
        />
      ),
    },
    {
      key: "admin",
      label: "Admin",
      children: (
        <LoginForm
          role="admin"
          buttonText="Sign-in as Admin"
          onFinish={handleLogin}
          loading={isLoading}
          error={getDetailsError ? getDetailsError : loginError}
        />
      ),
    },
  ];

  return (
    <div className="max-w-lg mx-auto p-12 bg-white mt-10 rounded-lg shadow-lg">
      <Title level={1} className="text-center">
        Sign-in
      </Title>
      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        items={tabItems}
        className="pt-10"
      />
    </div>
  );
};

export default Login;
