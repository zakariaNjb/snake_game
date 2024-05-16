
function getPosition(element){
    const style=getComputedStyle(element)
    const left=style.left.replace("px","")
    const top=style.top.replace("px","")
    const width=style.width.replace("px","")
    const height=style.height.replace("px","")
    return {
        x:parseInt(left),
        y:parseInt(top),
        width:parseInt(width),
        height:parseInt(height)
    }
}

function createSnakeSquare(){
    const div=document.createElement("div")
    div.setAttribute("class",".snake__square")
    return div
}

function follow(prevSquares,h_position){
    let x=h_position.x
    let y=h_position.y

    for(i=0;i<prevSquares.length;i++){
        const index=prevSquares.length-1-i
        const square_position=getPosition(prevSquares[index])
        prevSquares[index].style.left=x.toString()+"px"
        prevSquares[index].style.top=y.toString()+"px"
        x=square_position.x
        y=square_position.y
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function changeTargetPosition(c_width,c_height){
    const target=document.querySelector(".target")
    const targetPosition=getPosition(target)
    let x=Math.random()*[100,1000][getRandomInt(2)]
    let y=Math.random()*[100,1000][getRandomInt(2)]
    if(x>c_width) x=x-c_width
    if(y>c_height) y=y-c_height
    target.style.left=x.toString()+"px"
    target.style.top=y.toString()+"px"
    console.log("x",x,"y",y,"width",c_width,"height",c_height)
}


const container=document.querySelector(".main__container")
const c_position=getPosition(container)
let prev_key=""

changeTargetPosition(c_position.width,c_position.height)


document.addEventListener("keypress",(e)=>{
    const squares=[...document.querySelectorAll(".snake__square")]
    let key=e.key.toLowerCase()

    const head=squares.pop()
    const h_position=getPosition(head)

    if(key.toLowerCase()=="d" && prev_key!="q"){
        const x=h_position.x+30
        head.style.left=x.toString()+"px"
        if(c_position.width-(x+h_position.width)<=-30){
            head.style.left="0px"
        }
        follow(squares,h_position)
        prev_key=key
    }
    
    if(key.toLocaleLowerCase()=="s" && prev_key!="z"){
        y=h_position.y+30
        head.style.top=y.toString()+"px"
        if(c_position.height-(y+h_position.height)<=-30){
            head.style.top="0px"
        }
        follow(squares,h_position)
        prev_key=key
    }

    if(key.toLocaleLowerCase()=="z" && prev_key!="s"){
        y=h_position.y-30
        head.style.top=y.toString()+"px"
        if(y<=-30){
            head.style.top=(c_position.height-30).toString()+"px"
        }
        follow(squares,h_position)
        prev_key=key
    }

    if(key.toLocaleLowerCase()=="q" && prev_key!="d"){
        const x=h_position.x-30
        head.style.left=x.toString()+"px"
        if(x<=-30){
            head.style.left=(c_position.width-30).toString()+"px"
        }
        follow(squares,h_position)
        prev_key=key
    }

})

