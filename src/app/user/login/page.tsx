"use client";

import React from "react";
import { LoginForm, ProForm, ProFormText } from "@ant-design/pro-form";
import { message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { userLoginUsingPost } from "@/api/userController";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { AppDispatch } from "@/store";
import { setLoginUser } from "@/store/loginUser";
import { useDispatch } from "react-redux";
import "./index.css";

/**
 * 用户登录页面
 * @param props
 */
const UserLoginPage: React.FC = (props) => {
  const [form] = ProForm.useForm();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  /**
   * 提交
   * @param values
   */
  const doSubmit = async (values: any) => {
    try {
      const res = await userLoginUsingPost(values);
      if (res.data) {
        message.success("登录成功！");
        // 保存用户登录态
        dispatch(setLoginUser(res.data));
        router.replace("/");
        form.resetFields();
      }
    } catch (e: any) {
      message.error('登录失败，' + e.message);
    }
  };

  return (
      <div id="userLoginPage">
        <LoginForm<API.UserAddRequest>
            form={form}

            logo={
              <Image src="/assets/xm1.png" alt="XM" width={120} height={44} />
            }

            title="Panda Man"

            subTitle="Interview Platform"

            onFinish={doSubmit}
            submitter={{
              searchConfig: {
                submitText: "Login",
              },
            }}
        >
          <ProFormText
              name="userAccount"
              fieldProps={{
                size: "large",
                prefix: <UserOutlined />,
              }}
              placeholder={"Enter Account"}
              rules={[
                {
                  required: true,
                  message: "Enter Account!",
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
          <div
              style={{
                marginBlockEnd: 24,
                textAlign: "end",
              }}
          >
            Not Having Account?
            <Link prefetch={false} href={"/user/register"}>
              Register
            </Link>

          </div>
        </LoginForm>
      </div>
  );
};

export default UserLoginPage;
