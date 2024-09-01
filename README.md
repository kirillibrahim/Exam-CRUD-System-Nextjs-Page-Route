This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Frontend Interview Task: Exam Management System

Create a web application that allows users to create, update, and manage exams consisting of multiple-choice
questions. Each question should have exactly one correct answer and at least two possible answers. The
application should be implemented using Next.js with a focus on functionality.

Pages:

1. Exam Editor Page:
This page enables users to create or update an exam. Each exam consists of multiple-choice
questions.

Actions in the Form:
○ Add Question: Include a new question in the exam.
○ Edit Question: Allow users to edit the question title and description.
○ Remove Question: Delete an existing question from the exam.
○ Add Answer: Add a new answer to a question.
○ Edit Answer: Allow users to edit the answer title and description.
○ Delete Answer: Remove an answer from a question.
○ Make Answer Correct: Designate an answer as the correct choice for a question.
The submit button should be enabled only if the exam fields are valid and all questions (at least one)
are valid.
After Submitting:
○ The exam should be added to the list of exams stored in local storage.
2. List Exams Page:
This page displays a list of exams stored in local storage. Users should be able to perform the following
actions:
○ View Exams: Display a list of all exams with options to update each one. Clicking on an exam
should link to the Exam Editor Page, populating the form with the current exam values.
○ Create New Exam: A button located in the top-right corner of the page allows users to create a
new exam. This button should link to the Exam Editor Page with an empty form for entering new
exam details.