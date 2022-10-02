const {Engine, Render, Runner, World, Bodies} = Matter;// It is for using Matter.js library
//for reading purposes
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


