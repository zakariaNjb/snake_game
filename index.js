
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
    div.setAttribute("class","snake__square")
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

function changeTargetPosition(container,target){
    const c_position=getPosition(container)
    let x=parseInt(Math.random()*c_position.width/30)*30
    let y=parseInt(Math.random()*c_position.height/30)*30
    if(x+30>c_position.width) x=x-30
    if(y+30>c_position.height) y=y-30
    target.style.left=x.toString()+"px"
    target.style.top=y.toString()+"px"
    return getPosition(target)
}

function checkReachTarget(t_position,h_position){
    const t_x=t_position.x
    const t_y=t_position.y
    const h_x=h_position.x
    const h_y=h_position.y

    if((h_y==t_y && (h_x+30==t_x || h_x-30==t_x)) || (h_x==t_x && (h_y+30==t_y || h_y-30==t_y)))
        return true
}

function createTarget(){
    const target=document.createElement("div")
    target.classList.add("target")
    return target
}

const container=document.querySelector(".main__container")
const target=document.querySelector(".target")
let t_position=changeTargetPosition(container,target)

let prev_key=""

document.addEventListener("keypress",(e)=>{
    const squares=[...document.querySelectorAll(".snake__square")]
    const c_position=getPosition(container)
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

    if(checkReachTarget(t_position,h_position)){
        console.log("hit the target")
        const div=createSnakeSquare()
        // I should append the div in the proper position
        container.append(div)
        t_position=changeTargetPosition(container,target)
    }

})

