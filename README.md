
# maze_game
 I want to improve my knowledge about Data Structures. In this project It will help me to to this. I am using matter.js library.
![Screenshot_279](https://user-images.githubusercontent.com/51987890/193448702-3ee884f7-eea9-48b2-a1ce-fe696818f6a2.png)


First thing I try is understanding the Matter.js library. To do so, I create a box, and understand using gravity and isSticky property. It helped me to create border for my maze. When I did not give isSticky property to my box, the box was dissappearing. Now however, I insert four more rectangles to create borders, and give them 'isSticky: true' property.
![Screenshot_280](https://user-images.githubusercontent.com/51987890/193448815-e2a9bb57-19ba-46d3-9b05-5d857bcd7df8.png)


Now the box is not dissappearing from the screen.

However, I cannot interact the object with mouse. I added 'Mouse' and 'MouseConstraints' properties to do that.

![Screenshot_281](https://user-images.githubusercontent.com/51987890/193449869-92ddf7d2-93aa-4a69-9a6c-fe5516673a47.png)

Using 'MouseConstraints' allowed me to interact with object which is not 'isStatic: true'. Green dot represents 'force' that we use to box.

