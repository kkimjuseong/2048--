// 전역변수

let board = 0;
let score = 0;
let bestScore = 0;
let rows = 4;
let columns = 4;
const $score = document.getElementById("score");
const $bestScore = document.getElementById("bestScore");
const $board = document.getElementById("board");

window.onload = function () {
  setGame();
  // $bestScore.innerHTML = localStorage.getItem("2048_best_score") || 0;
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
// 4x4 크기의 보드를 생성하기 위해 이중반복문 사용
// 행을 반복
for (let r = 0; r < rows; r++) {
  // 열을 반복
  for (let c = 0; c < columns; c++) {
    // 새로운 div 요소를 생성하여 타일을 나타냄
    let tile = document.createElement("div");
    // 타일의 id를 행과 열을 이용하여 지정
    // 즉 id=tile를 만들고 이를 표시하는 id명이
    // 0-1 0-2 0-3 0-4
    // 1-0 1-1 1-2 1-3
    // 2-0 2-1 2-2 2-3
    // 3-0 3-1 3-2 3-3 처럼 표현됨
    tile.id = r.toString() + "-" + c.toString();

    // 현재 타일의 숫자 값을 가져옴
    let num = board[r][c];
    // updateTile 함수를 사용하여 타일을 업데이트함
    updateTile(tile, num);
    // 게임 보드의 HTML 요소에 생성된 타일을 추가
    document.getElementById("board").append(tile);
  }
}

  // 게임 시작 시에 두 개의 타일 생성
  setTwo();
  setTwo();
}

function setTwo(){
  // 빈 공간을 확인 , 빈 공간, 랜덤한 위치에 새로운 타일을 생성해야함

  // 빈 공간이 없으면 게임이 종료되는 로직도 넣어줘야함
  if(!hasEmptyTile()){
    return;
  }

  let found = false
  while(!found){
    let r = Math.floor(Math.random() * rows);
    let c = Math.floor(Math.random() * columns);
    if(board[r][c] === 0){
      // 빈 공간에 2 생성
      board[r][c] = 2;
      // 해당 위치에 새로운 타일이 생성
      let $tile = document.getElementById(r.toString() + "-" + c.toString());
      $tile.innerHTML = '2';
      $tile.classList.add('x2');
      found = true;
    }
  }
}



/*
초보자가 위의 코드를 구현하려면 다음과 같은 순서로 함수를 만들어야 합니다.

전역변수 설정: 
필요한 변수들을 먼저 설정합니다.

게임 보드 생성 및 초기 상태 설정: setGame() 으로 설정
함수를 만들어서 게임 보드를 생성하고 초기 상태를 설정합니다. 
이 함수에서는 보드를 초기화하고 각 타일에 대한 HTML 요소를 생성하여 보드에 추가

빈 타일 확인 및 새로운 타일 생성:  
함수와 함수를 만들어서 빈 타일이 존재하는지 확인하고, 
필요한 경우 새로운 타일을 생성
setTwo() 타일만드는 함수설정 , hasEmptyTile() 빈 타일 찾는함수 설정

사용자 입력 처리: 
키보드 입력을 처리하는 부분을 구현합니다. 
이 부분에서는 keyup 이벤트를 사용하여 사용자의 키 입력에 반응하고, 
이동 및 타일 생성 함수를 호출합니다.


타일 이동 및 결합 로직 구현: 
타일을 이동하고 결합하는 로직을 구현합니다. 
이 부분에서는 왼쪽, 오른쪽, 위쪽, 아래쪽으로 타일을 이동시키고 결합하는 함수들을 만들어야 합니다.


타일 업데이트 및 표시: 
타일의 업데이트와 표시를 담당하는 함수를 만듭니다. 
이 함수는 보드의 상태를 반영하여 HTML 요소에 숫자를 업데이트하고 적절한 스타일을 적용합니다.


종료 조건 구현: 
게임이 종료되는 조건을 확인하고, 종료될 때 실행할 동작을 구현합니다. 
이 부분에서는 주로 빈 타일이 없는 경우 게임 종료 및 최고 점수 갱신 등을 처리합니다.

기타: 필요한 경우 추가적인 함수나 기능을 구현합니다. 이는 게임의 특성에 따라 다를 수 있습니다.
*/