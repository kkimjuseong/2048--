// 1. 전역변수 설정

let board;
let score = 0;
const rows = 4;
const columns = 4;
const $board = document.querySelector("board");
const $score = document.querySelector("score");
const $bestScore = document.querySelector("bestscore");

// 2. 게임 보드 생성 및 초기 상태 설정

function setGame() {
  // 보드 초기화
  board = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];

  // 보드 초기화 로직 구현
  board = [];
  for (let r = 0; r < rows; r++) {
    board[r] = [];
    for (let c = 0; c < columns; c++) {
      board[r][c] = 0;
    }
  }

  // 타일 생성과 초기 상태 설정
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      let tile = document.createElement("div");
      tile.id = r.toString() + "-" + c.toString();
      let num = board[r][c];
      updateTile(tile, num);
      document.getElementById("board").append(tile);
    }
  }

  // 게임 시작 시에 두 개의 타일 생성
  setTwo();
  setTwo();
}

// 3. 타일 업데이트 및 표시
function updateTile(tile, num) {
  tile.innerText = "";
  tile.classList.value = ""; // clear the classList
  tile.classList.add("tile");
  if (num > 0) {
    tile.innerText = num.toString();
    if (num <= 4096) {
      tile.classList.add("x" + num.toString());
    } else {
      tile.classList.add("x8192");
    }
  }
}

// 4. 사용자 입력 처리
document.addEventListener("keyup", (e) => {
  if (e.code == "ArrowLeft") {
    slideLeft();
    setTwo();
  } else if (e.code == "ArrowRight") {
    slideRight();
    setTwo();
  } else if (e.code == "ArrowUp") {
    slideUp();
    setTwo();
  } else if (e.code == "ArrowDown") {
    slideDown();
    setTwo();
  }
  document.getElementById("score").innerText = score;
});

// 5. 타일 이동 및 결합 로직 구현
//slide() 함수는 주어진 배열 row를 왼쪽으로 이동시키고 결합하는 역할을 합니다.
//이를 위해서는 배열 내에서 0이 아닌 값들을 왼쪽으로 이동시키고, 인접한 같은 값들을 합치는 작업을 수행해야 합니다.
/*
  1. 0이아닌 값들을 왼쪽으로 이동시키기
  2. 인접한 같은 값들을 합치기
  3. 결과 반환
*/

function slide(row) {
  // 0이 아닌 값들을 왼쪽으로 이동시키기.
  let newRow = [];
  for (let i = 0; i < row.length; i++) {
    if (row[i] !== 0) {
      newRow.push(row[i]);
    }
  }

  // 인접한 같은 값들을 합치기.
  for (let i = 0; i < newRow.length - 1; i++) {
    if (newRow[i] === newRow[i + 1]) {
      newRow[i] *= 2;
      newRow[i + 1] = 0;
    }
  }

  // 0을 제회한 값들을 왼쪽으로 모으기
  let resultRow = [];
  for (let i = 0; i < newRow.length; i++) {
    if (newRow[i] !== 0) {
      resultRow.push(newRow[i]);
    }
  }

  // 필요한 경우 나머지 부분을 0으로 채워주기
  while (resultRow.length < row.length) {
    resultRow.push(0);
  }

  return resultRow;
}

// slideLeft() 함수는 게임 보드를 왼쪽으로 이동시키고 결합하는 역할을 함.
function slideLeft() {
  // 1. 각 행에 대해 slide 함수를 호출
  for (let r = 0; r < rows; r++){
    board[r] = slide(board[r])
  }
  // 2. 결과 반영
  updateTile();
}

// slideRight() 함수는 게임 보드를 오른쪽으로 이동시키고 결합하는 역할을 함
function slideRight() {
  // 1. 각 행에 대해 slide 함수를 호출
  for(let r = 0; r < rows; r++){
    board[r] = slide(board[r].slice().reverse()).reverse;
  }
  // 결과 반영
  updateTile();
}

// slideUp() 함수는 게임 보드를 위쪽으로 이동시키고 결합하는 역할을 함
function slideUp() {
  for (let c = 0; c < columns; c++){
    // 각 열에 대해 slide 함수 호출하여 위쪽으로 이동 및 결합 작업 수행.
    let columns = [];
    for (let r = 0; r < rows; r++){
      columns.push(board[r][c]);
    }
    columns = slide (columns);
    for (let r = 0; r < rows; r++){
      board[r][c] = columns;
    }
  }
  // 결과 반영
  updateTile();
}

// slideDown() 함수는 게임 보드를 아래쪽으로 이동시키고 결합하는 역할을 함.
function slideDown() {
  for (let c = 0; c < columns; c++){
    // 각 열에 대해 slide 함수 호출하여 아래쪽으로 이동 및 결합 작업 수행.
    let columns = [];
    for (let r = rows - 1; r >= 0; r++) {
      columns.push(board[r][c]);
    }
    columns = slide(columns);
    for (let r = rows - 1; r >= 0; r++) {
      board[r][c] = columns.pop();
    }
  }
  // 결과 반영
  updateTile();
}  

// filterZero(row)함수는 주어진 배열에서 0이 아닌 값들만들 필터링 해 새로운 배열을 생성하는 역할을 함.
function filterZero(row) {
  // 1. 주어진 배열을 순회하면서 0이 아닌 값을을 추출
  // 2. 추출된 값들로 새로운 배열을 생성
  // 3. 생성된 새로운 배열을 반환한다.
  /*
  이 함수는 주어진 배열에서 0이 아닌 값들만을 추출하여 새로운 배열을 생성하고, 해당 배열을 반환합니다. 
  이 함수는 주로 slide() 함수 내에서 사용되어 이동 후에 0이 아닌 값들만을 남기는 데에 활용됩니다.
  */
  let nonZeroValues = [];
  for (let i = 0; i < row.length; i++){
    if(row[i] !== 0){
      nonZeroValues.push(row[i])
    }
  }
  return nonZeroValues;
}

// 6. 빈 타일 확인 및 새로운 타일 생성
function setTwo() {
  // 1. 빈 공간 확인: 보드 상에 빈 공간이 있는지 확인, 즉 값이 0인 타일이 있는지 검사해야함.
  // 2. 빈 공간에 랜덤한 위치에 새로운 타일 생성: 빈 공간이 있다면 그 중 하나를 선택해 값을 2로 설정한 후 해당 위치에 새로운 타일생성
  if(!hasEmptyTile()){
    // 빈 공간이 없으면 게임이 종료됨.
    return;
  }
  let found = false;
  while(found){
    // 랜덤한 위치 생성
    let r = Math.floor(Math.random() * rows);
    let c = Math.floor(Math.random() * columns);
    if(board[r][c] === 0){
      // 빈 공간에 2생성
      board[r][c] = 2;
      // 해당 위치에 새로운 타일 생성
      let $tile = document.getElementById(r.toString() + "-" + c.toString());
      $tile.innerHTML = "2";
      $tile.classList.add("x2");
      found = true;
    }
  }
}

// hasEmptyTile() 함수는 게임 보드에 빈 타일이 존재하는지 확인하는 역할을 함
function hasEmptyTile() {
  // 게임 보드를 순회 하면서 빈 타일이 있는지 확인
  for(let r = 0; r < rows; r++){
    for(let c = 0; c < columns; c++){
      if(board[r][c] === 0){
        // 빈 타일이 존재하면 true 반환
        return true;
      }
    }
  }
  // 빈 타일이 존재하지 않으면 false 반환
  return false; 
}

// 7. 게임 종료 조건 확인
function checkGameOver() {
  // checkGameOver() 함수 구현
}
