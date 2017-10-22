class Trivia {
  constructor(options = {}) {
    this.options = options;

    this.init();
  }

  init() {
    this.current = 0;
    this.started = false;
    this.questions = [];
    this.complete = false;
    this.score = false;
  }

  load(cb) {
    loadTrivia(this, cb);
  }

  reset() {
    this.init();
  }

  getTotalQuestions() {
    return this.questions.length;
  }

  isLastQuestion() {
    return this.current === this.questions.length - 1;
  }

  isEnd() {
    return this.current === this.questions.length;
  }

  getProgress() {
    if(this.getTotalQuestions() <1){
      return "";
    }
    return `${this.current + 1} of ${this.getTotalQuestions()}`;
  }

  getProp(prop) {
    return this.questions[this.current][prop];
  }

  getQuestion() {
    let item = false;
    /* don't increment for initial question display */
    if (!this.started) {
      this.started = true;
    } else {
      this.incrementCurrent();
    }

    if (this.questions.length === 0) {

      return this.getEmpty();
    }

    if (this.isEnd()) {
      this.complete = true;
      return (item = this.getSummary());
    }

    item = this.questions[this.current].question;

    return item;
  }

  getCategory() {
    if (this.getTotalQuestions() >= 1) {
      return this.questions[this.current].category;
    }

    return "";
  }

  setAnswer(val) {
    let answer = val === "true";

    if (answer === true) {
      answer = "True";
    } else {
      answer = "False";
    }

    if (!this.isEnd()) {
      this.questions[this.current].answer = answer;
    }
  }

  getScore() {
    let score = 0;
    this.questions.forEach(question => {
      if (question.answer === question.correct_answer) {
        score++;
      }
    });

    this.score = `${score} / ${this.getTotalQuestions()}`;
    return this.score;
  }

  incrementCurrent() {
    if (this.current + 1 <= this.questions.length) {
      this.current++;
    }
  }

  getEmpty() {
    return "No questions found!";
  }

  getSummary() {
    return "";
  }
}

async function asyncFetch(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(response.status);
  const data = await response.json();
  return data;
}

/*
test status codes ->  let baseUrl = "http://httpstat.us/502";
*/

function loadTrivia(trivia, cb) {
  let options = trivia.options;
  let baseUrl = "https://opentdb.com/api.php";
  let amount = options.amount || 10;
  let difficulty = options.difficulty || "hard";
  let type = options.type || "boolean";
  let url = `${baseUrl}?amount=${amount}&difficulty=${difficulty}&type=${type}`;

  asyncFetch(url)
    .then(data => {
      trivia.questions = data.results;
      cb(trivia);
    })
    .catch(err => cb({ status: "error", message: err.message }));
}

module.exports = Trivia;
