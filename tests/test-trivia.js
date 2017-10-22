var test = require("tape");
var tapSpec = require("tap-spec");
var Trivia = require("../lib/Trivia");
var questions = require("./questions");

test("init Triva", function(t) {
  t.plan(4);
  var triv = new Trivia();
  t.equal(triv.current, 0, "current is 0 to start");
  triv.getQuestion();
  t.equal(triv.current, 0, "current is 0 after getting a question");
  t.equal(triv.complete, false, "complete is false");
  t.equal(typeof triv.options, "object", "options is an object");
});

test("count questions", function(t) {
  t.plan(1);
  var triv = new Trivia();
  triv.questions = questions;
  t.equal(triv.getTotalQuestions(), 3, "can get total questions");
});

test("check not at last question", function(t) {
  t.plan(1);
  var triv = new Trivia();
  triv.questions = questions;
  triv.getQuestion();
  triv.getQuestion();
  t.equal(triv.isLastQuestion(), false, "is not last question");
});

test("can go to next", function(t) {
  t.plan(1);
  var triv = new Trivia();
  triv.questions = questions;
  triv.getQuestion();
  triv.getQuestion();
  t.equal(triv.current, 1, "current is 1");
});

test("check is complete", function(t) {
  t.plan(3);
  var triv = new Trivia();
  triv.questions = questions;
  triv.getQuestion();
  triv.getQuestion();
  triv.getQuestion();
  t.equal(triv.current, 2, "current is 2");
  t.equal(triv.isLastQuestion(), true, "is last question");
  triv.getQuestion();
  t.equal(triv.complete, true, "complete prop is true");
});

test("check progress", function(t) {
  t.plan(1);
  var triv = new Trivia();
  triv.questions = questions;
  triv.getQuestion();
  triv.getQuestion();
  t.equal(triv.getProgress(),"2 of 3", "can get progress");
});

test("check score", function(t) {
  t.plan(4);
  var triv = new Trivia();
  triv.questions = questions;
  /* q1 */
  triv.getQuestion();
  t.equal(triv.getProp("category"),"q1", "can get category");
  triv.setAnswer("false");
  /* q2 */
  triv.getQuestion();
  t.equal(triv.getProp("category"),"q2", "can get category");
  triv.setAnswer("true");
  /* q3 */
  triv.getQuestion();
  t.equal(triv.getProp("category"),"q3", "can get category");
  triv.setAnswer("true");
  /* summary */
  t.equal(triv.getScore(),"2 / 3", "can tally score");
});
