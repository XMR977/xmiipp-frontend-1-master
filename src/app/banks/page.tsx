"use server";
import Title from "antd/es/typography/Title";
import "./index.css";
import { listQuestionBankVoByPageUsingPost } from "@/api/questionBankController";
import QuestionBankList from "@/components/QuestionBankList";

/**
 * 主页
 * @constructor
 */
export default async function BanksPage() {
  let questionBankList = [];
  //设置获取题目数量
  const pageSize = 100;

  try {
    const questionBankRes = await listQuestionBankVoByPageUsingPost({
      pageSize,
      sortField: "createTime",
      sortOrder: "descend",
    });
    questionBankList = questionBankRes.data.records ?? [];
  } catch (e) {
    console.error("获取题库列表失败，" + e.message);
  }

  return (
    <div id="banksPage" className="max-width-content">
      <Title level={3}>题库</Title>
      <QuestionBankList questionBankList={questionBankList}></QuestionBankList>
    </div>
  );
}
