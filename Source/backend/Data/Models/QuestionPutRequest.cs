﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Data.Models
{
    public class QuestionPutRequest
    {
        public string Title { get; set; }
        public string Content { get; set; }
    }
}