// open a canvas quiz page and run this code in the browser console.
(function () {
    const questions = document.getElementsByClassName("question");
    const output = [];
    for (const question of questions) {
        if (!question.classList.contains("multiple_choice_question")) {
            console.warn("Encountered non-multiple choice question. Skipping!");
            continue;
        }
        const id = question.id.replace("question_", "");
        const gotCorrect = question.classList.contains("correct");
        const questionText = question
            .querySelector(".text")
            .querySelector(":scope > .question_text")
            .innerHTML.trim();
        const questionImages = Array.from(
            question
                .querySelector(".text")
                .querySelector(":scope > .question_text")
                .querySelectorAll("img")
        ).map((img) => img.src);

        const answersDiv = question
            .querySelector(".text")
            .querySelector(":scope > .answers");
        const onAnswersPage = !!answersDiv.querySelector(".answers_wrapper");
        const answers = answersDiv.querySelectorAll(".answer");
        const answerList = [];
        for (const answer of answers) {
            if (onAnswersPage) {
                // canvas bug that sometimes results in empty extra answers
                const selectAnswer = answer.querySelector(".select_answer");
                if (selectAnswer == null) continue;

                const label = selectAnswer.querySelector("label");

                const text = (
                    label.querySelector(".answer_text").textContent ||
                    label.querySelector(".answer_html").textContent
                ).trim();
                const correct = answer.classList.contains("correct_answer");
                answerList.push({
                    text: text,
                    correct: correct,
                    selected: selectAnswer.querySelector("input").checked,
                });
            } else {
                // on test page
                const text = answer
                    .querySelector(".answer_label")
                    .textContent.trim();

                answerList.push({
                    text: text,
                    correct: false, // this is handled by the "edit" functionality of the frontend
                });
            }
        }
        if (answerList.length === 0) {
            console.warn("Encountered question with no answers. Skipping!");
            console.log(question, [...answers]);
            continue;
        }
        const noCorrectAnswer = answerList.every((answer) => !answer.correct);
        if (noCorrectAnswer) {
            if (!gotCorrect) {
                console.warn("Encountered question with no correct answer");
            } else {
                // correct is selected
                answerList.forEach((answer) => {
                    answer.correct = answer.selected;
                });
            }
        }
        answerList.forEach((answer) => {
            delete answer.selected;
        });
        output.push({
            description: {
                images: questionImages,
                text: questionText,
            },
            answers: answerList,
            gotCorrect: gotCorrect,
            id: id,
        });
    }
    console.log(output);
    const outputString = JSON.stringify(output);
    document.body.innerHTML = `<h1>Click anywhere to copy questions to clipboard</h1> <pre>${outputString.replaceAll(
        "<",
        "&lt;"
    )}</pre>`;
    document.body.onclick = async () => {
        await navigator.clipboard.writeText(outputString);
        document.body.innerHTML = `<h1>Copied to clipboard!</h1>`;
    };
    document.body.scrollTop = 0;
})();
