/*********************************************
 * 1) URL 파라미터로부터 데이터 파싱
 *    - { registered: [], deck: [] } 구조
 *********************************************/
let myData = {
    registered: [],
    deck: []
  };
  
  // 전체 캐릭터 목록 (이미지 경로는 상황에 맞게 수정)
  const allCharacters = [
    { id: "101", name: "슬라임", img: "./images/101.png" },
    { id: "102", name: "고블린", img: "./images/102.png" },
    { id: "103", name: "드래곤", img: "./images/103.png" }
  ];
  
  // 페이지 로드 시 실행
  window.addEventListener("DOMContentLoaded", () => {
    parseDataFromURL();
    renderMyCharacters();
  });
  
  /*********************************************
   * 2) URL에서 ?data=... 추출 & myData 갱신
   *********************************************/
  function parseDataFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const encodedData = urlParams.get("data");
    if (!encodedData) return;
  
    try {
      const decoded = atob(encodedData);
      myData = JSON.parse(decoded);
    } catch (err) {
      console.error("데이터 파싱 오류", err);
    }
  }
  
  /*********************************************
   * 3) 등록된 캐릭터 목록 렌더링
   *********************************************/
  function renderMyCharacters() {
    const container = document.getElementById("my-characters");
    container.innerHTML = "";
  
    // registered에 들어있는 id들을 실제 캐릭터 정보로 변환
    myData.registered.forEach((id) => {
      const found = allCharacters.find((c) => c.id === id);
      if (!found) return;
  
      const card = document.createElement("div");
      card.className = "character-card";
      card.innerHTML = `
        <img src="${found.img}" alt="${found.name}" />
        <div class="char-name">${found.name}</div>
      `;
      container.appendChild(card);
    });
  }
  