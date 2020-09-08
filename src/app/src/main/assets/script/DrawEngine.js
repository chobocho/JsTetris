class Button {
  constructor(name, code, x, y, width, height) {
    this.name = name;
    this.code = code;
    this.x1 = x;
    this.y1 = y;
    this.x2 = x + width;
    this.y2 = y + height;
  }

  in(x, y) {
    if (x < this.x1 || x > this.x2 || y < this.y1 || y > this.y2) {
      console.log(this.name, "-1");
      return -1;
    }
    console.log(this.name, this.code);
    return this.code;
  }
}

class IdleDrawEngine extends IdleGameState {
  constructor() {
    super();
  }

  //draw(bufCtx, images) {
    /*
    bufCtx.beginPath();

    if (this.tick > 50) {
      this.tick = 0;
      if (block_move_count > 10) {
        block_ = new IBlock(board_width, board_height);
        block_move_count = 0;
      }
      if (this.tetris.isPlayState()) {
        block_move_count++;
        block_.moveDown();
      }
    }
    this.__drawBlock(bufCtx, block_);
    bufCtx.closePath();
    bufCtx.stroke();
    */
  //}
} 

class PlayDrawEngine extends PlayGameState {
  constructor() {
    super();
  }

  OnDraw(canvas, block, block_image) {
    this.__drawBlock(canvas, block, block_image);
  }
  __drawBlock(canvas_, block, block_image) {
    let _canvas = canvas_;
    let startX = block.x * blockSize;
    let startY = block.y * blockSize;
    for (var y = 0; y < block.h; ++y) {
      for (var x = 0; x < block.w; ++x) {
        if (block.block[block.r][y][x] != 0) {
          _canvas.drawImage(block_image[0], x * blockSize + startX, y * blockSize + startY, blockSize, blockSize);
        }
      }
    }
  }
  
}


class DrawEngine extends Observer {
  constructor(tetris) {
    super();
    this.tetris = tetris;
    this.tetris.register(this);
    this.__LoadImage();
    this.__initValue();
  }

  __LoadImage() {
    this.back_image = LoadImage("img/back.jpg");

    this.left_image = LoadImage("img/left.png");
    this.right_image = LoadImage("img/right.png");
    this.down_image = LoadImage("img/down.png");
    this.bottom_image = LoadImage("img/bottom.png");

    this.rotate_image = LoadImage("img/rotate.png");
    this.play_image = LoadImage("img/play.png");
    this.pause_image = LoadImage("img/pause.png");
    this.hold_image = LoadImage("img/hold.png");

    this.gray_block = LoadImage("img/gray.png");

    this.buttonImage = {};
    this.buttonImage['left'] = this.left_image;
    this.buttonImage['right'] = this.right_image;
    this.buttonImage['down'] = this.down_image;
    this.buttonImage['bottom'] = this.bottom_image;
    this.buttonImage['up'] = this.rotate_image;

    this.buttonImage['hold'] = this.hold_image;
    this.buttonImage['play'] = this.play_image;
    this.buttonImage['pause'] = this.pause_image;

    this.block_image = [];
    this.block_image.push(this.gray_block);
  }

  OnDraw() {
    //console.log("OnDraw()");
    this.__drawBoard();
  }

