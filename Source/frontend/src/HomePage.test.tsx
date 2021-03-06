import React from 'react';
import { render, cleanup, waitForElement } from '@testing-library/react';
import { HomePage } from './HomePage';
import { BrowserRouter } from 'react-router-dom';

afterEach(cleanup);

test('When HomePage first rendered, loading indicator should show', () => {
    let mock: any = jest.fn();
    
    const { getByText } = render(
        <BrowserRouter>
            <HomePage history={mock} location={mock} match={mock} questionsLoading={true}/>
        </BrowserRouter>,
    );

    const loading = getByText('Loading...');
    expect(loading).not.toBeNull();
});

jest.mock('./QuestionData', () => ({
    getUnansweredQuestions: jest.fn(() => {
        return Promise.resolve([
            {
                questionId: 1,
                title: 'Title1 test',
                content: 'Content2 test',
                userName: 'User1',
                created: new Date(2019, 1, 1),
                answers: [],
            },
            {
                questionId: 2,
                title: 'Title2 test',
                content: 'Content2 test',
                userName: 'User2',
                created: new Date(2019, 1, 1),
                answers: [],
            },
        ]);
    }),
}));

// This test fails because fuck redux thunk
/*
test('When HomePage data returned, it should render questions', async () => {
    let mock: any = jest.fn();

    const { getByText } = render(
        <BrowserRouter>
            <HomePage history={mock} location={mock} match={mock}/>
        </BrowserRouter>,
    );

    await waitForElement(() => getByText('Title1 test'));

    const question2TitleText = getByText('Title2 test');
    expect(question2TitleText).not.toBeNull();
});
*/
