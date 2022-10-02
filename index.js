const {Engine, Render, Runner, World, Bodies} = Matter;// It is for using Matter.js library
//for reading purposes
const cells = 3;
const width = 600;
const height = 600;


const engine = Engine.create();
const {world} = engine;
const render = Render.create({//It will not destroy the body element, instead it will add new elements to body
    element: document.body,
    engine: engine,
    options: {
        wireframes: true,
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

const grid = Array(cells).fill(null).map(() => {
    return Array(cells).fill(false)
});

const verticals = Array(cells).fill(null).map(() => Array(cells-1).fill(false));
const horizontals = Array(cells-1).fill(null).map(() => Array(cells)).fill(false));

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
        [row-1, column],
        [row, column-1],
        [row+1, column],
        [row, column+1]
    ]
    //FOR EACH NEIGHBOR

    //See if that neighbor is out of bounds

    //If we have visited that neighbor, continue to next neighbor

    //Remove a wall from either horizontals and verticals

    //Visit next cell
};


stepThroughCell(startRow,startColumn);


