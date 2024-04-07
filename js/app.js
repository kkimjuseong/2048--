// 1. 전역변수 설정

let board;
let score = 0;
let bastScore = 0;
const rows = 4;
const columns = 4;
const $board = document.getElementById("board");
const $score = document.getElementById("score");
const $bestScore = document.getElementById("bestScore");

// 2. 게임 보드 생성 및 초기 상태 설정

window.onload = function () {
  setGame();
  $bestScore.innerHTML = localStorage.getItem("2048_best_score") || 0;
};

function setGame() {
  // 보드 초기화
  board = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];

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

// filterZero(row)함수는 주어진 배열에서 0이 아닌 값들만들 필터링 해 새로운 배열을 생성하는 역할을 함.
// 1. 주어진 배열을 순회하면서 0이 아닌 값을을 추출
// 2. 추출된 값들로 새로운 배열을 생성
// 3. 생성된 새로운 배열을 반환한다.

// 새로운 배열 생성
function filterZero(row) {
  // 이 함수는 주어진 배열에서 0이 아닌 값들만을 추출하여 새로운 배열을 생성하고, 해당 배열을 반환합니다. 
  // 이 함수는 주로 slide() 함수 내에서 사용되어 이동 후에 0이 아닌 값들만을 남기는 데에 활용됩니다.
  return row.filter((num) => num !== 0); 
}

