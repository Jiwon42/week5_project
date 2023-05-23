//1. 페이지 로드시 저장된 할일 물러오기

/*

DOMContentLoaded : html 문서가 완전히 로드되면 발생하는 이벤트
JSON.parse : 문자열을 JavaScript 객체로 변환, 데이터가 없으면 빈 배열을 반환함
localStroage.getItem('tasks') : tasks 라는 키로 저장된 데이터를 불러옴
**데이터가 null이거나 undifined인경우 빈배열[]을 할당
renderTasks : 함수를 호출하여 할 일 목록을 렌더링

*/
window.addEventListener('DOMContentLoaded', () => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || []; 
    renderTasks(savedTasks);
  });
  
  // 2. 새로운 할 일 추가
  /*
  addTask : 추가버튼을 클릭했을 때 호출
  taskInput : 입력된 텍스트를 가져옴 / 
  **trim : 받아온 value 값의 양쪽의 공백 제거
  
  localStorage.getItem('tasks') : 이전에 저장된 할 일 목록을 불러옴 / 데이터가 없으면 배열을 반환
                                새로운 할 일을 할 일 목록에 추가 
  localStorage.setItem('tasks', JSON.stringify(savedTasks)); : 업데이트 된 할 일 목록을 로컬 스토리지에 저장
  renderTasks : 함수를 호출하여 할 일 목록을 다시 렌더링
  taskInput.value =''; 값을 비우기
  */
  function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
      const task = { id: Date.now(), text: taskText };
      const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
      savedTasks.push(task);
      localStorage.setItem('tasks', JSON.stringify(savedTasks));
      renderTasks(savedTasks);
      taskInput.value = '';
    }
  }
  
  // 3. 할 일 삭제
/*
deleteTask : 삭제버튼을 클랙했을때 호출 / id : 삭제 할일의 고유 식별자
localStroage.getItem('tasks') : 저장된 할 일 목록 불러오기
                                데이터가 없으면 빈배열 출력
localStorage.setItem() : 데이터를 로컬 스토리지에 저장
**JSON.stringify : 객체를 문자열로 변환

*/
  function deleteTask(id) {
    
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const updatedTasks = savedTasks.filter(task => task.id !== id);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    renderTasks(updatedTasks);
  }
  
  // 4. 할 일 목록 렌더링
  /*
  taskList.innerHTML=''; : 이전에 렌더링했던 내용 비우기
  **forEach 메서드 : tasks 배열의 각 할 일에 대해 작성한 순서대로 순서대로 수행
  document.createElement('li'); : 새로운 li 요소를 생성
  listItem.innerHTML : 할일의 텍스트와 삭제버튼을 포함한 html 추가
  taskList.appendChild(listItem); : listItem 요소를 taskList에 추가
  */
  function renderTasks(tasks) {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    tasks.forEach(task => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `
        <span>${task.text}</span>
        <button class=" rounded-lg bg-indigo-600 mt-8  px-5 py-3 text-sm font-medium text-white" onclick="deleteTask(${task.id})">삭제</button>
      `;
      taskList.appendChild(listItem);
    });
  }