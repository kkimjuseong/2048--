// 1. 전역변수 설정

let board;
let score = 0;
const rows = 4;
const columns = 4;
const $board = document.querySelector('board')
const $score = document.querySelector('score') 
const $bestScore = document.querySelector('bestscore')


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
function slide(row) {
  // slide() 함수 구현
}

function slideLeft() {
  // slideLeft() 함수 구현
}

function slideRight() {
  // slideRight() 함수 구현
}

function slideUp() {
  // slideUp() 함수 구현
}

function slideDown() {
  // slideDown() 함수 구현
}

function filterZero(row) {
  // filterZero() 함수 구현
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