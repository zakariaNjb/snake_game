
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

function changeTargetPosition(c_position){
    let x=Math.random()*(c_position.width)
    let y=Math.random()*(c_position.height)
    if(x+30>c_position.width) x=x-30
    if(y+30>c_position.height) y=y-30
    target.style.left=x.toString()+"px"
    target.style.top=y.toString()+"px"
    // console.log("x",x,"y",y,"width",c_position.width,"height",c_position.height)
}

function checkReachTarget(t_position,h_position){
    const t_x=t_position.x
    const t_y=t_position.y
    const h_x=h_position.x
    const h_y=h_position.y

    if(h_x>t_x && h_y> t_y && h_y<t_y+30){
        return true
    }
    console.log("h_x:",h_x)
    console.log("h_y:",h_y)
    console.log("t_x:",t_x)
    console.log("t_y:",t_y)
}

const container=document.querySelector(".main__container")
const target=document.querySelector(".target")
const c_position=getPosition(container)
const t_position=getPosition(target)
let prev_key=""

changeTargetPosition(c_position)

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

    console.log("result: ",checkReachTarget(t_position,h_position))

})

