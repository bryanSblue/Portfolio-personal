const canvas = document.getElementById("canvas");
const canvasContext = canvas.getContext("2d");
const pacmanFrames = document.getElementById("animations");
const fantasmas = document.getElementById("ghosts");

let createRect = (x, y, ancho, alto, color) => { //Recta de paredes
    canvasContext.fillStyle = color;
    canvasContext.fillRect(x, y, ancho, alto);
}

let fps = 30;
let oneBlockSize = 20;
let colorDePared = "#342DCA";
let wallSpaceWidth = oneBlockSize / 1.3; // <- Anchura de las líneas de las paredes
let wallOffset = (oneBlockSize - wallSpaceWidth) / 2;
let wallInnerColor = "black";

const direction_right = 4;
const direction_up = 3;
const direction_left = 2;
const direction_bottom = 1;

let mapa = [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,2,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,2,1],
    [1,2,1,1,1,2,1,1,1,2,1,2,1,1,1,2,1,1,1,2,1],
    [1,2,1,1,1,2,1,1,1,2,1,2,1,1,1,2,1,1,1,2,1], 
    [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
    [1,2,1,1,1,2,1,2,1,1,1,1,1,2,1,2,1,1,1,2,1],
    [1,2,2,2,2,2,1,2,2,2,1,2,2,2,1,2,2,2,2,2,1],
    [1,1,1,1,1,2,1,1,1,2,1,2,1,1,1,2,1,1,1,1,1],
    [0,0,0,0,1,2,1,2,2,2,2,2,2,2,1,2,1,0,0,0,0],
    [1,1,1,1,1,2,1,2,1,1,2,1,1,2,1,2,1,1,1,1,1],
    [2,2,2,2,2,2,2,2,1,2,2,2,1,2,2,2,2,2,2,2,2],
    [1,1,1,1,1,2,1,2,1,2,2,2,1,2,1,2,1,1,1,1,1],
    [0,0,0,0,1,2,1,2,1,1,1,1,1,2,1,2,1,0,0,0,0],
    [0,0,0,0,1,2,1,2,2,2,2,2,2,2,1,2,1,0,0,0,0],
    [1,1,1,1,1,2,2,2,1,1,1,1,1,2,2,2,1,1,1,1,1],
    [1,2,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,2,1],
    [1,2,1,1,1,2,1,1,1,2,1,2,1,1,1,2,1,1,1,2,1],
    [1,2,2,2,1,2,2,2,2,2,2,2,2,2,2,2,1,2,2,2,1],
    [1,1,2,2,1,2,1,2,1,1,1,1,1,2,1,2,1,2,2,1,1],
    [1,2,2,2,2,2,1,2,2,2,1,2,2,2,1,2,2,2,2,2,1],
    [1,2,1,1,1,1,1,1,1,2,1,2,1,1,1,1,1,1,1,2,1],
    [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
];

let gameLoop = () => {
    update();
    draw();
} 

let update = () => {
    pacman.moveProcess();
}

let draw = () => {
    createRect(0, 0, canvas.width, canvas.height, "black");
    drawWalls();
    pacman.draw();
}

let gameInterval = setInterval(gameLoop, 1000/fps); 

let drawWalls = () => { //Dibujo de paredes
    for(let i = 0; i < mapa.length; i++) {
        for(let j = 0; j < mapa[0].length; j++) { // hacer prueba quitando longitud del mapa por cant columnas
            if(mapa[i][j] == 1) { // <- Dibuja las paredes
                createRect(
                    j * oneBlockSize, 
                    i * oneBlockSize, 
                    oneBlockSize, 
                    oneBlockSize, 
                    colorDePared
                );
                if (j > 0 && mapa[i][j - 1] == 1) { // <- Hace que los bloques horizontales tengan transparencia
                    createRect(
                        j * oneBlockSize, 
                        i * oneBlockSize + wallOffset, 
                        wallSpaceWidth + wallOffset, 
                        wallSpaceWidth, 
                        wallInnerColor
                    );
                }
                if(j < mapa[0].length -1 && mapa[i][j + 1] == 1) {
                    createRect(
                        j * oneBlockSize + wallOffset, 
                        i * oneBlockSize + wallOffset, 
                        wallSpaceWidth + wallOffset, 
                        wallSpaceWidth, 
                        wallInnerColor
                    );
                }
                if(i > 0 && mapa[i - 1][j] == 1) {
                    createRect(
                        j * oneBlockSize + wallOffset,
                        i * oneBlockSize, 
                        wallSpaceWidth,
                        wallSpaceWidth + wallOffset, 
                        wallInnerColor
                    );
                }
                if(i < mapa.length - 1 && mapa[i + 1][j] == 1) {
                    createRect(
                        j * oneBlockSize + wallOffset, 
                        i * oneBlockSize + wallOffset, 
                        wallSpaceWidth, 
                        wallSpaceWidth + wallOffset, 
                        wallInnerColor
                    );
                }
            }
        }
    }
}

let createNewPacman = () => {
    pacman = new Pacman(oneBlockSize, oneBlockSize, oneBlockSize, oneBlockSize, oneBlockSize / 5);
}

createNewPacman();
gameLoop();