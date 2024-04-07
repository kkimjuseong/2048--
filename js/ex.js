// 전역변수

let board = 0;
let score = 0;
let bestScore = 0;
let row = [];
const rows = 4;
const columns = 4;
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

  // 초기 시작은 빈 타일이 있는지 없는지 알 수 없으므로 false 찾지못했다라 가정함
  let found = false
  
  // 처음 시작은 whil(true)로 시작하였음 그러나 타일이 생성되지 않았고,
  // 이유를 찾던 중 타일이 새로 생성되면 반복문을 빠져 나가야 한다는걸 알게됨
  // 그래서 found를 false로 정의해두고 시작함

  // while(ture) 로 만들지 않은 이유는 빈 공간을 찾지 않더라도 계속 진행돼
  // 무한루프에 빠지게 될 수 있음 그래서 빈 공간을 찾은 경우에만 반복을 멈추도록
  // found변수를 사용하는것이 좋음 
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

// 빈 공간이 있는지 확인하는 함수
function hasEmptyTile(){
  for(let r = 0; r < rows; r++){
    for(let c = 0; c < columns; c++){
      if(board[r][c] === 0){
        return true;
      }
    }
  }
  alert(`score : ${score}`);

}
// 처음 return으로 false를 넣고 돌렸더니 새로고침이 안되는거 그래서 왜인지 찾던중
// 게임이 끝났을때 계속 false를 반환했기 때문에 새로침이 안되는것
// 그래서 ture로 바꿔주고 호출부에서 !hasEmptyTile 부정을 해주니 새로고침이 됨
// 이게 왜 이럴까? 설명이 필요해보임


function updateTile(tile, num){
  tile.innerHTML = "";
  tile.classList.value = "";
  tile.classList.add('tile');
  if(num > 0){
    tile.innerText = num.toString();
    if(num <= 4096){
      tile.classList.add("x" + num.toString());
    }else{
      tile.classList.add('x8192')
    }
  }
}

// 타일 이동 및 결합 로직 구현
// 이해하고 나니 코드 자체는 쉬웠는데 어떤식으로 만들어야 할지 몰라 어려웠다
// 
function slide(row){
  row = filterZero(row); 
  for (let i = 0; i < row.length - 1; i++){
    if(row[i] === row[i + 1]){
      row[i] *= 2;

      // 같은숫자가 합쳐지면 한개만 남고 하나는 사라져야 하기 때문에
      // i+1즉 i번째 인덱스가 0일때 0 + 1 즉 현재요소의 다음요소를 0으로 만들어줌
      row[i + 1] = 0;
      score += row[i];
    }
  }
  while(row.length < columns){
    row.push(0);
  }
  return row;
}

function filterZero(row) {
// 이 함수는 주어진 배열에서 0이 아닌 값들만을 추출하여 새로운 배열을 생성 및 반환
// 이동 후에 0이 아닌 값들만을 남기는 데에 활용됩니다.
  return row.filter((num) => num !== 0); 
}

// 사용자 입력처리 는 ketup 이벤트를 사용 
// 키를 입력한 경우 숫자가 합쳐지기 때문에 여기에 score를 넣어줘야 하나?
// if문을 돌려서 이벤트를 진행하고 if문이 끝났을때 score를 넣어주면 될듯
// code 이벤트객체 속성을 사용 
// 아스키코드인 ArrowLeft를 써서 왼쪽키임을 입력
// 또한 wasd 를 넣어주기 위해 key 속성을 사용

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

/*
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
이 부분에서는 왼쪽, 오른쪽,  위쪽, 아래쪽으로 타일을 이동시키고 결합하는 함수들을 만들어야 합니다.


타일 업데이트 및 표시: 
타일의 업데이트와 표시를 담당하는 함수를 만듭니다. 
이 함수는 보드의 상태를 반영하여 HTML 요소에 숫자를 업데이트하고 적절한 스타일을 적용합니다.


종료 조건 구현: 
게임이 종료되는 조건을 확인하고, 종료될 때 실행할 동작을 구현합니다. 
이 부분에서는 주로 빈 타일이 없는 경우 게임 종료 및 최고 점수 갱신 등을 처리합니다.

기타: 필요한 경우 추가적인 함수나 기능을 구현합니다. 이는 게임의 특성에 따라 다를 수 있습니다.
*/