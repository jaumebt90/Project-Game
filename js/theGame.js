const theGame = {
  ctx: undefined,
  canvasSize: { w: undefined, h: undefined },
  intervalId: undefined,
  framesCounter: 0,
  speed: 4,
  score: 0,
  zombie: [],


  init(canvas) {
    this.setContext(canvas);
    this.setCanvasDimensions(canvas);
    const body = document.querySelector("#main");
    body.classList.remove("body-graveyard");
    body.classList.add("body-background");
    this.createNewKid();
    this.setListeners();
    this.gameStart();
    let music = document.getElementById('musica');
    music.play();
  },

  setContext(canvas) {
    this.ctx = canvas.getContext("2d");
  },

  setCanvasDimensions(canvas) {
    this.canvasSize.w = 1200;
    this.canvasSize.h = 900;
    canvas.setAttribute("width", this.canvasSize.w);
    canvas.setAttribute("height", this.canvasSize.h);
  },

  

  createNewKid() {
    this.newKid = new Kid(this.ctx, 110, 110, this.canvasSize);
  },

  setListeners() {
    document.addEventListener("keydown", (e) => {
      e.key === "ArrowLeft" ? (this.newKid.moveLeft = true) : null;
      e.key === "ArrowRight" ? (this.newKid.moveRight = true) : null;
    });

    document.addEventListener("keyup", (e) => {
      e.key === "ArrowLeft" ? (this.newKid.moveLeft = false) : null;
      e.key === "ArrowRight" ? (this.newKid.moveRight = false) : null;
    });
  },

  gameStart() {
    this.intervalId = setInterval(() => {
      this.clearCanvas();
      this.checkIfCollision();
      this.drawAll();

      this.newKid.move();

      this.framesCounter++;

      if (this.framesCounter % 100 === 0) {
        this.score++;
      }

      if (this.framesCounter % 25 === 0) {
        this.createNewZombie();
      }
    }, 1000 / 60);
  },

  drawAll() {
    this.newKid.drawKid();
    this.showScores();
    this.zombie.forEach((zombie) => zombie.draw());
  },

  createNewZombie() {
    const xRandomPosition = Math.trunc(
      Math.random() * (this.canvasSize.w - 100)
    );

    const newZombie = new Zombie(
      this.ctx,
      130,
      130,
      this.canvasSize,
      xRandomPosition,
      this.speed
    );

    this.zombie.push(newZombie);
  },

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h);
  },

  showScores() {
    this.ctx.font = "30px Verdana";
    this.ctx.fillStyle = "black";
    this.ctx.fillText("Score: " + this.score, 0, 25);
  },

  checkIfCollision() {
    if (this.zombie.length) {
      this.zombie.forEach((elem) => {
        elem.draw();

        if (
          this.newKid.kidPosition.x <
            elem.zombiePosition.x + elem.zombieSize.w &&
          this.newKid.kidPosition.x + this.newKid.kidSize.w >
            elem.zombiePosition.x &&
          this.newKid.kidPosition.y <
            elem.zombiePosition.y + elem.zombieSize.h &&
          this.newKid.kidSize.h + this.newKid.kidPosition.y >
            elem.zombiePosition.y
        ) {
          //clearInterval(this.intervalId)
          this.checkYouDied();
        }
      });
    }
  },

  checkYouDied() {
   
    clearInterval(this.intervalId);
    

    let test = document.getElementById("canvas");
    let ctx = test.getContext("2d");

    let died = new Image();
    died.src = '../images/brains.png';

    ctx.clearRect(0, 0, 1200, 900);
    setTimeout(() => {
      ctx.drawImage(died, 0, 100, 1200, 600);
  }, 700);
    

    setTimeout(() => {
      location.reload();
  }, 3000);
    
  },

 
};
