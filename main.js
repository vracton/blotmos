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
    if (func(x)==0){
      drawPoint(x,0)
    }
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
    if (pLine.length>i+dashLen){
      drawPoint(pLine[i][0]-w/2,pLine[i][1]-h/2)
      drawPoint(pLine[i+dashLen][0]-w/2,pLine[i+dashLen][1]-h/2)
      drawLines(bt.copy([[[pLine[i],pLine[i+dashLen]]]])[0],{width:size,stroke:stroke})
    }
  }
}

function drawPoint(xPos,yPos){
  const x = xPos+w/2
  const y = yPos+h/2
  drawLines([bt.catmullRom([[x-0.1,y-0.1],[x+0.1,y-0.1],[x+0.1,y+0.1],[x-0.1,y+0.1],[x-0.1,y-0.1]])],{width:10,stroke:stroke,fill:stroke})
}

function drawVector(rawX1,rawY1,rawX2,rawY2){
  const x1=rawX1+w/2
  const y1=rawY1+h/2
  const x2=rawX2+w/2
  const y2=rawY2+h/2
  drawLines([[[x1,y1],[x2,y2]]],{width:size,stroke:stroke})
  drawPoint(rawX1,rawY1)
  const angle = Math.atan((y2-y1)/(x2-x1))*180/Math.PI
  const arrowDif = y2<y1?5:-5
  drawLines(bt.rotate([[[x2,y2],[x2+arrowDif,y2+arrowDif]]],angle-180,[x2,y2]),{width:size,stroke:stroke})
  drawLines(bt.rotate([[[x2,y2],[x2+arrowDif,y2+arrowDif]]],angle+90,[x2,y2]),{width:size,stroke:stroke})
}

function drawDottedEq(func, rep){
  let points=[]
  for (let x = -w/2;x <= w/2;x+=rep){
    const point = [x+w/2,func(x)+h/2]
    if (point[1]>=0&&point[1]<=h){
     points.push(point) 
    }
  }
  for (let pt of points){
    drawPoint(pt[0]-w/2,pt[1]-h/2)
  }
}

function drawSector(x,y,r,filled,angLen){
  let pLine = [[]]
  for (let t=0;t<=angLen;t++){
    let coord = []
    coord[0]=r*10*Math.sin(t/180*Math.PI)+x*10+w/2
    coord[1]=r*10*Math.cos(t/180*Math.PI)+y*10+h/2
    pLine[0].push(coord)
  }
  pLine[0].push([x*10+w/2,y*10+h/2])
  pLine[0].push([x*10+w/2,y*10+h/2+r*10])
  drawLines(pLine,{width:size,stroke:stroke,fill:(filled?fill:"#00000000")})
  drawPoint(x*10,y*10)
  drawPoint(x*10,y*10+r*10)
  const sectorEnd = pLine[0][pLine[0].length-3]
  drawPoint(sectorEnd[0]-w/2,sectorEnd[1]-h/2)
}

function drawCircle(x,y,r,filled){
  let pLine = [[]]
  for (let t=0;t<=360;t++){
    let coord = []
    coord[0]=r*10*Math.sin(t/180*Math.PI)+(x*10)+w/2
    coord[1]=r*10*Math.cos(t/180*Math.PI)+(y*10)+h/2
    pLine[0].push(coord)
  }
  drawLines(pLine,{width:size,stroke:stroke,fill:(filled?fill:"#00000000")})
  drawPoint(x*10,y*10)
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
    //console.log(pLine[0])
    pLine[0][0].push(pLine[0][0][0])
    drawLines(pLine[0],{width:size,stroke:stroke,fill:(filled?fill:"#00000000")})
    pLine[0][0].pop()
    for (let pt of pLine[0][0]){
      drawPoint(pt[0]-w/2,pt[1]-h/2)
    }
  }
}

//-------------------------------------------------------------------------

drawGraph(10,20)

setFill("#0ff00050")
drawCircle(8,-8,1,true)
drawVector(-10,10,-40,70)
drawVector(-50,60,-20,0)
drawSector(-3,12,5,false,103)
setFill("#000ff050")
drawPolygon(true,0,0,100,0,100,100)
drawDottedEq(x=>-x*x, 2)
setColor("#00ff00")
drawEq(x=>x, 1000, 1000)
setColor("#BF40BF")
drawPoint(50,50)
setSize(5)
setColor("#ff0000")
drawDashedEq(x=>x*x, 100, 50)
setColor("#0000ff")
drawDashedEq(x=>x*x,50,50)
