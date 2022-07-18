
const card = document.querySelectorAll(".card");
for(let i of card){
    i.onclick = changeClass;
}
function filler(){
    for(let i = 0; i < 100; i++){
        pair[i] = 0;
    }
    for(let type = 1; type <= 6; type++){
        for(let j = 0; j < 3; j++){
            let first, second;
            first = Math.floor(Math.random() * 36);
            do {
                second = Math.floor(Math.random() * 36);
            } while (second == first);
            if(pair[first] == 0){
                pair[first] = type;
            } else{
                while(pair[first] != 0){
                    if(first < 35){
                        first++;
                    } else {
                        first = 0;
                    }
                }
                pair[first] = type;
            }
            if(pair[second] == 0){
                pair[second] = type;
            } else{
                while(pair[second] != 0){
                    if(second < 35){
                        second++;
                    } else {
                        second = 0;
                    }
                }
                pair[second] = type;
            }
        }
    }
}
let pair = [];
let click = -1;
let last;
let timeout = false;

let score = 0;
let record = 0;
let cards = 36;
main();

function main(){
    filler();
    setTimeout(shown, 1000);
}

document.getElementById("score").innerHTML=score;
document.getElementById("best").innerHTML=record;
document.getElementById("cards").innerHTML=cards;


function shown(){
    for(let i of card){
        i.classList.add("active");
        setTimeout(backg, 200, i);
    }
    setTimeout(() => {
        for(let i of card){
            i.classList.remove("active");
            timeout = true;
            for(let i of card){
                clearBg(i);
            }
        }
    }, 2000);
}

function backg(obg){
    switch (pair[obg.id]){
        case 1:
            obg.style = "background-image: url(img/java.svg);";
            break;
        case 2:
            obg.style = "background-image: url(img/C.png);";
            break;
        case 3:
            obg.style = "background-image: url(img/C++.png);";
            break;
        case 4:
            obg.style = "background-image: url(img/JavaScript.png);";
            break;
        case 5:
            obg.style = "background-image: url(img/nodejs.png);";
            break;
        case 6:
            obg.style = "background-image: url(img/go.png);";
            break;
    }
}

function clearBg(item){
    item.style.background = "";
}

function changeClass(){
    if(timeout && this.style.opacity == 0){
        timeout = false;
        this.classList.add("active");
        setTimeout(backg, 250, this);
        setTimeout(compare, 400, this);
    }
}

function compare(now){
    if(click == -1){
        click = now.id;
        last = now;
        timeout = true;
    } else if(click != now.id){
        if(pair[click] != pair[now.id]){
            setTimeout(() => {
                now.classList.remove("active");
                last.classList.remove("active");
                clearBg(now);
                clearBg(last);
                if(score > 0){
                    score -= 1;
                    document.getElementById("score").innerHTML=score;
                }
                timeout = true;
            }, 600);
        } else{
            last.style.opacity = 0.001;
            now.style.opacity = 0.001;
            now.onclick = "";
            last.onclick = "";
            cards -= 2;
            score += 5;
            if(record < score){
                record = score;
            }
            document.getElementById("score").innerHTML=score;
            document.getElementById("best").innerHTML=record;
            document.getElementById("cards").innerHTML=cards;
            timeout = true;
            if(cards == 0){
                setTimeout(() => {
                    alert("WIN");
                restart();
                }, 1000);
            }
        }
        click = -1;
    } else{
        timeout = true;
    }
    
}

function restart(){
    filler();
    score = 0;
    cards = 36;
    document.getElementById("score").innerHTML=score;
    document.getElementById("cards").innerHTML=cards;
    for(let i of card){
        i.style = "";
        i.classList.remove("active");
        i.onclick = changeClass;
    }
    filler();
}








