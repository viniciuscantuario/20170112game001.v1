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
    update: function(){
    },
    render: function(){
        //PLANETA
        ctx.beginPath();
        ctx.fillStyle = "#F4F4F4";
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
    }
}

//OBJETO ORBITA
var orbit = {
    x: planet.x,
    y: planet.y,
    r: planet.r + (H / 8) * 0.5,
    orbitVel: 3,
    update: function(){
        this.orbitVel += 0.01;
    },
    render: function(){
         //ORBITA
        ctx.beginPath();
        ctx.setLineDash([5, 5]);
        ctx.lineWidth = 0.5;
        ctx.strokeStyle = "#CCC";
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.stroke();
        ctx.closePath();
        
        //OBJETO ORBITANDO
        ctx.beginPath();
        ctx.fillStyle = "#CCC";
        ctx.arc(this.x + Math.cos(this.orbitVel) * (this.r), this.y + Math.sin(this.orbitVel) * (this.r), 20, 0, Math.PI * 2);
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