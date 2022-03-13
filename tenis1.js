window.onload = () =>{
    let canvas = document.getElementById('canvas')
    let context = canvas.getContext('2d')
    document.addEventListener('keydown', keypush)

    setInterval(game, 1000/30)
//variaveis
let velocidade = 20
let vx = 0 //velocidade no eixo X para a raquete
let altura = 25
let largura = 120
let raquete_x = 240
let raquete_y = 550

let bola_x = 300 //coordenanda em x
let bola_y = 150 //coordenada em y
let bola_vy = 12 //velocidade da bola em y
let bola_vx = 12 //veolcidade da bola em x
let raio = 12

let pontuacao_1 = 0


    function game(){
        raquete_x +=vx
        bola()

        if(raquete_x<-120){
            //120 `e o tamanho da raquete, a raquete precisa sumir toda
            //para aparecer do outro lado
            raquete_x = canvas.width
        }
        if(raquete_x>canvas.width){
            raquete_x =-120
        }

        context.fillStyle = 'blue' // tabuleiro
        context.fillRect(0, 0, canvas.width, canvas.height)

        context.fillStyle = 'red' //rede
        context.fillRect(0, 150,canvas.width , 10)
        
        context.fillStyle = 'black' //raquetes
        context.fillRect(raquete_x , raquete_y, largura , altura)

        context.beginPath();
        context.fillStyle =  'white'//bola
        context.arc(bola_x, bola_y, raio, 0, Math.PI*2)
        //parametros: x, y, raio, angulo incial em grau, angulo final em grau
        context.fill();
        

        context.font = "20px Arial"
        context.fillStyle = "#00FF42"
        context.fillText(`Scores: ${pontuacao_1}`, canvas.width-120, 18)


            
    }
    function keypush(event) {
        switch (event.keyCode) {
            case 37:
                console.log("esquerda")
                vx =- velocidade
                
            break;
            
            case 39:
                console.log("direita")
                vx =+ velocidade

            break;

        }
    }
    
    function bola(){
        bola_x += bola_vx
        bola_y += bola_vy
        
        //as paredes do jogo, a bola deve voltar apos bater
        //eixo y
        if((bola_y>=raquete_y-altura && bola_x<=raquete_y+altura) && (bola_x>=raquete_x && bola_x<=raquete_x+largura) ){
            //apos bater 
            bola_vy =-Math.floor(Math.random()*16)-6            
            bola_vx =- Math.floor(Math.random()*16)-6
            pontuacao_1++
            
        }
        if(bola_y-raio>=canvas.height ) { //chao
            //apos passar ele vai voltar para as coordenadas e diminuir um ponto do jogador 
            bola_y = 150
            bola_x = 300
            pontuacao_1--
        }
        if(bola_y-15<=0 ){ //teto
            bola_vy =- bola_vy
            
            
        }
        //eixo x
        if(bola_x+15<= canvas.width){ //parede da direita
            bola_vx =- bola_vx
        }
        if(bola_x-15>=0){ //pareide da esquerda
            bola_vx =- bola_vx
        }
        
    }
}

