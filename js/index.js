//Declaração das variáveis iniciais
var canvas,
    ctx,
    W               = 340,
    H               = 600,
    status          = 2,
    allStatus       = {
        pres:       0,
        menu:       1,
        play:       2,
        lose:       3
    },
    hpBarWidth      = W - 40, //Barra de hp do inimigo
    newHpBarWidth   = W - 40, //Barra de hp do inimigo, Variável auxiliar
    humanAttack     = 5;
    planet          = [], 
    enemie          = [],
    planetId        = 0, //Define qual planet está em uso
    orbitId         = 1, //Iniciar este parametro {orbitId} em 1 para que a orbita nunca toque o planeta
    enemieId        = 0,
    enemieBird      = new Image();

//Declaração de atributos a variáveis gerais (img, audio etc)
enemieBird.src  = "img/spritesheet_bird01.png";

/**
* Definições dos planetas
* Cada planeta deverá ser definido como uma posição na matriz {planet}
*/
planet[0] = {
    update: function(){
    },
    render: function(){
        ctx.beginPath();
        ctx.fillStyle = "lightGrey";
        ctx.arc(W/2, H, W/3, Math.PI, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
    }
};
planet[1] = {
    update: function(){
    },
    render: function(){
        ctx.beginPath();
        ctx.fillStyle = "grey";
        ctx.arc(W/2, H, W/3, Math.PI, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
    }
};

/**
* Definições da orbita
* A chave {orbitId} define qual nível da orbita vai ser usada
*/
var orbit = {
    x: W / 2,
    y: H,
    r1: W / 3,
    r2: W / 3,
    h2: H/8,
    i: orbitId,
    update: function(){
        this.o += 0.01;
        if(this.o > Math.PI * 2){
            this.o = Math.PI;
        }
    },
    render: function(){
        ctx.setLineDash([1, 5]);
        ctx.beginPath();
        ctx.strokeStyle = "#34e89e";
        ctx.ellipse(W/2, H - this.h2 * orbitId, W/2, W/3, 0, Math.PI, Math.PI * 2);
        ctx.stroke();  
        ctx.setLineDash([0]);
    }
 }

/**
* Definições dos inimigos
* Cada inimigo deverá ser definido como uma posição na matriz {enemie}
* O parâmetro {orbitId} define em qual nível da orbita ele vai aparecer
*/
enemie[0] = {
    o: Math.PI,
    f: 0,
    w: 0,
    hp: 20,
    oldHp: 20,
    update: function(){
        this.o += 0.004;
        if(this.o > Math.PI * 2){
            this.o = Math.PI;
        }
        this.w++;
        if(this.w >= 7){
            if(this.f >= 2000){
                this.f = 0;
            }else{
                this.f += 400;
            }
            this.w = 0;
        }
    },
    render: function(){
        ctx.drawImage(enemieBird, this.f, 0, 400, 372, (W/2 + Math.cos(this.o) * (W/2)) - 10, (H - (orbit.h2 * orbitId)) + Math.sin(this.o) * (W/3) - 9, 20, 18.5);
    }
}
enemie[1] = {
    o: Math.PI,
    hp: 200,
    oldHp: 200,
    update: function(){
        this.o += 0.01;
        if(this.o > Math.PI * 2){
            this.o = Math.PI;
        }
    },
    render: function(){   
    
        ctx.beginPath();
        ctx.fillStyle = "#CCC";
        ctx.arc(W/2 + Math.cos(this.o) * (W/2), (H - (orbit.h2 * orbitId)) + Math.sin(this.o) * (W/3), 10, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
    }
}

//Função temporária para mudar manualmente a orbita, planet ou inimigos
function changeId(param, id){
    if(param == "planet"){
        planetId = id;
    }else if(param == "orbit"){
        orbitId = id;
    }else if(param == "enemie"){
        enemieId = id;
        enemie[id].o = Math.PI;
    }else if(param == "status"){
        status = id;
    }
}


//Função para renderizar a barra de hp do inimigo
function renderHpBar(){
    ctx.lineJoin = "round";
    ctx.lineWidth = "10";
    ctx.strokeStyle = "orange";
    ctx.strokeRect(20, 20, newHpBarWidth,  1);
    ctx.lineWidth = "1";
    ctx.fillStyle = "white";
    ctx.fillText(enemie[enemieId].hp, 25, 23);  
}

//Função para calcular o quanto da barra deve ser reduzida de acordo com o ataque do personagem e hp do inimigo
function reductionHpBar(){
    percentual = (humanAttack * 100) / enemie[enemieId].oldHp;
    result = (hpBarWidth / 100) * percentual;
    newHpBarWidth -= result;
    enemie[enemieId].hp -= humanAttack;
    if(newHpBarWidth <= 0){
        newHpBarWidth = hpBarWidth; 
        enemie[enemieId].hp = enemie[enemieId].oldHp;  
    }
    
}

//Recupera evento de clique do mouse
function mouseDown(e){
    reductionHpBar();
}

//Atualizações gerais do jogo
function update(){
    if(status == allStatus.pres){
    }else if(status == allStatus.menu){
    }else if(status == allStatus.play){
        planet[planetId].update();
        orbit.update();
        enemie[enemieId].update();
    }else if(status == allStatus.lose){
    }
}

//Renderização dos elementos do jogo
function render(){
    ctx.clearRect(0, 0, W, H);
    if(status == allStatus.pres){
    }else if(status == allStatus.menu){
    }else if(status == allStatus.play){
        renderHpBar();
        planet[planetId].render();
        enemie[enemieId].render();
        orbit.render();
    }else if(status == allStatus.lose){
    }
}

//Cria o loop do jogo
function loop(){
    update();
    render();
    window.requestAnimationFrame(loop);
}

//Função principal - e definições gerais do canvas e contexto
function app(){
    canvas = document.createElement('canvas');
    canvas.width = W;
    canvas.height = H;
    canvas.style.border = "1px solid #F4F4F4";
    ctx = canvas.getContext('2d');
    document.body.appendChild(canvas);
    window.canvas.addEventListener('mousedown', mouseDown);
    ctx.translate(0.5, 0.5);
    loop();
}