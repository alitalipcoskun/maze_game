const {Engine, Render, Runner, World, Bodies, Body} = Matter;// It is for using Matter.js library
//for reading purposes
const cells = 15;
const width = 800;
const height = 800;
const wallSize =  10;

const unitWidth = width/cells;
const unitHeight = height/cells;


const engine = Engine.create();
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
    Bodies.rectangle(width/2, 0, width, 40, {
        isStatic: true,
    }),
    Bodies.rectangle(width/2,height,width,40, {
        isStatic: true,
    }),
    Bodies.rectangle(0,height/2, 40, height, {
        isStatic: true,
    }),
    Bodies.rectangle(width,height/2, 40, height, {
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
        let temp = arr[counter];
        arr[counter] = arr[index];
        arr[index] = temp;
    }
}

const grid = Array(cells).fill(null).map(() => {
    return Array(cells).fill(false)
});

const verticals = Array(cells).fill(null).map(() => Array(cells-1).fill(false));
const horizontals = Array(cells-1).fill(null).map(() => Array(cells).fill(false));

const startRow = Math.floor(Math.random()*cells);
const startColumn = Math.floor(Math.random()*cells);

const stepThroughCell = (row,column) => {
    //If I have visited the cell at [row, column] then return
    if(grid[row][column] === true){
        return;
    }
    //Mark this sell as being visited.
    grid[row][column] = true;
    //Assemble randomly-ordered list of neighbors
    const neighbors = [
        [row-1, column, 'up'],
        [row, column-1, 'left'],
        [row+1, column, 'down'],
        [row, column+1, 'right']
    ];
    //FOR EACH NEIGHBOR
    for(let neighbor of neighbors){
     const [nextRow, nextColumn, direction] = neighbor;
    //See if that neighbor is out of bounds
    if(nextRow < 0 || nextRow >= cells || nextColumn < 0 || nextColumn >= cells){
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
            columnIndex * unitWidth + unitWidth/2,
            rowIndex * unitHeight + unitHeight,
            unitWidth,
            wallSize,
            {
                isStatic: true,
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
            columnIndex * unitWidth + unitWidth,
            rowIndex * unitHeight + unitHeight/2,
            wallSize,
            unitHeight,
            {
                isStatic: true,
            }
        )
        World.add(world, wall);
    });
});

//Goal
const goal = Bodies.rectangle(
    width- (unitWidth/2)-10,
    height - (unitHeight/2)-10,
    unitWidth * .6,
    unitHeight * .6,
    {
        isStatic: true,
    }
);

World.add(world,goal);

//Ball
const ball = Bodies.circle(
    unitWidth/2 + 10,
    unitHeight/2 + 10,
    unitWidth  / 2 * 0.4,
)
World.add(world,ball);

document.addEventListener('keydown', event => {
    const {x, y} = ball.velocity;

    if(event.key === 'w'){
        Body.setVelocity(ball, {x, y: y -5});
    }
    if(event.key === 's'){
        Body.setVelocity(ball, {x, y: y +5});
    }
    if(event.key === 'd'){
        Body.setVelocity(ball, {x: x+5, y});
    }
    if(event.key === 'a'){
        Body.setVelocity(ball, {x: x-5, y});
    }
})
