import { QuestionT } from "./Question/Question";
import allQuestions from "./questions.json";
import { isStarred, shuffleArray } from "./utils";

class QuestionBank {
    quizSource = "all";
    bank: QuestionT[] = [];
    index = 0;

    constructor() {
        this.reload();
    }

    load(quizSource: string) {
        this.quizSource = quizSource;
        if (quizSource === "all") {
            this.bank = Object.values(allQuestions).flat().slice(0);
        } else {
            this.bank = (allQuestions as any)[quizSource].slice(0);
        }
        this.index = 0;
        this.updateStarred();
    }
    shuffleBank() {
        this.bank = shuffleArray(this.bank);
        this.index = 0;
    }
    nextQuestion(): QuestionT | null {
        this.index++;
        return this.loadCurrentQuestion();
    }
    loadQuestion(index: number): QuestionT | null {
        this.index = index;
        return this.loadCurrentQuestion();
    }
    loadCurrentQuestion(): QuestionT | null {
        if (this.bank.length === 0) {
            this.index = 0;
            return null;
        }

        const index = this.index % this.bank.length;
        const question = this.bank[index];

        return question;
    }

    starredOnly = false;
    setStarredOnly(newValue: boolean) {
        this.starredOnly = newValue;
        this.updateStarred();
    }
    updateStarred() {
        if (this.starredOnly) {
            this.bank = this.bank.filter((q) => isStarred(q.id));
            this.index = 0;
        }
    }
    reload() {
        this.load(this.quizSource);
    }
    getTotalQuestionCount() {
        return this.bank.length;
    }
}

export const questionBank = new QuestionBank();
