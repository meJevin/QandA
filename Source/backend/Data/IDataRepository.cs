﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Data.Models;

namespace WebAPI.Data
{
    public interface IDataRepository
    {
        IEnumerable<QuestionGetManyResponse> GetQuestions();
        IEnumerable<QuestionGetManyResponse> GetQuestionsWithAnswers();
        IEnumerable<QuestionGetManyResponse> GetQuestionsBySearch(string search);
        IEnumerable<QuestionGetManyResponse> GetQuestionsBySearchWithPaging(string search,
            int pageNumber, int pageSize);
        IEnumerable<QuestionGetManyResponse> GetUnansweredQuestions();
        Task<IEnumerable<QuestionGetManyResponse>> GetUnansweredQuestionsAsync();
        Task<QuestionGetSingleResponse> GetQuestion(int questionId);
        bool QuestionExists(int questionId);
        AnswerGetResponse GetAnswer(int answerId);
        Task<QuestionGetSingleResponse> PostQuestion(QuestionPostFullRequest question);
        Task<QuestionGetSingleResponse> PutQuestion(int questionId, QuestionPutRequest question);
        void DeleteQuestion(int questionId);
        AnswerGetResponse PostAnswer(AnswerPostFullRequest answer);
    }
}
