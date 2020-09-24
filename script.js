let canvas = document.getElementById("game")
let context = canvas.getContext("2d")
let size = 20;
let key;

function draw(x, y, color) {
    context.beginPath();
    context.fillStyle = color;
    context.fillRect(size * x, size * y, size, size)
    context.strokeStyle = "white";
    context.strokeRect(size * x, size * y, size, size);
}
let Snake = {
    x: 0,
    y: 0,
    color: "red",
    xSpeed: 0,
    ySpeed: 0,
    tailList: [],
    update() {
        let prevTail = {
            x: this.x,
            y: this.y,
        }
        // console.log(prevTail);
        for (let i = 0; i < this.tailList.length; i++) {
            // console.log(this.tailList[i]);
            let num = this.tailList[i]
            this.tailList[i] = prevTail
            prevTail = num
            // console.log(prevTail);
        }
        this.x += this.xSpeed
        this.y += this.ySpeed
        if (this.x * size > canvas.width - size) {
            this.x = 0
        }
        if (this.y * size > canvas.height - size) {
            this.y = 0
        }
        if (this.x * size < 0) {
            this.x = (canvas.width - size) / size
        }
        if (this.y * size < 0) {
            this.y = (canvas.width - size) / size
        }
    },
    move() {
        window.addEventListener("keydown", e => {
            if (e.keyCode === 37 && key != "RIGHT") {
                this.xSpeed = -1
                this.ySpeed = 0
                key = "LEFT"
            } else if (e.keyCode === 39 && key != "LEFT") {
                this.xSpeed = 1;
                this.ySpeed = 0;
                key = "RIGHT"
            } else if (e.keyCode === 38 && key != "UP") {
                this.xSpeed = 0
                this.ySpeed = -1
                key = "DOWN"
            } else if (e.keyCode === 40 && key != "DOWN") {
                this.xSpeed = 0;
                this.ySpeed = 1
                key = "UP"
            }
        }
        )
    },
    addTail() {
        this.tailList.push({
            x: this.x,
            y: this.y
        })
    },
    death() {
        // console.log(this.x, this.y);
        for (let i = 0; i < this.tailList.length; i++) {
            // console.log(this.tailList[i].x, this.tailList[i].y);
            if (this.tailList.length > 1) {
                if (this.x === this.tailList[i].x && this.y === this.tailList[i].y) {
                    context.beginPath()
                    context.font = "30px Arial"
                    context.fillStyle = "White"
                    context.fillText("You Lost", 200, 250)
                    clearInterval(run)
                }
            }
        }
    }
}

let Item = {
    x: 0,
    y: 0,
    color: "blue",
    randomPosition() {
        this.x = Math.floor(Math.random() * canvas.width / size)
        this.y = Math.floor(Math.random() * canvas.height / size)
    }
}
let clearScreen = (ctx) => {
    ctx.fillStyle = "black"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
}
window.onload = () => {
    run = setInterval(() => {
        clearScreen(context)
        Snake.update()
        Snake.move()
        Snake.death()
        if (Snake.x === Item.x && Snake.y === Item.y) {
            Snake.addTail()
            Item.randomPosition()
        }
        for (let i = 0; i < Snake.tailList.length; i++) {
            let num = Snake.tailList[i]
            draw(num.x, num.y, Snake.color)
        }
        draw(Item.x, Item.y, Item.color)
    }, 100);

}


