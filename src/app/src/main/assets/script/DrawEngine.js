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

    let btn_w = blockSize * (board_width + 6) / 4;
    let btn_h = blockSize * 3;
    let image_size = btn_h - 3;

    this.buttons = new Array();
    this.buttons.push(new Button('play', 83, btn_w * 3, blockSize * (board_height + 1), image_size, image_size));
  }

  OnDraw(canvas, tetris, block_image, button_image) {
    this.__drawKeypad(canvas, button_image);
  }

  __drawKeypad(canvas_, button_image) {
    let _canvas = canvas_;

    _canvas.beginPath();

    let btn_h = blockSize * 3;
    let image_size = btn_h - 3;

    this.buttons.forEach(e => {
      _canvas.drawImage(button_image[e.name], e.x1, e.y1, image_size, image_size);
    });
  }
} 

class PlayDrawEngine extends PlayGameState {
  constructor() {
    super();

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
    this.buttons.push(new Button('pause', 80, btn_w * 3, blockSize * (board_height + 1), image_size, image_size));
  }

  OnDraw(canvas, tetris, block_image, button_image) {
    this.__drawCurrentBlock(canvas, tetris.getCurrentBlock(), block_image);
    this.__drawNextBlock(canvas, tetris.getNextBlock(), block_image);
    this.__drawHoldBlock(canvas, tetris.getHoldBlock(), block_image);
    this.__drawKeypad(canvas, button_image);
  }

  __drawCurrentBlock(canvas_, block, block_image) {
    let _canvas = canvas_;
    let startX = block.x * blockSize;
    let startY = block.y * blockSize;
    for (var y = 0; y < block.h; ++y) {
      for (var x = 0; x < block.w; ++x) {
        if (block.block[block.r][y][x] != 0) {
          _canvas.drawImage(block_image[block.type], x * blockSize + startX, y * blockSize + startY, blockSize, blockSize);
        }
      }
    }
  }

  __drawNextBlock(canvas_, block, block_image) {
    let _canvas = canvas_;
    let startX = (board_width + 1) * blockSize;
    let startY = 1 * blockSize;
    for (var y = 0; y < block.h; ++y) {
      for (var x = 0; x < block.w; ++x) {
        if (block.block[block.r][y][x] != 0) {
          _canvas.drawImage(block_image[block.type], x * blockSize + startX, y * blockSize + startY, blockSize, blockSize);
        }
      }
    }
  }

  __drawHoldBlock(canvas_, block, block_image) {
    let _canvas = canvas_;
    let startX = (board_width + 1) * blockSize;
    let startY = 6 * blockSize;
    for (var y = 0; y < block.h; ++y) {
      for (var x = 0; x < block.w; ++x) {
        if (block.block[block.r][y][x] != 0) {
          _canvas.drawImage(block_image[block.type], x * blockSize + startX, y * blockSize + startY, blockSize, blockSize);
        }
      }
    }
  }

  __drawKeypad(canvas_, button_image) {
    let _canvas = canvas_;

    _canvas.beginPath();

    let btn_h = blockSize * 3;
    let image_size = btn_h - 3;

    this.buttons.forEach(e => {
      _canvas.drawImage(button_image[e.name], e.x1, e.y1, image_size, image_size);
    });
  }
}

class PauseDrawEngine extends PauseGameState {
  constructor() {
    super();

    let btn_w = blockSize * (board_width + 6) / 4;
    let btn_h = blockSize * 3;
    let image_size = btn_h - 3;

    this.buttons = new Array();
    this.buttons.push(new Button('play', 83, btn_w * 3, blockSize * (board_height + 1), image_size, image_size));
  }

  OnDraw(canvas, tetris, block_image, button_image) {
    this.__drawKeypad(canvas, button_image);
  }

  __drawKeypad(canvas_, button_image) {
    let _canvas = canvas_;

    _canvas.beginPath();

    let btn_h = blockSize * 3;
    let image_size = btn_h - 3;

    this.buttons.forEach(e => {
      _canvas.drawImage(button_image[e.name], e.x1, e.y1, image_size, image_size);
    });
  }
}