// 빈 타일 확인 및 새로운 타일 생성
function setTwo() {
  // 1. 빈 공간 확인: 보드 상에 빈 공간이 있는지 확인, 즉 값이 0인 타일이 있는지 검사해야함.
  // 2. 빈 공간에 랜덤한 위치에 새로운 타일 생성: 빈 공간이 있다면 그 중 하나를 선택해 값을 2로 설정한 후 해당 위치에 새로운 타일생성
  if(!hasEmptyTile()){
    // 빈 공간이 없으면 게임이 종료됨.
    return;
  }
  let found = false;
  while(!found){
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

// 타일 업데이트 및 표시
function updateTile(tile, num) {
  tile.innerText = "";
  tile.classList.value = "";
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

// 사용자 입력 처리
document.addEventListener("keyup", (e) => {
  // code는 이벤트 객체 속성 중 하나로 해당 이벤트가 발생한 키보드의 키 코드를 나타냅니다.
  // key는 이벤트 객체 속성 중 하나로 해당 이벤트가 발생한 키보드의 실제 키 값을 나타냅니다.
  if (e.code === "ArrowLeft" || e.key === "a") {
    slideLeft();
    setTwo();
  } else if (e.code === "ArrowRight" || e.key === "d") {
    slideRight();
    setTwo();
  } else if (e.code === "ArrowUp" || e.key === "w") {
    slideUp();
    setTwo();
  } else if (e.code === "ArrowDown" || e.key === "s") {
    slideDown();
    setTwo();
  }
  document.getElementById("score").innerText = score;
});




// 타일 이동 및 결합 로직 구현
//slide() 함수는 주어진 배열 row를 왼쪽으로 이동시키고 결합하는 역할을 합니다.
//이를 위해서는 배열 내에서 0이 아닌 값들을 왼쪽으로 이동시키고, 인접한 같은 값들을 합치는 작업을 수행해야 합니다.
/*
  1. 0이아닌 값들을 왼쪽으로 이동시키기
  2. 인접한 같은 값들을 합치기
  3. 결과 반환
*/

function slide(row) {
  //[0, 2, 2, 2]
  row = filterZero(row); //[2, 2, 2]
  for (let i = 0; i < row.length - 1; i++) {
    if (row[i] == row[i + 1]) {
      row[i] *= 2;
      row[i + 1] = 0;
      score += row[i];
    }
  } //[4, 0, 2]
  row = filterZero(row); //[4, 2]
  //add zeroes
  while (row.length < columns) {
    row.push(0);
  } //[4, 2, 0, 0]
  return row;
}

// slideLeft() 함수는 게임 보드를 왼쪽으로 이동시키고 결합하는 역할을 함.
function slideLeft() {
  for (let r = 0; r < rows; r++) {
    let row = board[r];
    row = slide(row);
    board[r] = row;
    for (let c = 0; c < columns; c++) {
      let tile = document.getElementById(r.toString() + "-" + c.toString());
      let num = board[r][c];
      updateTile(tile, num);
    }
  }
}

// slideRight() 함수는 게임 보드를 오른쪽으로 이동시키고 결합하는 역할을 함
function slideRight() {
  for (let r = 0; r < rows; r++) {
    let row = board[r]; //[0, 2, 2, 2]
    row.reverse(); //[2, 2, 2, 0]
    row = slide(row); //[4, 2, 0, 0]
    board[r] = row.reverse(); //[0, 0, 2, 4];
    for (let c = 0; c < columns; c++) {
      let tile = document.getElementById(r.toString() + "-" + c.toString());
      let num = board[r][c];
      updateTile(tile, num);
    }
  }
}


// slideUp() 함수는 게임 보드를 위쪽으로 이동시키고 결합하는 역할을 함
function slideUp() {
  for (let c = 0; c < columns; c++) {
    let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
    row = slide(row);
    for (let r = 0; r < rows; r++) {
      board[r][c] = row[r];
      let tile = document.getElementById(r.toString() + "-" + c.toString());
      let num = board[r][c];
      updateTile(tile, num);
    }
  }
}

// slideDown() 함수는 게임 보드를 아래쪽으로 이동시키고 결합하는 역할을 함.
function slideDown() {
  for (let c = 0; c < columns; c++) {
    let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
    row.reverse();
    row = slide(row);
    row.reverse();
    for (let r = 0; r < rows; r++) {
      board[r][c] = row[r];
      let tile = document.getElementById(r.toString() + "-" + c.toString());
      let num = board[r][c];
      updateTile(tile, num);
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
  
  alert(`score : ${score}`);

  // 빈 타일이 존재하지 않으면 게임이 끝나기 때문에 end()함수 호출
  // end();
  // return false; 
}

// end 조건
// function end() {
//   let bestScore = document.getElementById("bestScore").innerHTML;
  
//   alert(`score : ${score}`);

//   if(parseInt(bestScore) < parseInt(score)) {
//     localStorage.removeItem("2048_best_score");
// 		localStorage.setItem("2048_best_score", score);
// 		document.getElementById("bestScore").innerHTML = score;		
//   }
// }

/*

전역 변수 설정:
board: 게임 보드를 나타내는 2차원 배열.
score: 현재 점수를 나타내는 변수.
rows: 게임 보드의 행 수.
columns: 게임 보드의 열 수.
$board, $score, $bestScore: HTML 요소에 대한 참조를 나타내는 변수들.
window.onload 이벤트 핸들러:

HTML 문서가 로드되면 setGame() 함수가 호출됨.
setGame() 함수:

board 배열을 초기화하고, 초기 상태의 게임 보드를 생성함.
setTwo() 함수를 호출하여 게임 시작 시에 두 개의 타일(숫자 2인 타일)을 생성함.
updateTile() 함수:

HTML 타일 요소를 업데이트하고 화면에 표시하는 함수.
주어진 숫자에 따라 타일의 내용과 클래스를 설정함.
사용자 입력 처리:

keyup 이벤트에 대한 이벤트 리스너를 등록하고, 사용자의 키보드 입력을 처리함.
방향 키 입력에 따라 slideLeft(), slideRight(), slideUp(), slideDown() 함수를 호출하여 타일을 이동시킴.
각 이동 후에는 setTwo() 함수를 호출하여 새로운 타일을 생성하고, 점수를 업데이트함.
slide(), slideLeft(), slideRight(), slideUp(), slideDown() 함수:

타일을 이동하고 결합하는 로직을 구현함.
slide() 함수는 한 행 또는 열에 대해 이동 및 결합을 수행함.
이동 및 결합 후에는 보드의 상태를 업데이트하고, 화면에 표시함.
setTwo() 함수:

빈 타일이 있는지 확인하고, 빈 타일 중 하나를 선택하여 그 위치에 새로운 타일(숫자 2인 타일)을 생성함.
hasEmptyTile() 함수:

게임 보드에 빈 타일이 있는지 확인함.
checkGameOver() 함수:

현재 보드 상태에서 더 이상 이동할 수 있는 타일이 없는지 확인하고, 게임 종료 여부를 결정함.
모든 타일을 순회하며 인접한 타일과 비교하여 이동 가능 여부를 확인함. 
만약 더 이상 이동할 수 있는 타일이 없으면 게임을 종료하고 결과를 알림창으로 표시함.

*/