class boids
    {
        constructor()
        {
            this.position=createVector(random(width),random(height));
            this.velocity=createVector(random(-1,1),random(-1,1));
            this.velocity.setMag(random(1,2));
            this.acceleration=createVector();

            this.maxSpeed=6;
            this.maxForce=0.3;

            this.radius=10;//random(5,12);
            this.R=random(100,255);
            this.G=random(100,255);
            this.B=random(100,255);
        }

        align(birds,af)
        {
            let perceptionRadius=70;
            let acc=createVector();
            let ctr=0;
            for(let bird of birds)
                {
                    let distan=dist(this.position.x,this.position.y,bird.position.x,bird.position.y);
                    if(this.position!=bird.position && distan<perceptionRadius)
                    {
                        acc.add(bird.velocity);
                        ctr++;
                    }
                }
            if(ctr>0)
                {
                    acc.div(ctr);
                    acc.setMag(this.maxSpeed);
                    acc.sub(this.velocity);
                    acc.limit(this.maxForce);
                }
            this.acceleration.add(acc.mult(s1.value()));
        }

        cohese(birds)
        {
            let perceptionRadius=70;
            let acc=createVector();
            let ctr=0;
            for(let bird of birds)
                {
                    let distan=dist(this.position.x,this.position.y,bird.position.x,bird.position.y);
                    if(this.position!=bird.position && distan<perceptionRadius)
                    {
                        acc.add(bird.position);
                        ctr++;
                    }
                }
            if(ctr>0)
                {
                    acc.div(ctr);
                    //acc.setMag(this.maxSpeed);
                    acc.sub(this.position);
                    acc.limit(this.maxForce);
                }
            this.acceleration.add(acc.mult(s2.value()));
        }

        repulse(birds)
        {
            let perceptionRadius=30;
            let acc=createVector();
            let ctr=0;
            for(let bird of birds)
                {
                    let distan=dist(this.position.x,this.position.y,bird.position.x,bird.position.y);
                    if(this.position!=bird.position && distan<perceptionRadius)
                    {
                        let d=p5.Vector.sub(this.position,bird.position);
                        d.div(distan);
                        acc.add(d);
                        ctr++;
                    }
                }

            if(ctr>0)
                {
                    acc.div(ctr);
                    acc.setMag(this.maxSpeed);
                    acc.sub(this.velocity);
                    acc.limit(this.maxForce*1.5);
                }
            this.acceleration.add(acc.mult(s3.value()));
        }

        repulsewalls(walls) //reppels walls ie: array with evvery 10th border point added and repelled with EXTRA force that boid-boid repusion
        {
            let perceptionRadius=40;
            let acc=createVector();
            let ctr=0;
            for(let wall of walls)
                {
                    let distan=dist(this.position.x,this.position.y,wall.x,wall.y);
                    if(this.position!=wall && distan<perceptionRadius)
                    {
                        let d=p5.Vector.sub(this.position,wall);
                        d.div(distan);
                        acc.add(d);
                        ctr++;
                    }
                }


            if(ctr>0)
                {
                    acc.div(ctr);
                    acc.setMag(this.maxSpeed);
                    acc.sub(this.velocity);
                    acc.limit(this.maxForce*1.5);
                }
            this.acceleration.add(acc.mult(2));
        }

        repulseobstacles(walls) //reppels walls ie: array with every obstacle point added and repelled with EXTRA force that boid-boid repusion
        {
            let perceptionRadius=30;
            let acc=createVector();
            let ctr=0;
            if(walls.length==0)
                return;
            for(let wall of walls)
                {
                    let distan=dist(this.position.x,this.position.y,wall.x,wall.y);
                    if(this.position!=wall && distan<perceptionRadius)
                    {
                        let d=p5.Vector.sub(this.position,wall);
                        d.div(distan);
                        acc.add(d);
                        ctr++;
                    }
                }


            if(ctr>0)
                {
                    acc.div(ctr);
                    acc.setMag(this.maxSpeed);
                    acc.sub(this.velocity);
                    acc.limit(this.maxForce*1.5);
                }
            this.acceleration.add(acc.mult(2));
        }


        move()
        {
            this.velocity.add(this.acceleration);
            this.velocity.limit(this.maxSpeed);
            this.position.add(this.velocity);
            this.acceleration.mult(0);
        }

        show()
        {
            stroke(this.R,this.G,this.B);
            strokeWeight(this.radius);
            if(choicepoint===0)
                point(this.position.x,this.position.y);
            else
                {
                    let v=createVector();
                    v.add(this.velocity);
                    v.setMag(8);
                    strokeWeight(3);
                    v.add(this.position);
                    line(this.position.x,this.position.y,v.x,v.y);
                }
        }


        stayOnScreen()
        {
            if(this.position.x>width)
                this.position.x=0;
            else if(this.position.x<0)
                this.position.x=width;

            if(this.position.y>height)
                this.position.y=0;
            else if(this.position.y<0)
                this.position.y=height;
        }
    }
