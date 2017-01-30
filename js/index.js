//INICIALIZANDO VARIÁVEIS GLOBAIS
var canvas,
    ctx,
    W = 340,
    H = 600;

//OBJETO PLANETA
var planet = {
    x: W / 2,
    y: H  - 30,
    r: W / 3,
    //Raios necessarios para objetos elipticos
    //rx: W / 1.5,
    //ry: W / 3,
    update: function(){
    },
    render: function(){
        //PLANETA
        ctx.beginPath();
        ctx.fillStyle = "blue";
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        //adicionando funcao para planeta eliptico
        //ctx.ellipse(this.x, this.y, this.rx, this.ry, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
    }
}

//OBJETO ORBITA
var orbit = {
    x: planet.x,
    y: planet.y,
    r: planet.r + (H / 8) * 0.5,
    //Raios necessarios para objetos elipticos
    //rx: planet.rx + (H / 8) * 0.5,
    //ry: planet.ry + (H / 8) * 0.5,
    orbitVel: 3,
    update: function(){
        this.orbitVel += 0.01;
    },
    render: function(){
         //ORBITA
        ctx.beginPath();
        ctx.setLineDash([5, 5]);
        ctx.lineWidth = 0.5;
        ctx.strokeStyle = "gray";
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        //adicionando funcao para orbita eliptica
        //ctx.ellipse(this.x, this.y, this.rx, this.ry, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.closePath();
        
        //OBJETO ORBITANDO
        ctx.beginPath();
        ctx.fillStyle = "gray";
        ctx.arc(this.x + Math.cos(this.orbitVel) * (this.r), this.y + Math.sin(this.orbitVel) * (this.r), 20, 0, Math.PI * 2);
        //Adicionando funcao para orbitar de forma eliptica
        //ctx.ellipse(this.x + Math.cos(this.orbitVel) * (this.rx), this.y + Math.sin(this.orbitVel) * (this.ry), 20, 20, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();       
    }
}

//ATUALIZAÇÕES GERAIS
function update(){
    planet.update();
    orbit.update();
}

//RENDERIZAÇÕES GERAIS
function render(){
    ctx.clearRect(0, 0, W, H);
    planet.render();
    orbit.render();
}

function loop(){
    update();
    render();
    window.requestAnimationFrame(loop);
}

//INICIA JOGO
function app(){
    canvas = document.createElement('canvas');
    canvas.width = W;
    canvas.height = H;
    ctx = canvas.getContext('2d');
    document.body.appendChild(canvas);
    loop();
}