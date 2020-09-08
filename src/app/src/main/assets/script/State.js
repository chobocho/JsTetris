class State {
    constructor(tetris) {
        this.Tetris = tetris;
        this.state = 0;
    }

    init() {
    }

    get() {
        return this.state;
    }

    hold() {
        return false;
    }

    rotate() {
        // TODO implement here
    }

    moveLeft() {
        // TODO implement here
    }

    moveRight() {
        // TODO implement here
    }

    moveDown() {
        // TODO implement here
    }

    fixCurrentBlock() {
    }

    moveBottom() {
        // TODO implement here
    }

    updateBlock() {
    }

    gameOver() {
        return false;
    }

    updateBoard() {

    }

    getCurrentBlock() {
        return new EmptyBlock(0, 0);
    }

    getNextBlock() {
        return new EmptyBlock(0, 0);
    }

    getShodowBlock() {
        return new EmptyBlock(0, 0);
    }

    isInitState() { return false; }
    isIdleState() { return false; }
    isGameOverState() { return false; }
    isPlayState() { return false; }
    isPauseState() { return false; }
    sPauseState() { return false; }
}

class InitState extends State {
    constructor(tetris) {
        super(tetris);
        this.state = 0;
    }

    isInitState() {
        return true;
    }
}

class IdleState extends State {
    constructor(tetris) {
        super(tetris);
        this.state = 1;
    }

    isIdleState() {
        return true;
    }
}

class PlayState extends State {
    constructor(tetris, board) {
        super(tetris);
        this.state = 2;
        this.currentBlock = new IBlock(board_width, board_height);
        this.nextBlock = null;
        this.holdBlock = null;
        this.tetrisBoard = board;
    }

    isPlayState() {
        return true;
    }

    hold() {
        // Todo
        return true;
    }

    rotate() {
        this.currentBlock.rotate();
    }

    moveLeft() {
        this.currentBlock.moveLeft();
    }

    moveRight() {
        this.currentBlock.moveRight();
    }

    moveDown() {
        this.currentBlock.moveDown();
    }


    getCurrentBlock() {
        return this.currentBlock;
    }

    getNextBlock() {
        return new EmptyBlock(0, 0);
    }

    getShodowBlock() {
        return new EmptyBlock(0, 0);
    }

}

class PauseState extends State {
    constructor(tetris) {
        super(tetris);
        this.state = 3;
    }

    isPauseState() { return true; }
}

class GameOverState extends State {
    constructor(tetris) {
        super(tetris);
        this.state = 4;
    }

    isGameOverState() { return true; }
}

class GameState {
    constructor() {
    }

    OnDraw(canvas, block, block_image) {

    }
  }
  
  class InitGameState extends GameState {
    constructor() {
      super();
    }
  }
  
  class IdleGameState extends GameState {
    constructor() {
      super();
    }
  } 
  
  class PlayGameState extends GameState {
    constructor() {
      super();
    }
  }
  
  class PauseGameState extends GameState {
    constructor() {
      super();
    }
  }
  
  class GameoverGameState extends GameState {
    constructor() {
      super();
    }
  }