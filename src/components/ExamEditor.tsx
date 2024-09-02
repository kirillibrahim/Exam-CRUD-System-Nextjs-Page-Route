import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { Exam } from '../constants/types';
import { getExamByIdFromLocalStorage, saveExamToLocalStorage } from '../utils/localStorageUtils';
import Question from './Question';

const ExamEditor: React.FC = () => {
  const router = useRouter()
  const  {id}  = router.query; // Exam ID from query parameter

  const isEdit = Boolean(id);

  const { control, handleSubmit, reset, formState: { errors, isValid } } = useForm<Exam>({
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
          rules={{ required: "Exam Title is required." }}
          render={({ field }) => (
            <>
              <input {...field} className="border-gray-300 border rounded-md p-2 w-full" />
              {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
            </>
          )}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">Description</label>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <>
              <textarea {...field} className="border-gray-300 border rounded-md p-2 w-full h-32" />
            </>
          )}
        />
      </div>

      <div className="space-y-4">
        {questionFields.map((question, questionIndex) => (
          <Question
            key={question.id}
            control={control}
            questionIndex={questionIndex}
            removeQuestion={removeQuestion}
            errors={errors}
          />
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
