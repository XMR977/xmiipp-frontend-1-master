"use client";

import { ActionType, ProColumns, ProTable } from "@ant-design/pro-table";
import React, { useRef, useState } from "react";
import {Button, message, Popconfirm, PopconfirmProps, Space, Typography} from "antd";
import {
  deleteUserUsingPost,
  listUserByPageUsingPost,
} from "@/api/userController";
import { PlusOutlined } from "@ant-design/icons";
import CreateModal from "@/app/admin/user/components/CreateModal";
import {PageContainer} from "@ant-design/pro-layout";
import UpdateModal from "@/app/admin/user/components/UpdateModal";



const UserAdminPage: React.FC = () => {
  // 是否显示新建窗口
  const [createModalVisible, setCreateModalVisible] = useState<boolean>(false);
  //是否显示更新窗口
  const [updateModalVisible, setUpdateModalVisible] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();

  // 当前用户点击的数据
  const [currentRow, setCurrentRow] = useState<API.User>();

  const handleDelete = async (row: API.User) => {
    const hide = message.loading("正在删除");
    if (!row) return true;
    try {
      await deleteUserUsingPost({
        id: row.id as any,
      });
      hide();
      message.success("删除成功");
      // 删除成功后刷新表格
      actionRef?.current?.reload();
      return true;
    } catch (error: any) {
      hide();
      message.error("删除失败，" + error.message);
      return false;
    }
  };



  const columns: ProColumns<API.User>[] = [
    {
      title: "id",
      dataIndex: "id",
      valueType: "text",
      hideInForm: true,
    },
    {
      title: "账号",
      dataIndex: "userAccount",
      valueType: "text",
    },
    {
      title: "用户名",
      dataIndex: "userName",
      valueType: "text",
    },
    {
      title: "头像",
      dataIndex: "userAvatar",
      valueType: "image",
      fieldProps: {
        width: 64,
      },
      hideInSearch: true,
    },
    {
      title: "简介",
      dataIndex: "userProfile",
      valueType: "textarea",
      hideInSearch: true,
    },
    {
      title: "权限",
      dataIndex: "userRole",
      valueEnum: {
        user: {
          text: "用户",
        },
        admin: {
          text: "管理员",
        },
      },
    },
    {
      title: "创建时间",
      sorter: true,
      dataIndex: "createTime",
      valueType: "dateTime",
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: "更新时间",
      sorter: true,
      dataIndex: "updateTime",
      valueType: "dateTime",
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: "操作",
      dataIndex: "option",
      valueType: "option",
      render: (_, record) => (
        <Space size="middle">
          <Typography.Link
            onClick={() => {
              setCurrentRow(record);
              setUpdateModalVisible(true);
            }}
          >
            修改
          </Typography.Link>
          <Typography.Link
              type="danger"
              onClick={() => handleDelete(record)}
          >
            <Popconfirm
                title="Delete"
                description="Are you sure to delete this?"
                okText="Yes"
                cancelText="No"
            >
              <Button danger>Delete</Button>
            </Popconfirm>

          </Typography.Link>
        </Space>
      ),
    },
  ];


  return (
    <PageContainer>

      <ProTable<API.User>
        headerTitle={"查询表格"}
        actionRef={actionRef}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              setCreateModalVisible(true);
            }}
          >
            <PlusOutlined /> 新建
          </Button>,
        ]}
        request={async (params, sort, filter) => {
          const sortField = Object.keys(sort)?.[0];
          const sortOrder = sort?.[sortField];

          const { data, code } = await listUserByPageUsingPost({
            ...params,
            sortField,
            sortOrder,
            ...filter,
          } as API.UserQueryRequest);

          return {
            success: code === 0,
            data: data.records || [],
            total: Number(data.total) || 0,
          };
        }}
        columns={columns}
      />

      <CreateModal
        visible={createModalVisible}
        columns={columns}
        onSubmit={() => {
          setCreateModalVisible(false);
          actionRef.current?.reload();
        }}
        onCancel={() => {
          setCreateModalVisible(false);
        }}
      />

      <UpdateModal
          visible={updateModalVisible}
          columns={columns}
          oldData={currentRow}
          onSubmit={() => {
            setUpdateModalVisible(false);
            actionRef.current?.reload();
          }}
          onCancel={() => {
            setUpdateModalVisible(false);
          }}
      />




    </PageContainer>

  );

};

export default UserAdminPage;
