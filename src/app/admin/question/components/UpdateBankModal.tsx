import { Form, message, Modal, Select } from "antd";
import React, { useEffect, useState } from "react";
import {
  addQuestionBankQuestionUsingPost,
  listQuestionBankQuestionByPageUsingPost,
  removeQuestionBankQuestionUsingPost,
} from "@/api/questionBankQuestionController";
import { listQuestionBankVoByPageUsingPost } from "@/api/questionBankController";

interface Props {
  questionId?: number;
  visible: boolean;
  onCancel: () => void;
}

//创建更新弹窗
const UpdateBankModal: React.FC<Props> = (props) => {

  const { questionId, visible, onCancel } = props;

  if (!questionId) {
    return <></>;
  }

  const [form] = Form.useForm();
  // 获取所属题库列表
  const getCurrentQuestionBankIdList = async () => {
    try {
      const res = await listQuestionBankQuestionByPageUsingPost({
        questionId,
        pageSize: 20,
      });
      const list = (res.data.records ?? []).map((item) => item.questionBankId);
      form.setFieldValue("questionBankIdList" as any, list);
    } catch (e) {
      console.error("获取题目所属题库列表失败，" + e.message);
    }
  };

  useEffect(() => {
    if (questionId) {
      getCurrentQuestionBankIdList();
    }
  }, [questionId]); // Adding questionId as a dependency ensures it runs consistently


  const [questionBankList, setQuestionBankList] = useState<
      API.QuestionBankVO[]
  >([]);

  // 获取题库列表
  const getQuestionBankList = async () => {
    // 题库数量不多，直接全量获取
    const pageSize = 200;
    try {
      const questionBankRes = await listQuestionBankVoByPageUsingPost({
        pageSize,
        sortField: "createTime",
        sortOrder: "descend",
      });
      setQuestionBankList(questionBankRes.data?.records ?? []);
    } catch (e) {
      console.error("获取题库列表失败，" + e.message);
    }
  };

  useEffect(() => {
    getQuestionBankList();
  }, []);

  return (
    <Modal
      destroyOnClose
      title={"创建"}
      open={visible}
      footer={null}
      onCancel={() => {
        onCancel?.();
      }}
    >
      <Form form={form} style={{ marginTop: 24 }}>
        <Form.Item label="所属题库" name="questionBankIdList">
          <Select
            mode="multiple"
            style={{ width: "100%" }}

            options={questionBankList.map((item) => {
              return {

                label: item.title,
                value: item.id,

              };
            })}

            onSelect={async (value) => {
              const hide = message.loading("正在更新");
              try {
                await addQuestionBankQuestionUsingPost({
                  questionId,
                  questionBankId: value,
                });
                hide();
                message.success("绑定题库成功");
              } catch (error: any) {
                hide();
                message.error("绑定题库失败，" + error.message);
              }
            }}

            onDeselect={async (value) => {
              const hide = message.loading("正在更新");
              try {
                await removeQuestionBankQuestionUsingPost({
                  questionId,
                  questionBankId: value,
                });
                hide();
                message.success("取消绑定题库成功");
              } catch (error: any) {
                hide();
                message.error("取消绑定题库失败，" + error.message);
              }
            }}

          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateBankModal;
