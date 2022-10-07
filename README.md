
# maze_game
 I want to improve my knowledge about Data Structures. In this project It will help me to to this. I am using matter.js library.
![Screenshot_279](https://user-images.githubusercontent.com/51987890/193448702-3ee884f7-eea9-48b2-a1ce-fe696818f6a2.png)


First thing I try is understanding the Matter.js library. To do so, I create a box, and understand using gravity and isSticky property. It helped me to create border for my maze. When I did not give isSticky property to my box, the box was dissappearing. Now however, I insert four more rectangles to create borders, and give them 'isSticky: true' property.
![Screenshot_280](https://user-images.githubusercontent.com/51987890/193448815-e2a9bb57-19ba-46d3-9b05-5d857bcd7df8.png)


Now the box is not dissappearing from the screen.

However, I cannot interact the object with mouse. I added 'Mouse' and 'MouseConstraints' properties to do that.

![Screenshot_281](https://user-images.githubusercontent.com/51987890/193449869-92ddf7d2-93aa-4a69-9a6c-fe5516673a47.png)

Using 'MouseConstraints' allowed me to interact with object which is not 'isStatic: true'. Green dot represents 'force' that we use to box. I will use gravity and interaction with mouse element when the user end up finishing the maze correctly.

![Screenshot_287](https://user-images.githubusercontent.com/51987890/193901577-7d8b3977-0b8c-4180-88f5-f870043bc5ba.png)

With the help of maze algorithm and rendering, the app can generate randomized maze. In addition, software developer can easily edit settings.


![Screenshot_289](https://user-images.githubusercontent.com/51987890/194598482-f4cb410f-b879-4bec-8145-ec14bb5ce258.png)

Now, the walls are red and the ball's color is green. When the user finished the maze successfully, the maze will fall apart, and maze will tell to the user that he/she has won. Hence, I edited the gravity for the falling apart side, and hide the winning message.

![Screenshot_290](https://user-images.githubusercontent.com/51987890/194598861-a370a368-989b-417d-92a0-6ff74b907c13.png)

