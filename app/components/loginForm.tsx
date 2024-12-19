import React from "react";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

interface LoginFormProps {
  role: string;
  buttonText: string;
  loading: boolean;
  error: string;
  onFinish: (values: { email: string; password: string }) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  role,
  buttonText,
  loading,
  error,
  onFinish,
}) => {
  return (
    <Form
      name={`${role}-login`}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      layout="vertical"
    >
      <Form.Item
        name="email"
        label="Email"
        rules={[
          {
            required: true,
            message: "Please enter your email!",
            type: "email",
          },
        ]}
      >
        <Input
          prefix={<UserOutlined />}
          placeholder="Email"
          disabled={loading}
        />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={[{ required: true, message: "Please enter your password!" }]}
      >
        <Input.Password
          prefix={<LockOutlined />}
          placeholder="Password"
          disabled={loading}
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading} block>
          {buttonText}
        </Button>
      </Form.Item>
      {error && (
        <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
      )}
    </Form>
  );
};

export default LoginForm;