  __initValue() {
    this.tick = 0;
    let btn_w = blockSize * (board_width + 6) / 4;
    let btn_h = blockSize * 3;
    let image_size = btn_h - 3;

    this.buttons = new Array();
    this.buttons.push(new Button('left', 37, 0, blockSize * (board_height + 4), image_size, image_size));
    this.buttons.push(new Button('right', 39, btn_w * 2, blockSize * (board_height + 4), image_size, image_size));
    this.buttons.push(new Button('down', 40, btn_w, blockSize * (board_height + 4), image_size, image_size));
    this.buttons.push(new Button('up', 38, btn_w * 3, blockSize * (board_height + 4), image_size, image_size));
    this.buttons.push(new Button('bottom', 32, btn_w, blockSize * (board_height + 1), image_size, image_size));
    this.buttons.push(new Button('hold', 17, 0, blockSize * (board_height + 1), image_size, image_size));

    this.playStateButtons = new Array();
    this.playStateButtons.push(new Button('pause', 80, btn_w * 3, blockSize * (board_height + 1), image_size, image_size));

    this.nonPlayStateButton = new Array();
    this.nonPlayStateButton.push(new Button('play', 83, btn_w * 3, blockSize * (board_height + 1), image_size, image_size));

    this.initState = new InitGameState();
    this.idleState = new IdleGameState();
    this.playState = new PlayDrawEngine();
    this.pauseState = new PauseGameState();
    this.gameoverState = new GameoverGameState(); 
    this.state = this.initState;
  }

  __drawBackGround() {
    bufCtx.beginPath();
    bufCtx.drawImage(this.back_image, 0, 0, canvas.width, canvas.height);

    bufCtx.fillStyle = 'lightgray';
    bufCtx.globalAlpha = 0.5;
    bufCtx.fillRect(0, 0, blockSize * board_width, blockSize * board_height);
    bufCtx.globalAlpha = 1.0;

    bufCtx.strokeStyle = 'white';
    for (let y = 0; y <= board_height; y++) {
      bufCtx.moveTo(0, y * blockSize);
      bufCtx.lineTo(blockSize * board_width, y * blockSize);
    }

    for (let x = 0; x <= board_width; x++) {
      bufCtx.moveTo(x * blockSize, 0);
      bufCtx.lineTo(x * blockSize, blockSize * board_height);
    }
    bufCtx.closePath();
    bufCtx.stroke();
  }

  __drawBoard() {
    this.tick++;
    this.__drawBackGround();
    this.__drawKeypad(bufCtx);
    this.state.OnDraw(bufCtx, this.tetris.getCurrentBlock(), this.block_image);
    cvs.clearRect(0, 0, canvas.width, canvas.height);
    cvs.drawImage(bufCanvas, 0, 0);
  }

  __drawKeypad(canvas_) {
    let _canvas = canvas_;

    _canvas.beginPath();

    let btn_h = blockSize * 3;
    let image_size = btn_h - 3;

    this.buttons.forEach(e => {
      _canvas.drawImage(this.buttonImage[e.name], e.x1, e.y1, image_size, image_size);
    });
    
    if (this.tetris.isPlayState()) {
      this.playStateButtons.forEach(e => {
        _canvas.drawImage(this.buttonImage[e.name], e.x1, e.y1, image_size, image_size);
      });
    } else {
      this.nonPlayStateButton.forEach(e => {
        _canvas.drawImage(this.buttonImage[e.name], e.x1, e.y1, image_size, image_size);
      });
    }

    _canvas.closePath();
    _canvas.stroke();
  }

  getEventCode(x, y) {
    console.log("GetEventCode:", x, y);

    let result = -1;

    this.buttons.forEach(e => {
      let code = e.in(x, y);
      if (code != -1) {
        result = code;
      }
    });

    if (this.tetris.isPlayState()) {
      this.playStateButtons.forEach(e => {
        let code = e.in(x, y);
        if (code != -1) {
          result = code;
        }
      });
    } else {
      this.nonPlayStateButton.forEach(e => {
        let code = e.in(x, y);
        if (code != -1) {
          result = code;
        }
      });
    }
    return result;
  }

  update(state) {
    console.log("Observer update: ", state);
    switch(state) {
      case 0:
        this.state = this.initState;
        break;
      case 1:
        this.state = this.idleState;
        break;
      case 2:
        this.state = this.playState;
        break;
      case 3:
        this.state = this.pauseState;
        break;
      case 4:
        this.state = this.gameoverState;
        break;
      default:
        console.log("Error: Unknown state ", state);
        break;
    }
  }
}
