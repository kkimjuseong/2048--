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
function updateBoard(tile, num) {
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
      newRow.pusg(row[i]);
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
  updateBoard();

}



// 6. 빈 타일 확인 및 새로운 타일 생성
function setTwo() {
  // setTwo() 함수 구현
}

function hasEmptyTile() {
  // hasEmptyTile() 함수 구현
}

// 7. 게임 종료 조건 확인
function checkGameOver() {
  // checkGameOver() 함수 구현
}
