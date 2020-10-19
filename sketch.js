let oben, unten, links, rechts;
let schueler = [];
let s;
let individuum;
let abstandsvektor;
let abstand;
let kraftbetrag;
let kraftvektorFeld = [];
let kraftArray= [];
let masse = 2.0;
let dt = 0.01;
let geschwindigkeit = [];
let daempfung = 0.99995;
let epsilon = 400;
let sigma = 0.00933;
let schuelerNull = [];
let z;



function setup() {
  createCanvas(700, 700);
  frameRate(60);
  smooth();
  s = 24;
  for (i = 0; i < s; i++) {
    //individuum = createVector(100+i, 100 + 10*i);
    individuum = createVector(random() * 700, random() * 700);
    schueler[i] = individuum;
    geschwindigkeit.push(createVector(0,0));
  }
  //console.log(geschwindigkeit);
}



function draw() {
  background(67, 100, 250);
  
  kraft();
  
  bewegung();
  
  for (m = 0; m < s; m++) {
    fill(59, 245, 103);
    noStroke();
    circle(schueler[m].x, schueler[m].y, 4);
  }
  
    
  push();
  strokeWeight(0.5);
  for (z = 0; z < schuelerNull.length; z++) {
    stroke(255, 209, 48, 255 * z / schuelerNull.length);
    if (z > 0) {
      line(schuelerNull[z].x, schuelerNull[z].y, schuelerNull[z-1].x, schuelerNull[z-1].y)
    }
  }
  pop();
  
}




function kraft() {  
  for (j = 0; j < s; j++) {
    let gesamtkraft = createVector(0,0);
       
    for (k = 0; k < s; k++) {
      if (j != k) {
        
        abstandsvektor = p5.Vector.sub(schueler[j], schueler[k]);
        abstand = Math.sqrt(abstandsvektor.x * abstandsvektor.x + abstandsvektor.y * abstandsvektor.y);
        kraftbetrag = 4 * epsilon * (-(6 * pow(sigma, 1) * pow(abstand, -2)) + (12 * pow(sigma, 2) * pow(abstand, -3)));
        
        kraftbetrag = constrain(kraftbetrag, -2.0, 2.0);
        
        gesamtkraft.add(abstandsvektor.div(abstand).mult(kraftbetrag));
      }
    
    kraftArray[j] = gesamtkraft;
    }
    
  }
  return kraftArray;
}



function bewegung() {
  for (let l = 0; l < s; l++) {
    let beschleunigung = kraftArray[l];
    geschwindigkeit[l].add(beschleunigung.mult(dt));
    
    if (schueler[l].x < 0) {
      schueler[l].x = 0;
      geschwindigkeit[l].x *= -1;
    }
    else if (schueler[l].x > 700) {
      schueler[l].x = 700;
      geschwindigkeit[l].x *= -1;
    }
    else if (schueler[l].y < 0) {
      schueler[l].y = 0;
      geschwindigkeit[l].y *= -1;
    }
    else if (schueler[l].y > 700) {
      schueler[l].y = 700;
      geschwindigkeit[l].y *= -1;
    }
    
    geschwindigkeit[l].mult(daempfung);
    schueler[l].add(geschwindigkeit[l]);
    
    if (l == 0) {
      schuelerNull.push(createVector(schueler[0].x, schueler[0].y));
    }
    
    if (schuelerNull.length > 2000) {
      schuelerNull.splice(0,1);
    }
    
    
  }
  
  return schueler;
  
}





