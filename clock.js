y = 430;
var cy = []; // Random cloud x coordinate
var cx = []; // Random cloud y coordinate
var sx = []; // Random star x coordinate
var sy = []; // Random star random y coordinate
var c = []; // Random colours for balloons
var bx = []; // Random balloon x coordinate
var by = [];// Random balloon y coordinate

function setup() {
  
  createCanvas(800, 800);
 
  // Daytime - a cloud will pop up every hour
  for (d = 0; d <= 23; d++){
    cx[d] = random(50, width - 50) // Make sure they are on screen
    cy[d] = random(50, height - 50)
   }
  
  // Nighttime - a star will pop up every hour
  for (s = 0; s <= 23; s++){
    sx[s] = random(25, 5 * width - 25) // Make sure they are on screen (accounting for the scaling done)
    sy[s] = random(25, 5 * height - 25)
  }
  
  // Minutes - a new balloon will pop up every minute
  for (i=0; i<= 60; i++){
    c[i] = color(random(255), random(255), random(255))
    bx[i] = random(150, 650)
    by[i] = random(400, 700)
 }
}

function draw() {
  
  let hr = hour();
  let mn = minute();
  let sc = second();

    // Although sunrise and sunset are not 12hrs separated, if the times are not 12hrs separated the screen will not differentiate between 6am and 6pm as both will be in 'nighttime'
  
  // Nighttime - draw stars if the time is between 6pm and 6am
  if (hr <= 6 || hr > 18){      
    background('#03012C');
    star();
  }
  
 // Daytime - draw clouds if the time is between 6am and 6pm
  else {
    background('#ADD8E6');
    cloud();
  }
  
  //clock(); - this was commented out after the balloon visual was created. It was the original design idea. 
  
  // Represent minutes by the number of balloons, and seconds by them floating up the screen
  translate(0, -10 * sc) 
  balloon();
  
} 

function cloud(){
  
  let hr = hour() % 12;
  
  // Generate a cloud for each hour (12 hour clock)
  
  for (var d = 0; d < hr; d++){
    
      strokeWeight(25) 
      stroke('#FFFFFF')
      ellipse(cx[d], cy[d], 40, 30);
      ellipse(cx[d] + 30, cy[d] - 15, 40, 30);
      ellipse(cx[d] + 40, cy[d], 40, 30);
      ellipse(cx[d] + 20, cy[d] + 15, 40, 30);
    }
}


function star(){
  
  let hr = hour() % 12;
  
 // Generate a star for each hour (12 hour clock)
  
  for (var s = 0;  s < hr; s++){

    push();
    
    stroke('#FFCD3C')
    strokeWeight(10)
    
    beginShape();
      scale(0.2)
      vertex(sx[s], sy[s]); // Top
      vertex(sx[s] + 14, sy[s] + 30);
      vertex(sx[s] + 47, sy[s] + 35);
      vertex(sx[s] + 23, sy[s] + 57);
      vertex(sx[s] + 29, sy[s] + 90);
      vertex(sx[s], sy[s] + 75);
      vertex(sx[s] - 29, sy[s] + 90);
      vertex(sx[s] - 23, sy[s] + 57);
      vertex(sx[s] - 47, sy[s] + 35);
      vertex(sx[s] - 14, sy[s] + 30);
    endShape(CLOSE);
    
    pop()
  }
}

function balloon(){
  
  let mn = minute();
  
  // Generate a balloon for each minute 
  
  for (var m = 0; m < mn; m++){
    
    stroke('#FFFFFF')
    strokeWeight(1)
    line(width/2, 750, bx[m], by[m])
    strokeWeight(25)
    stroke(c[m])
    ellipse(bx[m], by[m], 20)
    }
  stroke('#FFFFFF')
  strokeWeight(1)
  line(width/2, 750, width/2, 800)
}

// I have left my original clock code in as a demonstration of my original design idea before I met with Professor Swineheart after class. It was instead of the balloon visualisation, although the clouds/stars were the same. 

function clock(){
  
  angleMode(DEGREES);
  
  translate(400, 400);
  rotate(-90);

  let mn = minute();
  let sc = second();
  
  // Generate the inner circle representing seconds
  strokeWeight(6); // Low stroke weight
  noFill();
  stroke('#6667ab');
  let secondAngle = map(sc, 0, 60, 0, 360); // Mark how far the circle should reach every second, mapping the 60 seconds to a 360 degree circle
  arc(0, 0, 340, 340, 0, secondAngle); // Draw the circle to this point, centred on the origin and with 260 width/height

  // Generate the middle circle representing minutes
  strokeWeight(8); // Medium stroke weight
  noFill();
  stroke('#cc2936');
  let minuteAngle = map(mn, 0, 60, 0, 360); // Mark how far the circle should reach every minute, mapping the 60 minutes to a 360 degree circle
  arc(0, 0, 370, 370, 0, minuteAngle); // Draw the circle to this point, centred on the origin and with 280 width/height

  
}




  