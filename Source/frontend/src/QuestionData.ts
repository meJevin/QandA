import { getAccessToken } from './Auth';
import { http } from './http';

export interface QuestionData {
    questionId: number;
    title: string;
    content: string;
    userName: string;
    created: Date;
    answers: AnswerData[];
}

export interface AnswerData {
    answerId: number;
    content: string;
    userName: string;
    created: Date;
}

export interface QuestionDataFromServer {
    questionId: number;
    title: string;
    content: string;
    userName: string;
    created: string;
    answers: AnswerDataFromServer[];
}

export interface AnswerDataFromServer {
    answerId: number;
    content: string;
    userName: string;
    created: string;
}

export const mapQuestionFromServer = (
    question: QuestionDataFromServer,
): QuestionData => ({
    ...question,

    created: new Date(question.created.substr(0, 19)),

    answers: question.answers?.map(answer => ({
        ...answer,
        created: new Date(answer.created.substr(0, 19)),
    })),
});

export interface PostQuestionData {
    title: string;
    content: string;
    userName: string;
    created: Date;
}

export const postQuestion = async (
    question: PostQuestionData,
): Promise<QuestionData | undefined> => {
    const accessToken = await getAccessToken();

    try {
        const result = await http<
            PostQuestionData,
            QuestionDataFromServer
        >({
            path: "questions",
            method: "post",
            body: question,
            accessToken,
        });

        if (result.ok && result.parsedBody) {
            return mapQuestionFromServer(result.parsedBody);
        } else {
            return undefined;
        }
    } catch (ex) {
        console.error(ex);
        return undefined;
    }
}

export interface PostAnswerData {
    questionId: number;
    content: string;
    userName: string;
    created: Date;
}

export const postAnswer = async (
    answer: PostAnswerData,
): Promise<AnswerData | undefined> => {
    return undefined;
}

const wait = (ms: number): Promise<void> => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const getUnansweredQuestions = async (): Promise<QuestionData[]> => {
    try {
        const result = await http<undefined, QuestionDataFromServer[]>({
            path: "questions/unanswered",
        });

        if (result.parsedBody) {
            return result.parsedBody.map(mapQuestionFromServer)
        }
        else {
            return [];
        }
    } catch (ex) {
        console.error(ex);
        return [];
    }
};

export const getQuestion = async (
    questionId: number
): Promise<QuestionData | null> => 
{
    try {
        const result = await http<undefined, QuestionDataFromServer>({
            path: `questions/${questionId}`,
        });

        if (result.ok && result.parsedBody) {
            return mapQuestionFromServer(result.parsedBody);
        } else {
            return null;
        }
    } catch (ex) {
        console.error(ex);
        return null;
    }
};

export const searchQuestions = async (criteria: string)
: Promise<QuestionData[]> => {
    try {
        const result = await http<undefined, QuestionDataFromServer[]>({
            path: `questions/search=${criteria}`,
        });

        if (result.ok && result.parsedBody) {
            return result.parsedBody.map(mapQuestionFromServer);
        } else {
            return [];
        }
    } catch (ex) {
        console.error(ex);
        return [];
    }
};
    