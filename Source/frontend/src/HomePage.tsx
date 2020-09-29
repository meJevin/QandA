
import React, { useEffect, useState } from "react";
import { PrimaryButton } from "./Styles";
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { QuestionList } from "./QuestionList";
import { getUnansweredQuestions, QuestionData } from "./QuestionData";
import { Page } from "./Page";
import { PageTitle } from "./PageTitle";
import { Question } from "./Question";
import { RouteComponentProps } from "react-router-dom";

export const HomePage : React.FC<RouteComponentProps> = (props) => {
 
    useEffect(() => {
        const fetchQuestions = async (): Promise<void> => {
            const unansweredQuestions = await getUnansweredQuestions();

            setQuestions(unansweredQuestions);
            setQuestionsLoading(false);
        };

        fetchQuestions();
    }, []);

    const [questions, setQuestions] = useState<QuestionData[] | null>(null);
    const [questionsLoading, setQuestionsLoading] = useState<boolean>(true);

    const handleAskQuestionClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        props.history.push("/ask");
    };

    return <Page title="niggers?">
        <div
            css={css`
            display: flex;
            align-items: center;
            justify-content: space-between;
            `}
            >
            <PageTitle>Unanswered questions</PageTitle>
            <PrimaryButton onClick={handleAskQuestionClick}>
                Ask a question
            </PrimaryButton>
        </div>
        {questionsLoading ? 
        (<div css={css`
            font-size: 16px;
            font-style: italic;
        `}>
            Loading...
        </div>)
        :
        (<QuestionList 
            data={questions || []}
            />)
        }
        
    </Page>
};

function renderQuestionInList(qData: QuestionData): JSX.Element {
    return (
        <div>
            <h5>
                This is a custom question renderer!
            </h5>
            <span>
                Question info: {qData.content}
            </span>
            <Question data={qData || []}/>
        </div>
    );
}