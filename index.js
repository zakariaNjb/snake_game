
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

function addSquare(){
    const queue=document.querySelector("div[data-name='queue']")
    const preQueue=document.querySelector("div[data-name='pre_queue']")
    const queuePostition=getPosition(queue)
    const preQueuePosition=getPosition(preQueue)
    let x,y

    if(queuePostition.y==preQueuePosition.y && queuePostition.x < preQueuePosition.x){
        y=queuePostition.y
        x=queuePostition.x-30
    }

    if(queuePostition.y==preQueuePosition.y && queuePostition.x > preQueuePosition.x){
        y=queuePostition.y
        x=queuePostition.x+30
    }

    if(queuePostition.x==preQueuePosition.x && queuePostition.y > preQueuePosition.y){
        x=queuePostition.x
        y=queuePostition.y+30
    }

    if(queuePostition.x==preQueuePosition.x && queuePostition.y < preQueuePosition.y){
        x=queuePostition.x
        y=queuePostition.y-30
    }

    const div=document.createElement("div")
    div.classList.add("snake__square")
    div.style.left=x.toString() + "px"
    div.style.top=y.toString() + "px"
    preQueue.removeAttribute("data-name")
    queue.setAttribute("data-name","pre_queue")
    div.setAttribute("data-name","queue")
    queue.before(div)
}

function isOver(squares,head){
    const h_position=getPosition(head)
    for(index in squares){
        const s_position=getPosition(squares[index])
        if(h_position.x==s_position.x && h_position.y==s_position.y)
            return true
    }
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
        // Adding new square before the head
        addSquare()
        t_position=changeTargetPosition(container,target)
    }

    if(isOver(squares,head)){
        container.innerHTML="Game over"
    }
})

