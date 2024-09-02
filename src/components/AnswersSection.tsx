
import { Controller, useFieldArray } from 'react-hook-form';

type AnswersSectionProps = {
  control: any;
  questionIndex: number;
  errors: any;
};

const AnswersSection: React.FC<AnswersSectionProps> = ({ control, questionIndex, errors }) => {
  const { fields: answerFields, append: appendAnswer, remove: removeAnswer } = useFieldArray({
    control,
    name: `questions.${questionIndex}.answers`,
  });

  return (
    <div className="space-y-4">
      {answerFields.map((answer, answerIndex) => (
        <div key={answer.id} className="border border-gray-300 rounded-lg p-4 mb-4 bg-gray-100">
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Answer Title *</label>
            <Controller
              name={`questions.${questionIndex}.answers.${answerIndex}.title`}
              control={control}
              rules={{ required: 'Answer Title is required.' }}
              render={({ field }) => (
                <>
                  <input {...field} className="border-gray-300 border rounded-md p-2 w-full" />
                  {errors?.questions?.[questionIndex]?.answers?.[answerIndex]?.title && (
                    <p className="text-red-500 text-sm">
                      {errors.questions[questionIndex].answers[answerIndex].title.message}
                    </p>
                  )}
                </>
              )}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Description</label>
            <Controller
              name={`questions.${questionIndex}.answers.${answerIndex}.description`}
              control={control}
              render={({ field }) => (
                <textarea {...field} className="border-gray-300 border rounded-md p-2 w-full h-24" />
              )}
            />
          </div>

          <div className="flex items-center mb-4">
            <Controller
              name={`questions.${questionIndex}.answers.${answerIndex}.isCorrect`}
              control={control}
              render={({ field }) => <input type="checkbox" {...field} className="mr-2" />}
            />
            <label className="text-gray-700">Correct Answer</label>
          </div>

          <button
            type="button"
            onClick={() => removeAnswer(answerIndex)}
            className="text-red-500 underline"
          >
            Remove Answer
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={() => appendAnswer({ title: '', isCorrect: false })}
        className="text-blue-500 underline"
      >
        Add Answer
      </button>
    </div>
  );
};

export default AnswersSection;
