"use client";

import React from "react";
import { LoginForm, ProForm, ProFormText } from "@ant-design/pro-form";
import { message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { userRegisterUsingPost } from "@/api/userController";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import "./index.css";

/**
 * 用户注册页面
 * @param props
 */
const UserRegisterPage: React.FC = (props) => {
  const [form] = ProForm.useForm();
  const router = useRouter();

  /**
   * 提交
   * @param values
   */
  const doSubmit = async (values: any) => {
    try {
      const res = await userRegisterUsingPost(values);
      if (res.data) {
        message.success("Successfully Registered!");
        // 前往登录页
        router.push("/user/login");
      }
    } catch (e) {
      message.error("Register failed，" + e.message);
    }
  };

  return (
      <div id="userRegisterPage">
        <LoginForm<API.UserAddRequest>
            form={form}
            logo={
              <Image src="/assets/xm1.png" alt="xm" width={44} height={44} />
            }
            title="Register"
            subTitle="Panda Man Interview Platform"
            onFinish={doSubmit}
            submitter={{
              searchConfig: {
                submitText: "Register",
              },
            }}
        >
          <ProFormText
              fieldProps={{
                size: "large",
                prefix: <UserOutlined />,
              }}
              name="userAccount"
              placeholder={"Enter UserName"}
              rules={[
                {
                  required: true,
                  message: "Enter UserName！",
                },
              ]}
          />
          <ProFormText.Password
              name="userPassword"
              fieldProps={{
                size: "large",
                prefix: <LockOutlined />,
              }}
              placeholder={"Enter Password"}
              rules={[
                {
                  required: true,
                  message: "Enter Password！",
                },
              ]}
          />
          <ProFormText.Password
              name="checkPassword"
              fieldProps={{
                size: "large",
                prefix: <LockOutlined />,
              }}
              placeholder={"Confirm Password"}
              rules={[
                {
                  required: true,
                  message: "Please Confirm Password Again！",
                },
              ]}
          />
          <div
              style={{
                marginBlockEnd: 24,
                textAlign: "end",
              }}
          >
            Having Account？
            <Link prefetch={false} href={"/user/login"}>
              Login
            </Link>
          </div>
        </LoginForm>
      </div>
  );
};

export default UserRegisterPage;
