import { Controller } from 'react-hook-form';
import AnswersSection from './AnswersSection';

interface QuestionProps {
  control: any;
  questionIndex: number;
  removeQuestion: (index: number) => void;
  errors: any;
}

const Question = ({ control, questionIndex, removeQuestion, errors }: QuestionProps) => {
  return (
    <div className="border border-gray-200 rounded-lg p-4 mb-4 bg-gray-50">
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">Question Title *</label>
        <Controller
          name={`questions.${questionIndex}.title`}
          control={control}
          rules={{
            required: "Question Title is required."
          }}
          render={({ field }) => (
            <>
              <input {...field} className="border-gray-300 border rounded-md p-2 w-full" />
              {errors?.questions?.[questionIndex]?.title && (
                <p className="text-red-500 text-sm">
                  {errors.questions[questionIndex].title.message}
                </p>
              )}
            </>
          )}
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

      <AnswersSection control={control} questionIndex={questionIndex} errors={errors} />

      <button
        type="button"
        onClick={() => removeQuestion(questionIndex)}
        className="text-red-500 underline mt-4"
      >
        Remove Question
      </button>
    </div>
  );
};

export default Question;
