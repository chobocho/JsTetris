var block_ = new IBlock(board_width, board_height);
var block_move_count = 0;

class Observer {
  constructor() {
  }
  
  /**
   * 0: INIT_STATE
   * 1: IDLE
   * 2: PLAY
   * 3: PAUSE
   * 4: GAME OVER
   */
  update(state) {
      console.log("Observer update: ", state);
  }
}

class Tetris {
  constructor(width, height) {
    this.width = width;
    this.height = height;

    this.board = new TetrisBoard(width, height);
    this.socre = new Score();

    this.initState = new InitState();
    this.idleState = new IdleState();
    this.playState = new PlayState(this, this.board);
    this.pauseState = new PauseState();
    this.gameoverState = new GameOverState();

    this.state = this.idleState;
    this.observer = [];
  }

  init() {
    this.setState(this.idleState);
    this.board.init();
    this.score.init();
  }

  register(observer) {
    this.observer.push(observer);
    observer.update(this.state.get());
  }

  notify() {
    this.observer.forEach( e => {
      e.update(this.state.get())
    })
  }

  moveLeft() {
    console.log("Tetris: MoveLeft");
    this.state.moveLeft();
  }

  moveRight() {
    this.state.moveRight();
  }

  moveDown() {
    this.state.moveDown();
  }

  moveBottom() {
    this.state.moveBottom();
  }

  rotate() {
    this.state.rotate();
  }

  hold() {
    this.state.hold();
  }

  start() {
    console.log("Start");
    this.setState(this.playState);
  }

  pause() {
    console.log("Pause");
    this.setState(this.pauseState);
  }

  setState(newState) {
    this.state = newState;
    this.notify();
  }

  isIdleState() { return this.state.isIdleState(); }
  isGameOverState() { return this.state.isGameOverState(); }
  isPlayState() { return this.state.isPlayState(); }
  isPauseState() { return this.state.isPauseState(); }

  getCurrentBlock() { return this.state.getCurrentBlock(); }
  getNextBlock() { return this.State.getNextBlock(); }
  getShadowBlock() { return this.state.getShodowBlock(); }

  getBoard() {
    return this.board.get();
  }
}

