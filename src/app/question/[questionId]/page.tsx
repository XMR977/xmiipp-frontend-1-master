"use server";

import "./index.css";
import {getQuestionVoByIdUsingGet} from "@/api/questionController";
import QuestionCard from "@/components/QuestionCard";

/**
 * 单独题目详情页面
 * @constructor
 */
export default async function QuestionPage({ params }) {
  const { questionId } = params;


  //question

  let question = undefined;

  try {
    const questionRes = await getQuestionVoByIdUsingGet({
      id: questionId,
    });
    question = questionRes.data;
  } catch (e) {
    console.error("获取题目详情失败，" + e.message);
  }

  if (!question) {
    return <div>获取Question详情失败，请刷新重试</div>;
  }



  return (
      <div id="questionPage" className={"max-width-content"}>
        <QuestionCard  question={question}/>
      </div>

  );
}
