import React, {
    ChangeEvent,
    MouseEvent,
    useEffect,
    useRef,
    useState,
} from "react";
import { questionBank } from "../QuestionBank";
import { addStar, isStarred, removeStar } from "../utils";

export type QuestionT = {
    description: { images: string[]; text: string };
    answers: { text: string; correct: boolean }[];
    id: string;
};

function Question(
    props: QuestionT & {
        questionNumber: number;
        onNextQuestion: () => void;
    }
) {
    const {
        description: { images, text },
        answers,
        questionNumber,
        onNextQuestion,
        id,
    } = props;

    const [starred, setStarred] = useState(isStarred(id));
    const [submitShown, setSubmitShown] = useState(false);
    const [correctShown, setCorrectShown] = useState(false);
    const [answer, setAnswer] = useState<number | null>(null);
    const [skipCorrectShown, setSkipCorrectShown] = useState(false);
    const answersRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setStarred(isStarred(id));
        setSubmitShown(false);
        setCorrectShown(false);

        Array.from(answersRef.current?.querySelectorAll("input") ?? []).map(
            (input) => (input.checked = false)
        );
    }, [id]);

    const isCorrect = answers[answer ?? 0].correct;

    const onAnswerChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (!submitShown) {
            setSubmitShown(true);
        }
        setAnswer(parseInt(event.target.value));
    };

    const onSubmitOrNext = (event: MouseEvent) => {
        if (!correctShown && (skipCorrectShown ? !isCorrect : true)) {
            setCorrectShown(true);
        } else {
            setSubmitShown(false);
            setCorrectShown(false);
            onNextQuestion();
        }
    };

    return (
        <div className="w-[40rem] border pb-4 text-lg mt-6">
            <div className="font-bold px-3 m-0 py-3 w-full bg-slate-50 border-b flex items-center justify-between">
                <h2>Question {questionNumber}</h2>
                <svg
                    className={`cursor-pointer hover:text-amber-400 transition-colors ${
                        starred ? "text-amber-400 hover:text-red-400" : ""
                    }`}
                    viewBox="0 0 20 20"
                    height="20"
                    width="20"
                    onClick={() => {
                        if (starred) {
                            setStarred(false);
                            removeStar(id);
                        } else {
                            setStarred(true);
                            addStar(id);
                        }
                        questionBank.updateStarred();
                    }}
                >
                    <path
                        fill="currentColor"
                        d="M10 16.0745L14.3649 18.8368C15.1642 19.343 16.1424 18.5947 15.932 17.6482L14.7751 12.4537L18.6351 8.95405C19.3398 8.31575 18.9611 7.10517 18.0356 7.02813L12.9555 6.57692L10.9676 1.66857C10.61 0.777143 9.38997 0.777143 9.03237 1.66857L7.04451 6.56591L1.96443 7.01713C1.03887 7.09416 0.660232 8.30474 1.36492 8.94305L5.22494 12.4427L4.06799 17.6372C3.85763 18.5837 4.83578 19.332 5.63513 18.8258L10 16.0745V16.0745Z"
                    ></path>
                </svg>
            </div>
            {images.map((url) => (
                <img
                    src={url}
                    key={url}
                    className="w-3/5 m-auto mt-6"
                    alt="Question"
                />
            ))}
            <p className="ml-6 my-6">{text}</p>
            <div className="ml-6" ref={answersRef}>
                {answers.map((answer, index) => (
                    <div
                        key={answer.text + index}
                        className="border-t w-11/12 pl-6 py-1 flex items-center"
                    >
                        <input
                            type="radio"
                            name="answers"
                            value={index}
                            id={answer.text}
                            className="cursor-pointer"
                            onChange={onAnswerChange}
                        ></input>
                        <label
                            htmlFor={answer.text}
                            className="ml-2 cursor-pointer flex-grow"
                        >
                            {answer.text}
                        </label>
                    </div>
                ))}
            </div>

            {correctShown ? (
                <div className="text-center my-4">
                    <p className="font-bold text-xl">
                        {isCorrect
                            ? "Correct! Good job."
                            : `Sorry, that's incorrect.`}
                    </p>
                    {!isCorrect ? (
                        <p className="my-4">
                            The correct answer was option{" "}
                            {answers.findIndex((a) => a.correct) + 1}:
                            <span className="block font-semibold">
                                "{answers.filter((a) => a.correct)[0].text}"
                            </span>
                            {!starred && (
                                <button
                                    className="text-xs bg-yellow-300 rounded-md px-1.5 py-0.5 hover:shadow-sm active:shadow-inner"
                                    onClick={() => {
                                        setStarred(true);
                                        addStar(id);
                                    }}
                                >
                                    Star This Question For Review
                                </button>
                            )}
                        </p>
                    ) : null}
                </div>
            ) : null}

            <button
                className="bg-lime-300 rounded-lg px-3 py-0.5 m-auto block mt-2 hover:shadow-sm transition-all border border-lime-400 active:border-lime-100 active:shadow-inner select-none"
                style={{
                    opacity: submitShown ? "1" : "0",
                    visibility: submitShown ? "visible" : "hidden",
                }}
                onClick={onSubmitOrNext}
            >
                {correctShown ? "Next Question" : "Submit Answer"}
            </button>

            {correctShown && isCorrect ? (
                <button
                    className="bg-red-200 text-[0.6rem] leading-[0.85rem] rounded-lg px-2 py-0.5 m-auto block mt-4 hover:shadow-sm transition-all border border-red-300 active:border-red-100 active:shadow-inner select-none"
                    style={{
                        opacity: submitShown ? "1" : "0",
                        visibility: submitShown ? "visible" : "hidden",
                    }}
                    onClick={(event) => {
                        setSkipCorrectShown(true);
                        onSubmitOrNext(event);
                    }}
                >
                    Don't Show Again
                </button>
            ) : null}
        </div>
    );
}

export default Question;
