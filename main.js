let w
let h
let stroke = "#000"
let size = 3
let detail = 100

drawGraph(10,10)

drawDashedEq(x=>x)
setColor("#00ff00")
drawEq(x=>x*x)

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
  return points
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
  drawLines([bt.catmullRom(generateEq(func)[0], detail)],{width:size,stroke:stroke})
}

function drawDashedEq(func){
  
}
