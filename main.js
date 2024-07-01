let w
let h
let stroke = "#000"
let size = 3
let detail = 100

function drawGraph(x, y){
  w=x*20
  h=y*20
  setDocDimensions(w,h)
  drawLines([[[0,y*10],[w,y*10]]],{width:6})
  drawLines([[[x*10,0],[x*10,h]]],{width:6})
  for (let i = -x;i<=x;i++){
    if (x!=0){
      drawLines([[[(i+x)*10,0],[(i+x)*10,h]]],{width:i%5==0?3:1})
    }
  }
  for (let i = -y;i<=y;i++){
    if (x!=0){
      drawLines([[[0,(i+y)*10],[w,(i+y)*10]]],{width:i%5==0?3:1})
    }
  }
}

function generateEq(func){
  let points=[[]]
  for (let x = -w/2;x <= w/2;x++){
    const point = [x+w/2,func(x)+h/2]
    if (point[1]>=0&&point[1]<=h){
     points[0].push(point) 
    }
  }
  return bt.copy(points)
}

function setDetail(d){
  detail=d
}

function setColor(c){
  stroke=c
}

function setSize(s){
  size=s
}

function drawEq(func){
  drawLines([bt.copy(bt.catmullRom(generateEq(func)[0], detail))],{width:size,stroke:stroke})
}

function drawDashedEq(func, dashLen, space){
  const pLine = bt.copy(bt.catmullRom(generateEq(func)[0], detail))
  for (let i = 0;i < pLine.length;i+=(dashLen+space)){
    drawLines([[pLine[i],pLine[i+dashLen]]],{width:size,stroke:stroke})
  }
}

function drawPoint(x,y){
  drawLines([bt.catmullRom([[x-0.1,y-0.1],[x+0.1,y-0.1],[x+0.1,y+0.1],[x-0.1,y+0.1],[x-0.1,y-0.1]])],{width:15,stroke:stroke,fill:stroke})
}

//<-------------------------------------------------->

drawGraph(10,10)

setColor("#BF40BF")
drawPoint(50,150)
setColor("#00ff00")
drawEq(x=>x, 1000, 1000)
setSize(5)
setColor("#ff0000")
drawDashedEq(x=>x*x, 100, 50)
setColor("#0000ff")
drawDashedEq(x=>x*x,50,50)
