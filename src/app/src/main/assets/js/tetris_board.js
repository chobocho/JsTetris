class TetrisBoard {
  constructor(width, height, boardManager) {
    this.board = [];
    this._effect = [];
    this.width = width;
    this.height = height;
    this._boardManager = boardManager;

    for (let i = 0; i < height; i++) {
      this.board.push(new Array(10).fill(0));
    }

    this.init();
  }

  init() {
    this.clearEffect();

    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        this.board[i][j] = 0;
      }
    }
  }

  get() {
    return this.board;
  }

  hasEffect() {
    return this._effect.length !== 0;
  }

  clearEffect() {
    this._effect = [];
  }

  getEffect() {
    const effectBoard = this._effect[0];
    return effectBoard;
  }

  insertEffect() {
    const effect = JSON.parse(JSON.stringify(this.board));
    this._effect.push(effect);
    //console.log(">>>", effect, this._effect.length, Date.now());
  }

  popEffect() {
    if (this._effect.length > 0) {
      this._effect.pop();
    }
  }

  set(gameInfo) {
    this.clearEffect();

    for (let i = 0; i < this.height; i++) {
      let line = gameInfo['board'][i];
      for (let j = 0; j < this.width; j++) {
        this.board[i][j] = line[j];
      }
    }
  }

  setColorBoardWithInt(data) {
    for (let i = 0; i < this.height; i++) {
      if (i in data) {
        let line = data[i];
        for (let j = 0; j < this.width; j++) {
          this.board[i][j] = (line >> (j * 3)) & 0x7;
        }
      }
    }
  }

  setColorBoardWithItem(data) {
    for (let i = 0; i < this.height; i++) {
      if (i in data) {
        let line = data[i];
        for (let j = 0; j < this.width; j++) {
          this.board[i][j] = (line >> (j * 3)) & 0x7;
          if (this.board[i][j] > 0 && Math.random() > 0.92) {
            this.board[i][j] = 9;
          }
        }
      }
    }
  }

  getBoard() {
    let result= [];
    for (let i = 0; i < this.height; i++) {
      let line = Array(10).fill(0);
      for (let j = 0; j < this.width; j++) {
        line[j] = this.board[i][j];
      }
      result.push(line);
    }
    return result;
  }

  isAcceptable(block) {
    for (let i = 0; i < block.h; i++) {
      for (let j = 0; j < block.w; j++) {
        if (block.block[block.r][i][j] !== 0) {
          if (block.x + j < 0 || (block.x + j) > (this.width - 1) ||
              block.y + i < 0 || (block.y + i) > (this.height - 1)) {
            return false;
          }
          if (this.board[block.y + i][block.x + j] !== 0) {
            return false;
          }
        }
      }
    }
    return true;
  }

  addBlock(block) {
    for (let i = 0; i < block.h; i++) {
      for (let j = 0; j < block.w; j++) {
        // Check is it an item block
        if (block.block[block.r][i][j] >= START_BOOM && block.block[block.r][i][j] <= END_BOOM) {
          this.board[i + block.y][j + block.x] = block.block[block.r][i][j];
        } else if (block.block[block.r][i][j] !== 0) {
          this.board[i + block.y][j + block.x] = FIXED_BLOCK;
        }
      }
    }
  }

  arrange() {
      return this._boardManager.arrange(this.board);
  }

  isSolve() {
      return this._boardManager.isSolve(this.board);
  }

  isClear() {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        if (this.board[y][x] !== 0) {
          return false;
        }
      }
    }
    return true;
  }
}
