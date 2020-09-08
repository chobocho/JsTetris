class Score {
  constructor() {
    this.score = 0;
    this.high = 0;
    this.removedLineCount = 0;
  }

  init() {
      this.score = 0;
      this.removedLineCount = 0;
  }

  get() {
    return this.score;
  }
}
