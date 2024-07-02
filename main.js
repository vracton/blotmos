let w
let h
let stroke = "#000"
let size = 3
let detail = 100
let fill = "#000"

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

function setFill(f){
  fill = f
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
    drawLines(bt.copy([[[pLine[i],pLine[i+dashLen]]]])[0],{width:size,stroke:stroke})
  }
}

function drawPoint(xPos,yPos){
  const x = xPos+w/2
  const y = yPos+h/2
  drawLines([bt.catmullRom([[x-0.1,y-0.1],[x+0.1,y-0.1],[x+0.1,y+0.1],[x-0.1,y+0.1],[x-0.1,y-0.1]])],{width:15,stroke:stroke,fill:stroke})
}

function drawSector(x,y,r,filled,angLen){
  let pLine = [[]]
  for (let t=0;t<=angLen;t++){
    let coord = []
    coord[0]=r*Math.sin(t/180*Math.PI)+x+w/2
    coord[1]=r*Math.cos(t/180*Math.PI)+y+h/2
    pLine[0].push(coord)
  }
  pLine[0].push([x+w/2,y+h/2])
  pLine[0].push([x+w/2,y+h/2+r])
  drawLines(pLine,{width:size,stroke:stroke,fill:(filled?fill:"#00000000")})
}

function drawCircle(x,y,r,filled){
  let pLine = [[]]
  for (let t=0;t<=360;t++){
    let coord = []
    coord[0]=r*Math.sin(t/180*Math.PI)+x+w/2
    coord[1]=r*Math.cos(t/180*Math.PI)+y+h/2
    pLine[0].push(coord)
  }
  drawLines(pLine,{width:size,stroke:stroke,fill:(filled?fill:"#00000000")})
}

function drawPolygon(filled){
  let pLine = [[[]]]
  for (let i=1;i<arguments.length;i++){
    if (pLine[0][0][pLine[0][0].length-1]&&pLine[0][0][pLine[0][0].length-1].length==1){
      pLine[0][0][pLine[0][0].length-1][1]=arguments[i]+h/2
    } else {
      pLine[0][0].push([arguments[i]+w/2])
    }
  }
  if (pLine[0][0].length>0){
    if (pLine[0][0][pLine[0][0].length-1].length==1){
      pLine[0][0].pop()
    }
    console.log(pLine[0])
    pLine[0][0].push(pLine[0][0][0])
    drawLines(pLine[0],{width:size,stroke:stroke,fill:(filled?fill:"#00000000")})
  }
}

//-------------------------------------------------------------------------

drawGraph(10,20)

setFill("#0ff00050")
drawCircle(80,-80,10,true)
drawSector(-30,120,50,false,103)
setFill("#000ff050")
drawPolygon(true,0,0,100,0,100,100)
setColor("#00ff00")
drawEq(x=>x, 1000, 1000)
setColor("#BF40BF")
drawPoint(50,50)
setSize(5)
setColor("#ff0000")
drawDashedEq(x=>x*x, 100, 50)
setColor("#0000ff")
drawDashedEq(x=>x*x,50,50)
