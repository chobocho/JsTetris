function processEvent(code) {
    switch (code) {
      case 17: console.log("hold");
        gameEngine.hold();
        break;
      case 32: console.log("Bottom");
        gameEngine.moveBottom();
        break;
      case 37: console.log("Left");
        gameEngine.moveLeft();
        break;
      case 38:
        console.log("Up");
        gameEngine.rotate();
        break;
      case 39:
        console.log("Right");
        gameEngine.moveRight();
        break;
      case 40: console.log("Down");
        gameEngine.moveDown();
        break;
      case 80: console.log("Pause");
        gameEngine.pause();
        break;
      case 83: console.log("Start");
        gameEngine.start();
        break;
      default:
        break;
    }
  }
  
  function KeyPressEvent(e) {
    var code = e.keyCode;
    processEvent(code);
  }
  
  function processMouseEvent(x, y) {
    code = drawEngine.getEventCode(x, y);
    console.log("processMouseEvent ", code);
    processEvent(code);
  }
  
  function getMousePosition(event) {
    var x = event.pageX - canvas.offsetLeft;
    var y = event.pageY - canvas.offsetTop;
    return { X: x, Y: y };
  }
  
  function mouseListener(event) {
    switch (event.type) {
      case "mousedown":
        break;
      case "mousemove":
        break;
      case "mouseup":
        pos = getMousePosition(event)
        processMouseEvent(pos.X, pos.Y);
        break;
      case "mouseout":
        break;
    }
  }
  
  function InitValue() {
    tetris = new Tetris(board_width, board_height);
    drawEngine = new DrawEngine(tetris);
    gameEngine = new GameEngine(tetris);
    tetris.init();
  
    canvas.addEventListener("mousedown", mouseListener);
    canvas.addEventListener("mousemove", mouseListener);
    canvas.addEventListener("mouseout", mouseListener);
    canvas.addEventListener("mouseup", mouseListener);
  
    window.onkeydown = KeyPressEvent;
  }
  
  function InitCanvas() {
    height = window.innerHeight;
    width = window.innerWidth;

    if (height == 0 || width == 0) {
      console.log("Error: width == 0");
      width = 412;
      height = 725;
    }
  
    console.log(">Width:", width);
    console.log(">Heigth:", height);
  
    canvas = document.getElementById("canvas");
    canvas.width = width;
    canvas.height = height;
    cvs = canvas.getContext("2d");
  
    bufCanvas = document.createElement("canvas");
    bufCanvas.width = canvas.width;
    bufCanvas.height = canvas.height;
    bufCtx = bufCanvas.getContext("2d");
  }
  
  function DecisionBlockSize() {
    block_size_w = height / (board_height + 7);
    block_size_h = width / (board_width + 6);
    blockSize = block_size_w < block_size_h ? block_size_w : block_size_h;
    startX = (canvas.width - (board_width + 6) * blockSize)/2;
    console.log(blockSize);
  }
  
  function OnDraw() {
    gameEngine.tick();
    drawEngine.OnDraw();
  }
  
  function onLoadPage() {
    InitCanvas();
    DecisionBlockSize();
    InitValue();
    setInterval(OnDraw, 20);
  }
  
  window.onload = onLoadPage();