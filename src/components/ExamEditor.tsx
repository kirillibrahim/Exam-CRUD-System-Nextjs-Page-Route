
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { Exam, Question, Answer } from '../constants/types';
import { getExamByIdFromLocalStorage, saveExamToLocalStorage } from '../utils/localStorageUtils';
import AnswersSection from './AnswersSection';

const ExamEditor = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const isEdit = Boolean(id);

  const { control, handleSubmit, reset, formState: { isValid } } = useForm<Exam>({
    defaultValues: {
      title: '',
      description: '',
      questions: [{ title: '', answers: [{ title: '', isCorrect: false }] }]
    },
    mode: 'onChange'
  });

  const { fields: questionFields, append: appendQuestion, remove: removeQuestion } = useFieldArray({
    control,
    name: 'questions'
  });

  const onSubmit = (data: Exam) => {
    saveExamToLocalStorage(data);
    router.push('/'); // Redirect after submission
  };

  useEffect(() => {
    if (isEdit && id) {
      const exam = getExamByIdFromLocalStorage(id as string);
      if (exam) {
        reset(exam);
      }
    }
  }, [id, reset, isEdit]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6">{isEdit ? 'Edit Exam' : 'Create New Exam'}</h2>

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">Exam Title *</label>
        <Controller
          name="title"
          control={control}
          rules={{ required: "This is required." }}
          render={({ field }) => <input {...field} className="border-gray-300 border rounded-md p-2 w-full" />}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">Description *</label>
        <Controller
          name="description"
          rules={{ required: true }}
          control={control}
          render={({ field }) => <textarea {...field} className="border-gray-300 border rounded-md p-2 w-full h-32" />}
        />
      </div>

      <div className="space-y-4">
        {questionFields.map((question, questionIndex) => (
          <div key={question.id} className="border border-gray-200 rounded-lg p-4 mb-4 bg-gray-50">
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Question Title</label>
              <Controller
                name={`questions.${questionIndex}.title`}
                control={control}
                render={({ field }) => <input {...field} className="border-gray-300 border rounded-md p-2 w-full" />}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Question Description</label>
              <Controller
                name={`questions.${questionIndex}.description`}
                control={control}
                render={({ field }) => <textarea {...field} className="border-gray-300 border rounded-md p-2 w-full h-24" />}
              />
            </div>

            <AnswersSection
              control={control}
              questionIndex={questionIndex}
            />

            <button
              type="button"
              onClick={() => removeQuestion(questionIndex)}
              className="text-red-500 underline mt-4"
            >
              Remove Question
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={() => appendQuestion({ title: '', description: '', answers: [{ title: '', isCorrect: false }] })}
          className="text-blue-500 underline"
        >
          Add Question
        </button>
      </div>

      <button
        type="submit"
        disabled={!isValid}
        className="mt-6 bg-blue-500 text-white font-bold py-2 px-4 rounded-md"
      >
        Submit
      </button>
    </form>
  );
};


export default ExamEditor;


