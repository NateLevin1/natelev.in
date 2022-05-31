import React, { useState } from "react";
import Question, { QuestionT } from "./Question/Question";
import { questionBank } from "./QuestionBank";
import { useOnMount } from "./utils";
import allQuestions from "./questions.json";

function App() {
    const [description, setDescription] = useState<
        QuestionT["description"] | null
    >(null);
    const [answers, setAnswers] = useState<QuestionT["answers"] | null>(null);
    const [questionId, setQuestionId] = useState<QuestionT["id"] | null>(null);
    const [questionNumber, setQuestionNumber] = useState(0);
    const modifiedQuestionNumber =
        ((questionNumber - 1) % questionBank.getTotalQuestionCount()) + 1;

    const newQuestion = () => {
        const question = questionBank.nextQuestion();
        if (!question) {
            setDescription(null);
            return;
        }

        const { description, answers, id } = question;
        setDescription(description);
        setAnswers(answers);
        setQuestionId(id);
        setQuestionNumber(questionNumber + 1);
    };

    useOnMount(() => {
        newQuestion();
    });

    return (
        <div className="App flex items-center flex-wrap flex-col">
            <div className="mt-3">
                <label htmlFor="quiz-source" className="mr-3 font-bold text-xl">
                    Quiz Source:
                </label>
                <select
                    id="quiz-source"
                    className="border rounded-md p-1 w-32 select-none cursor-pointer overflow-ellipsis overflow-hidden text-lg"
                    onChange={(e) => {
                        questionBank.load(e.target.value);
                        newQuestion();
                        setQuestionNumber(1);
                    }}
                >
                    <option value="all">All</option>
                    {Object.keys(allQuestions).map((key) => (
                        <option value={key} key={key}>
                            {key}
                        </option>
                    ))}
                </select>
            </div>

            <div className="mt-2">
                <input
                    type="checkbox"
                    className="cursor-pointer"
                    id="starred-only"
                    onChange={(event) => {
                        if (event.target.checked) {
                            questionBank.setStarredOnly(true);
                        } else {
                            questionBank.setStarredOnly(false);
                            questionBank.reload();
                        }
                        newQuestion();
                        setQuestionNumber(1);
                    }}
                ></input>
                <label
                    htmlFor="starred-only"
                    className="ml-1.5 font-bold text-lg cursor-pointer select-none"
                >
                    Starred Only
                </label>
                <input
                    type="checkbox"
                    className="hidden peer"
                    id="shuffled"
                    onChange={(event) => {
                        if (event.target.checked) {
                            questionBank.shuffleBank();
                        } else {
                            questionBank.reload();
                        }
                        newQuestion();
                        setQuestionNumber(1);
                    }}
                ></input>
                <label
                    htmlFor="shuffled"
                    className="ml-3 border px-2 py-1 rounded font-bold text-md cursor-pointer hover:text-amber-600 transition-colors peer-checked:bg-yellow-200 peer-checked:border-amber-300 select-none"
                >
                    <svg
                        className="inline-block mt-[-2px] mr-1"
                        viewBox="0 0 20 20"
                        width="13"
                        height="13"
                    >
                        <path
                            fill="currentColor"
                            d="M8.1825 7.17L3.7125 2.7C3.3225 2.31 2.6925 2.31 2.3025 2.7C1.9125 3.09 1.9125 3.72 2.3025 4.11L6.7625 8.57L8.1825 7.17ZM12.9425 2.85L14.1325 4.04L2.2925 15.88C1.9025 16.27 1.9025 16.9 2.2925 17.29C2.6825 17.68 3.3125 17.68 3.7025 17.29L15.5525 5.46L16.7425 6.65C17.0525 6.96 17.5925 6.74 17.5925 6.29V2.5C17.5925 2.22 17.3725 2 17.0925 2H13.3025C12.8525 2 12.6325 2.54 12.9425 2.85ZM12.4225 11.41L11.0125 12.82L14.1425 15.95L12.9425 17.15C12.6325 17.46 12.8525 18 13.3025 18H17.0925C17.3725 18 17.5925 17.78 17.5925 17.5V13.71C17.5925 13.26 17.0525 13.04 16.7425 13.36L15.5525 14.55L12.4225 11.41Z"
                        ></path>
                    </svg>
                    Shuffle
                </label>
            </div>

            {description && answers && questionId ? (
                <>
                    <Question
                        description={description}
                        answers={answers}
                        questionNumber={questionNumber}
                        onNextQuestion={() => newQuestion()}
                        id={questionId}
                    />
                    <div className="mt-4 flex flex-col items-center w-full">
                        <p className="block">
                            Question {modifiedQuestionNumber} /{" "}
                            {questionBank.getTotalQuestionCount()}
                        </p>
                        <progress
                            max={questionBank.getTotalQuestionCount()}
                            value={modifiedQuestionNumber}
                            className="mt-1.5 text-blue-600 bg-slate-300 bg-opacity-60 border"
                            style={{ ["--border-radius" as any]: "0.25rem" }}
                        ></progress>
                    </div>
                </>
            ) : (
                <p className="mt-4">
                    No questions available with these settings!
                </p>
            )}
        </div>
    );
}

export default App;
