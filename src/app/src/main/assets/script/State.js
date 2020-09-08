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
        this.blockFactory = new TetrominosFactory();
        this.currentBlock = this.blockFactory.create();
        this.nextBlock = this.blockFactory.create();
        this.holdBlock = null;
        this.tetrisBoard = board;
    }

    isPlayState() {
        return true;
    }

    gameOver() {
        return !this.tetrisBoard.isAcceptable(this.currentBlock);
    }

    hold() {
        // Todo
        return true;
    }

    rotate() {
        this.currentBlock.rotate();
        if (!this.tetrisBoard.isAcceptable(this.currentBlock)) {
            this.currentBlock.preRotate();
        }
    }

    moveLeft() {
        this.currentBlock.moveLeft();
        if (!this.tetrisBoard.isAcceptable(this.currentBlock)) {
            this.currentBlock.moveRight();
        } 
    }

    moveRight() {
        this.currentBlock.moveRight();
        if (!this.tetrisBoard.isAcceptable(this.currentBlock)) {
            this.currentBlock.moveLeft();
        } 
    }

    moveDown() {
        this.currentBlock.moveDown();

        if (this.tetrisBoard.isAcceptable(this.currentBlock)) {
            console.log("Accept");
        } else {
            this.currentBlock.moveUp();
            console.log("Can not move down");
            this.fixCurrentBlock();
            this.updateBoard();
            this.updateBlock() ;
        }
    }

    moveBottom() {
        while(this.tetrisBoard.isAcceptable(this.currentBlock)) {
            this.currentBlock.moveDown();
        }
        if (this.tetrisBoard.isAcceptable(this.currentBlock)) {
            return;
        }
        this.currentBlock.moveUp();
    }

    updateBoard() {
        let removedLine = this.tetrisBoard.arrange();
        //let point = calculatorScore(removedLine);
        //tetris.addSore(point);
    }

    updateBlock() {
        this.currentBlock = this.nextBlock;
        this.nextBlock = this.blockFactory.create();
    }

    fixCurrentBlock() {
        this.tetrisBoard.addBlock(this.currentBlock);
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

    OnDraw(canvas, block, block_image, button_image) {

    }
  }
  
  class InitGameState extends GameState {
    constructor() {
      super();
      this.state = 0;
    }
  }
  
  class IdleGameState extends GameState {
    constructor() {
      super();
      this.state = 1;
    }
  } 
  
  class PlayGameState extends GameState {
    constructor() {
      super();
      this.state = 2;
    }
  }
  
  class PauseGameState extends GameState {
    constructor() {
      super();
      this.state = 3;
    }
  }
  
  class GameoverGameState extends GameState {
    constructor() {
      super();
      this.state = 4;
    }
  }