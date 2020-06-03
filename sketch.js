const flock=[];
let button;

var choicedraw=0;
var drawornot='NO';

var choicewalls=0;
var wallsornot='NO';

var choicepoint=0;
var pointornot='POINTS';

let s1,s2,s3;
let walls=[];
let obstacles=[];
function setup() {
  // put setup code here
    
    createCanvas(600,600);
    for(let i=0;i<100;i++)
        flock.push(new boids());
    
    
    s1=createSlider(0,2,1,0.1);
    s1.position(10,10);
    s2=createSlider(0,2,1,0.1);
    s2.position(160,10);
    s3=createSlider(0,2,1,0.1);
    s3.position(320,10);
    
    button=createButton("DRAW");
    button.position(480,10);
    button.mousePressed(changeChoice);
    
    button=createButton("WALLS");
    button.position(480,40);
    button.mousePressed(changeWalls);
    
    button=createButton("SHAPE");
    button.position(480,70);
    button.mousePressed(changeShape);
    
        for(let i=0;i<width;i+=50)
        {
            walls.push(createVector(i,0));
            walls.push(createVector(i,height));
        }
        for(let i=0;i<height;i+=50)
        {
            walls.push(createVector(0,i));
            walls.push(createVector(width,i));
        }
}


function changeChoice()
{
    if(choicedraw===1)
        {
            choicedraw--;
            drawornot='NO';
        }
    else
        {
            choicedraw++;
            drawornot='YES';
        }
}

function changeWalls()
{
    if(choicewalls===1)
        {
            choicewalls--;
            wallsornot='NO';
        }
    else
        {
            choicewalls++;
            wallsornot='YES';
        }
}

function changeShape()
{
    if(choicepoint===1)
        {
            choicepoint--;
            pointornot='POINTS';
        }
    else
        {
            choicepoint++;
            pointornot='LINES';
        }
}


function mousePressed()
{
    obstacles=[];
}

function draw() {
  // put drawing code here
    background(0,0,0);
    
    textSize(15);
    fill(255,0,0);
    strokeWeight(4);
    stroke(255);
    text('alignment', 10, 40);
    text('cohesion', 160, 40);
    text('repulsion', 320, 40);
    text(drawornot,535,25);
    text(wallsornot,535,55);
    text(pointornot,535,85);
        
    for(let b of flock)
        {
            b.align(flock);
            if(choicewalls===1)
                {
                    b.repulsewalls(walls);
                }
            b.repulseobstacles(obstacles);
            b.cohese(flock);
            b.repulse(flock);
            b.move();
            b.stayOnScreen();
            b.show();
        }
    if(choicedraw===1)
        {
            if(mouseIsPressed===true)
            {
                obstacles.push(createVector(mouseX,mouseY));
            }
        }
    
    
    noFill();
    beginShape();
    for(let pt of obstacles)
        {
            vertex(pt.x,pt.y);
        }
    endShape();
    
}