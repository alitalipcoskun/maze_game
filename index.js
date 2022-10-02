const {Engine, Render, Runner, World, Bodies} = Matter;// It is for using Matter.js library

const engine = Engine.create();
const {world} = engine;
const render = Render.create({//It will not destroy the body element, instead it will add new elements to body
    element: document.body,
    engine: engine,
    options: {
        width: 800,
        height: 600,
    }
});

Render.run(render);
Runner.run(Runner.create(), engine);

// Walls
const walls = [
    Bodies.rectangle(400, 0, 800, 40, {
        isStatic: true,
    }),
    Bodies.rectangle(400,600,800,40, {
        isStatic: true,
    }),
    Bodies.rectangle(0,300, 40, 600, {
        isStatic: true,
    }),
    Bodies.rectangle(800,300, 40, 600, {
        isStatic: true,
    }),
]

const square = Bodies.rectangle(200,200, 40,40);

World.add(world, walls);
World.add(world, square);
