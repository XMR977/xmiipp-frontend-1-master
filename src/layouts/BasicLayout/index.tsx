"use client";

import {GithubFilled, LogoutOutlined} from "@ant-design/icons";
import {ProLayout} from "@ant-design/pro-components";
import "./index.css";
import {Dropdown, message} from "antd";
import React from "react";
import Image from "next/image";
import {usePathname, useRouter} from "next/navigation";
import Link from "next/link";
import GlobalFooter from "@/components/GlobalFooter";
import {menus} from "../../../config/menu";
import {AppDispatch, RootState} from "@/store";
import {useDispatch, useSelector} from "react-redux";
import getAccessibleMenus from "@/access/menuAccess";
import {userLogoutUsingPost} from "@/api/userController";
import {setLoginUser} from "@/store/loginUser";
import {DEFAULT_USER} from "@/constants/user";
import SearchInput from "@/layouts/BasicLayout/components/SearchInput";

interface Props {
    children: React.ReactNode;
}

//

export default function BasicLayout({children}: Props) {
    const loginUser = useSelector((state: RootState) => state.loginUser);
    const pathname = usePathname();
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();

    /**
     * 用户注销
     */
    const userLogout = async () => {
        try {
            await userLogoutUsingPost();
            message.success("已退出登录");
            dispatch(setLoginUser(DEFAULT_USER));
            router.push("/user/login");
        } catch (e) {
            message.error("操作失败，" + e.message);
        }
        return;
    };

    return (
        <div
            id="basicLayout"
            style={{
                height: "100vh",
                overflow: "auto",
            }}
        >
            <ProLayout
                title="Panda Man Interview Platform"
                logo={
                    <Image
                        src="/assets/xm1.png"
                        height={32}
                        width={32}
                        alt="Panda Man - 熊猫人"
                    />
                }
                layout="top"
                location={{
                    pathname,
                }}
                avatarProps={{
                    src: loginUser.userAvatar,
                    size: "small",
                    title: loginUser.userName || "熊猫人",
                    render: (props, dom) => {
                        if (!loginUser.id) {
                            return (
                                <div onClick={() => {
                                    router.push("/user/login");
                                }}
                                >
                                    {dom} </div>
                            );
                        }
                        return (
                            <Dropdown
                                menu={{
                                        items: [
                                            {
                                                key: "userCenter",
                                                icon: <LogoutOutlined/>,
                                                label: "Center",
                                            },
                                            {
                                                key: "logout",
                                                icon: <LogoutOutlined/>,
                                                label: "Logout",
                                            },
                                        ],

                                        onClick: async (event: { key: React.Key }) => {
                                            const {key} = event;
                                            //logout
                                            if (key === "logout") {
                                                userLogout();
                                            } else if (key === "userCenter") {
                                                router.push("/user/center");
                                            }
                                        },

                                    }} >
                                    {dom}
                                    </Dropdown>
                                    );
                                },
                }}
                actionsRender={(props) => {
                    return [
                        <SearchInput key="search"/>,
                        <a key="github" href="https://github.com/XMR977" target="_blank">
                            <GithubFilled key="GithubFilled"/>,
                        </a>,
                    ];
                }}
                //top menu render
                headerTitleRender={(logo, title, _) => {
                    const defaultDom = (
                        <a href="http://localhost:3000" target="_blank">
                            {logo}
                            {title}
                        </a>
                    );

                    // if (document.body.clientWidth < 1400) {
                    //   return defaultDom;
                    // }
                    // if (_.isMobile) return defaultDom;

                    return <>{defaultDom}</>;
                }}
                onMenuHeaderClick={(e) => console.log(e)}
                //define top menu
                menuDataRender={() => {
                    return getAccessibleMenus(loginUser, menus);
                }}
                menuItemRender={(item, dom) => (
                    //menu render
                    <Link href={item.path || "/"} target={item.target}>
                        {dom}
                    </Link>
                )}
                //render footer
                footerRender={() => {
                    return <GlobalFooter/>;
                }}
            >
                {children}
            </ProLayout>
        </div>
    );
}
