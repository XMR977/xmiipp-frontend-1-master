import {ProColumns, ProTable} from "@ant-design/pro-table";
import {message, Modal} from "antd";
import {addUserUsingPost} from "@/api/userController";
import React from "react";

interface Props {
    visible: boolean;
    columns: ProColumns<API.User>[];
    onSubmit: (values: API.UserAddRequest) => void;
    onCancel: () => void;
}



const handleAdd = async (fields: API.UserAddRequest) => {
    const hide = message.loading("正在添加");
    try {
        await addUserUsingPost(fields);
        hide();
        message.success("创建成功");
        return true;
    } catch (error: any) {
        hide();
        message.error("创建失败，" + error.message);
        return false;
    }

};

const CreateModal: React.FC<Props> = (props) => {

    const {visible, columns, onSubmit, onCancel} = props;

    return(
    <Modal
        destroyOnClose
        title={"创建"}
        open={visible}
        footer={null}
        onCancel={() => {
            onCancel?.();
        }}
    >
        <ProTable
            type="form"
            columns={columns}
            onSubmit={async (values: API.UserAddRequest) => {
                const success = await handleAdd(values);
                if (success) {
                    onSubmit?.(values);
                }
            }}
        />
    </Modal>
    )
};

export default CreateModal;
