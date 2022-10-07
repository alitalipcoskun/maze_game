const {Engine, Render, Runner, World, Bodies, Body,Events} = Matter;// It is for using Matter.js library
//for reading purposes
const cellsHorizontal = 15;
const cellsVertical = 10;
const width = window.innerWidth;
const height = window.innerHeight;
const wallSize =  5;

const unitLengthX = width/cellsHorizontal;
const unitLengthY = height/cellsVertical;


const engine = Engine.create();
engine.world.gravity.y = 0;
const {world} = engine;
const render = Render.create({//It will not destroy the body element, instead it will add new elements to body
    element: document.body,
    engine: engine,
    options: {
        wireframes: false,
        width,
        height,
    }
});

Render.run(render);
Runner.run(Runner.create(), engine);



// Walls
const walls = [
    Bodies.rectangle(width/2, 0, width, 2, {
        isStatic: true,
    }),
    Bodies.rectangle(width/2,height,width,2, {
        isStatic: true,
    }),
    Bodies.rectangle(0,height/2, 2, height, {
        isStatic: true,
    }),
    Bodies.rectangle(width,height/2, 2, height, {
        isStatic: true,
    }),
]

World.add(world, walls);

//Maze Generation

const shuffle = (arr) => {
    let counter = arr.length;

    while(counter > 0){
        const index = Math.floor(Math.random()* counter);
        counter--;
        const temp = arr[counter];
        arr[counter] = arr[index];
        arr[index] = temp;
    }

    return arr;
}

const grid = Array(cellsVertical).fill(null).map(() => {
    return Array(cellsHorizontal).fill(false)
});

const verticals = Array(cellsVertical).fill(null).map(() => Array(cellsHorizontal-1).fill(false));
const horizontals = Array(cellsVertical-1).fill(null).map(() => Array(cellsHorizontal).fill(false));

const startRow = Math.floor(Math.random()*cellsVertical);
const startColumn = Math.floor(Math.random()*cellsHorizontal);

const stepThroughCell = (row,column) => {
    //If I have visited the cell at [row, column] then return
    if(grid[row][column] === true){
        return;
    }
    //Mark this sell as being visited.
    grid[row][column] = true;
    //Assemble randomly-ordered list of neighbors
    const neighbors = shuffle([
        [row-1, column, 'up'],
        [row, column-1, 'left'],
        [row+1, column, 'down'],
        [row, column+1, 'right']
    ]);
    //FOR EACH NEIGHBOR
    for(let neighbor of neighbors){
     const [nextRow, nextColumn, direction] = neighbor;
    //See if that neighbor is out of bounds
    if(nextRow < 0 || nextRow >= cellsVertical || nextColumn < 0 || nextColumn >= cellsHorizontal){
        continue;
    }
    //If we have visited that neighbor, continue to next neighbor
    if(grid[nextRow][nextColumn] === true){
        continue;
    }
    //Remove a wall from either horizontals and verticals
    if(direction === 'left'){
        verticals[row][column-1] = true;
    }
    else if(direction === 'right'){
        verticals[row][column] =  true;
    }
    else if(direction === 'up'){
        horizontals[row-1][column] = true;
    }else if(direction === 'down'){
        horizontals[row][column] = true;
    }
    stepThroughCell(nextRow, nextColumn);
    }
    
};


stepThroughCell(startRow,startColumn);

horizontals.forEach((row, rowIndex) => {
    row.forEach((open, columnIndex) => {
        if(open){
            return;
        }
        const wall = Bodies.rectangle(
            columnIndex * unitLengthX + unitLengthX/2,
            rowIndex * unitLengthY + unitLengthY,
            unitLengthX,
            wallSize,
            {
                label: 'wall',
                isStatic: true,
                render: {
                    fillStyle: 'red',
                }
            }
        );
        World.add(world, wall);
    });
});

verticals.forEach((row, rowIndex) => {
    row.forEach((open, columnIndex) => {
        if(open){
            return;
        }
        const wall = Bodies.rectangle(
            columnIndex * unitLengthX + unitLengthX,
            rowIndex * unitLengthY + unitLengthY/2,
            wallSize,
            unitLengthY,
            {   
                label: 'wall',
                isStatic: true,
                render: {
                    fillStyle: 'red',
                }
            }
        )
        World.add(world, wall);
    });
});

//Goal
const goal = Bodies.rectangle(
    width- unitLengthX/2,
    height - unitLengthY/2,
    unitLengthX * .6,
    unitLengthY * .6,
    {
        isStatic: true,
        label: 'goal',
        render: {
            fillStyle: 'green',
        }
    }
);

World.add(world,goal);

//Ball
const ballRadius = Math.min(unitLengthX,unitLengthY) / 4;
const ball = Bodies.circle(
    unitLengthX/2,
    unitLengthY/2,
    ballRadius,
    {
        label: 'ball',
        render: {
            fillStyle: 'blue',
        }
    }
)
World.add(world,ball);

document.addEventListener('keydown', event => {
    const {x, y} = ball.velocity;

    if(event.key === 'w'){
        Body.setVelocity(ball, {x, y: y -1});
    }
    if(event.key === 's'){
        Body.setVelocity(ball, {x, y: y +1});
    }
    if(event.key === 'd'){
        Body.setVelocity(ball, {x: x+1, y});
    }
    if(event.key === 'a'){
        Body.setVelocity(ball, {x: x-1, y});
    }
})

//Win Condition
Events.on(engine, 'collisionStart', event => {
    event.pairs.forEach((collision) => {
        const labels = ['ball', 'goal'];
        if(labels.includes(collision.bodyA.label) && labels.includes(collision.bodyB.label)){
            document.querySelector('.winner').classList.remove('hidden');
            world.gravity.y = 1;
            world.bodies.forEach(body => {
                if(body.label === 'wall'){
                    Body.setStatic(body, false);
                }
            });
        }
    });
});
