// applies edits questions.json given some edits
// run with bun apply-edits.js

if (!confirm("Confirming: Have you placed the edits in edits.txt?"))
    throw new Error("Canceled.");

const questions = JSON.parse(await Bun.file("src/questions.json").text());
const editsStr = (await Bun.file("edits.txt").text()).trim();
const edits = JSON.parse("[" + editsStr.slice(0, editsStr.length - 1) + "]") // remove trailing comma
    .reduce((acc, cur) => {
        acc[cur.id] = cur.answer;
        return acc;
    }, {});

let affectedCount = 0;
let skippedCount = 0;
for (const key in questions) {
    for (const question of questions[key]) {
        if (question.id in edits) {
            const editedAnswer = edits[question.id];

            const existingAnswer = question.answers.findIndex(
                (ans) => ans.correct
            );
            if (existingAnswer !== -1) {
                if (existingAnswer === editedAnswer) {
                    // already correct
                    skippedCount++;
                    continue;
                } else {
                    console.warn(
                        "Warning: Question " +
                            question.id +
                            " already has a correct answer. (Used to be: " +
                            existingAnswer +
                            "). Overwriting..."
                    );
                    question.answers[existingAnswer].correct = false;
                }
            }
            const ansIndex = editedAnswer;
            question.answers[ansIndex].correct = true;
            affectedCount++;
        }
    }
}

await Bun.write("src/questions.json", JSON.stringify(questions));

console.log(
    "\nEdits applied! Affected: " +
        affectedCount +
        " | Skipped: " +
        skippedCount +
        " | Total: " +
        Object.keys(edits).length
);
