"use client";

import { searchQuestionVoByPageUsingPost} from "@/api/questionController";
import {TablePaginationConfig} from "antd";
import {ActionType, ProColumns, ProTable} from "@ant-design/pro-table";
import TagList from "@/components/TagList";
import Link from "next/link";
import {useRef, useState} from "react";

interface Props {
    //用于展示服务端的默认数据
    defaultQuestionList?: API.QuestionVO[];
    defaultTotal?: number;
    defaultSearchParams: API.QuestionQueryRequest;
}


/**
 * 题目表格组件
 * @constructor
 */
export default function QuestionTable(props: Props) {
    const actionRef = useRef<ActionType>();
    const {defaultQuestionList, defaultTotal, defaultSearchParams = {} } = props;
    const [questionList, setQuestionList] = useState<API.QuestionVO[]>(
        defaultQuestionList || [],
    );
    const [total, setTotal] = useState<number>(defaultTotal || 0);

    //判断是否首次加载
    const [init, setInit] = useState<boolean>(true);

    /**
     * 表格列配置
     */
    const columns: ProColumns<API.QuestionVO>[] = [
        {
            title: "Search",
            dataIndex: "searchText",
            valueType: "text",
            hideInTable: true,
        },
        {
            title: "题目",
            dataIndex: "title",
            valueType: "text",
            hideInSearch:true,
            render(_, record) {
                return <Link key={record.id} href={`/question/${record.id}`}>{record.title}</Link>;
            },
        },
        {
            title: "标签",
            dataIndex: "tagList",
            valueType: "select",
            fieldProps: {
                mode: "tags"
            },
            render: (_, record) => <TagList key={record.id} tagList={record.tagList} />,
        },
    ];

    return (
        <div className="question-table">
            <ProTable
                actionRef={actionRef}
                columns={columns}
                size="large"
                search={{
                    labelWidth: "auto",
                }}
                //设置初始查询条件
                form = {{
                    initialValues: defaultSearchParams,
                }}
                dataSource={questionList}
                pagination={
                    {
                        pageSize: 15,
                        showTotal: (total) => `总共 ${total} 条`,
                        showSizeChanger: false,
                        total,
                    } as TablePaginationConfig
                }
                request={async (params, sort, filter) => {

                    // 首次请求
                    if (init) {
                        setInit(false);
                        // 如果已有外层传来的默认数据，无需再次查询
                        if (defaultQuestionList && defaultTotal) {
                            return;
                        }
                    }

                    const sortField = Object.keys(sort)?.[0] || 'createTime';
                    const sortOrder = sort?.[sortField] || 'descend';
                    // 请求
                    const { data, code } = await searchQuestionVoByPageUsingPost({
                        ...params,
                        sortField: '_score',
                        sortOrder,
                        ...filter,
                    } as API.UserQueryRequest);
                    // 更新结果
                    const newTotal = Number(data.total) || 0;
                    setTotal(newTotal)
                    const newData = data.records || [];
                    setQuestionList(newData)
                    return {
                        success: code === 0,
                        data: newData,
                        total: newTotal,
                    };
                }}
            />
        </div>
    );
}
