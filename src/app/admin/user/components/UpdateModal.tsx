import {ProColumns, ProTable} from "@ant-design/pro-table";
import {message, Modal} from "antd";
import {updateUserUsingPost} from "@/api/userController";
import React from "react";

interface Props {
    oldData?: API.User
    visible: boolean;
    columns: ProColumns<API.User>[];
    onSubmit: (values: API.UserAddRequest) => void;
    onCancel: () => void;
}



const handleUpdate = async (fields: API.UserUpdateRequest) => {
    const hide = message.loading("正在更新");
    try {
        await updateUserUsingPost(fields);
        hide();
        message.success("更新成功");
        return true;
    } catch (error: any) {
        hide();
        message.error("更新失败，" + error.message);
        return false;
    }

};

//创建更新弹窗
const UpdateModal: React.FC<Props> = (props) => {

    const {oldData,visible, columns, onSubmit, onCancel} = props;

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
                form={{
                    initialValues: oldData,
                }}
                onSubmit={async (values: API.UserUpdateRequest) => {
                    if (!oldData?.id || !onSubmit) {
                        return;
                    }
                    const success = await handleUpdate({
                        ...values,
                        id: oldData.id,
                    });
                    if (success) {
                        onSubmit(values);
                    }
                }}
            />

        </Modal>
    )
};

export default UpdateModal;