class GameoverDrawEngine extends GameoverGameState {
  constructor() {
    super();

    let btn_w = blockSize * (board_width + 6) / 4;
    let btn_h = blockSize * 3;
    let image_size = btn_h - 3;

    this.buttons = new Array();
    this.buttons.push(new Button('play', 83, btn_w * 3, blockSize * (board_height + 1), image_size, image_size));
  }

  OnDraw(canvas, tetris, block_image, button_image) {
    this.__drawKeypad(canvas, button_image);
  }

  __drawKeypad(canvas_, button_image) {
    let _canvas = canvas_;

    _canvas.beginPath();

    let btn_h = blockSize * 3;
    let image_size = btn_h - 3;

    this.buttons.forEach(e => {
      _canvas.drawImage(button_image[e.name], e.x1, e.y1, image_size, image_size);
    });
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

    this.buttonImage = {};
    this.buttonImage['left'] = this.left_image;
    this.buttonImage['right'] = this.right_image;
    this.buttonImage['down'] = this.down_image;
    this.buttonImage['bottom'] = this.bottom_image;
    this.buttonImage['up'] = this.rotate_image;

    this.buttonImage['hold'] = this.hold_image;
    this.buttonImage['play'] = this.play_image;
    this.buttonImage['pause'] = this.pause_image;

    this.back_block = LoadImage("img/black.png");
    this.blue_block = LoadImage("img/blue.png");
    this.cyan_block = LoadImage("img/cyan.png");
    this.gray_block = LoadImage("img/gray.png");
    this.green_block = LoadImage("img/green.png");
    this.magenta_block = LoadImage("img/magenta.png");
    this.orange_block = LoadImage("img/orange.png");
    this.red_block = LoadImage("img/red.png");
    this.yellow_block = LoadImage("img/yellow.png");

    this.block_image = [];
    this.block_image.push(this.gray_block);
    this.block_image.push(this.blue_block);
    this.block_image.push(this.cyan_block);
    this.block_image.push(this.green_block);
    this.block_image.push(this.magenta_block);
    this.block_image.push(this.orange_block);
    this.block_image.push(this.red_block);
    this.block_image.push(this.yellow_block);
  }

  OnDraw() {
    this.__drawBoard();
  }

  __initValue() {
    this.initState = new InitGameState();
    this.idleState = new IdleDrawEngine();
    this.playState = new PlayDrawEngine();
    this.pauseState = new PauseDrawEngine();
    this.gameoverState = new GameoverDrawEngine(); 
    this.state = this.initState;
  }

  __drawBackGround() {
    bufCtx.beginPath();
    bufCtx.drawImage(this.back_image, 0, 0, canvas.width, canvas.height);

    let startX = 0;
    let startY = 0;

    let board = this.tetris.getBoard();

    bufCtx.globalAlpha = 0.5;
    for (let y = 0; y < board_height; y++) {
      for (let x = 0; x < board_width; x++) {
        bufCtx.drawImage(this.back_block, x * blockSize + startX, y * blockSize + startY, blockSize, blockSize);
      }
    }
    bufCtx.globalAlpha = 1.0;

    for (let y = 0; y < board_height; y++) {
      for (let x = 0; x < board_width; x++) {
        if (board[y][x] == 0) {
          continue;
        }
        bufCtx.drawImage(this.block_image[0], x * blockSize + startX, y * blockSize + startY, blockSize, blockSize);
      }
    }

    bufCtx.closePath();
    bufCtx.stroke();
  }

  __drawBoard() {
    this.__drawBackGround();
    this.state.OnDraw(bufCtx, this.tetris, this.block_image, this.buttonImage);

    cvs.clearRect(0, 0, canvas.width, canvas.height);
    cvs.drawImage(bufCanvas, 0, 0);
  }

  getEventCode(x, y) {
    console.log("GetEventCode:", x, y);

    let result = -1;

    this.state.buttons.forEach(e => {
      let code = e.in(x, y);
      if (code != -1) {
        result = code;
      }
    });

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
