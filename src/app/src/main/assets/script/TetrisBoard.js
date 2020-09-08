class TetrisBoard {
  constructor(width, height) {
      this.board = [];
      this.width = width;
      this.height = height;

      for (let i = 0; i < height; i++) {
          this.board.push(new Array(10).fill(0));
      }

      this.init();
  }

  init() {
    for (let i = 0; i < this.height; i++) {
        for (let j = 0; j < this.width; j++) {
            this.board[i][j] = 0;
        }
    }
  }

  get() {
    return this.board;
  }
}
