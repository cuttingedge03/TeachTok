class Answer {
    constructor(id, correct_options) {
      this.id = id;
      this.correct_options = correct_options.map(option => ({ id: option.id, answer: option.answer }));
    }
  
    static fromJSON(json) {
      return new Answer(json.id, json.correct_options);
    }
  }
  export default Answer;