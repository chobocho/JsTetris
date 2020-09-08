class Tetrominos {
  constructor(bw, bh) {
    this.block = [];
    this.x = 0;
    this.y = 0;
    this.r = 0;
    this.w = 0;
    this.h = 0;
    this.type = 0;
    this.numOfBlockType = 0;
    this.board_width = bw;
    this.board_height = bh;
  }

  rotate() {
    this.r = (this.r + 1) % this.numOfBlockType;
  }

  preRotate() {
    this.r = (this.r - 1 + this.numOfBlockType) % this.numOfBlockType;
  }

  moveLeft() {
    if (this.x == 0) {
      return false;
    }
    this.x--;
    return true;
  }

  moveRight() {
    if (this.x == (this.board_width - 1)) {
      return false;
    }
    this.x++;
    return true;
  }

  moveDown() {
    if (this.y == (this.board_height - 1)) {
      return false;
    }
    this.y++;
    return true;
  }
}

class EmptyBlock extends Tetrominos {
  constructor(bw, bh) {
    super(bw, bh);
    this.type = -1;
  }
}

class IBlock extends Tetrominos {
  constructor(bw, bh) {
    super(bw, bh);
    this.block = [[[1, 0, 0, 0], [1, 0, 0, 0], [1, 0, 0, 0], [1, 0, 0, 0]],
    [[1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]];
    this.x = 5;
    this.y = 0;
    this.r = 0;
    this.w = 4;
    this.h = 4;
    this.type = 2;
    this.numOfBlockType = 2;
  }
}
