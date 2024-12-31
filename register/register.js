/********************************************
 * 1) 공통 구조
 *    myData = { registered: [], deck: [] }
 ********************************************/
let myData = {
    registered: [],
    deck: []
  };
  
  // "이미 웹사이트가 알고 있는" 전체 캐릭터 목록
  const allCharacters = [
    { id: "101", name: "슬라임", img: "../images/101.png" },
    { id: "102", name: "고블린", img: "../images/102.png" },
    { id: "103", name: "드래곤", img: "../images/103.png" }
  ];
  
  /********************************************
   * 2) 페이지 로드 시 URL 파싱 후 렌더링
   ********************************************/
  window.addEventListener("DOMContentLoaded", () => {
    parseDataFromURL();
    renderAvailableCharacters();
    renderMyCharacters();
  });
  
  /********************************************
   * 3) URL → myData
   ********************************************/
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
  
  /********************************************
   * 4) 등록 가능한 캐릭터(전체) 표시
   ********************************************/
  function renderAvailableCharacters() {
    const container = document.getElementById("available-characters");
    container.innerHTML = "";
  
    allCharacters.forEach((char) => {
      const card = document.createElement("div");
      card.className = "character-card";
      card.innerHTML = `
        <img src="${char.img}" alt="${char.name}" />
        <div class="char-name">${char.name}</div>
      `;
  
      // 클릭 시 등록
      card.addEventListener("click", () => {
        onRegisterCharacter(char.id);
      });
  
      container.appendChild(card);
    });
  }
  
  /********************************************
   * 5) 캐릭터 등록
   ********************************************/
  function onRegisterCharacter(charId) {
    // 이미 등록되어 있지 않으면 추가
    if (!myData.registered.includes(charId)) {
      myData.registered.push(charId);
      updateURL();
      renderMyCharacters();
    }
  }
  
  /********************************************
   * 6) 내가 등록한 캐릭터 표시
   ********************************************/
  function renderMyCharacters() {
    const container = document.getElementById("my-characters");
    container.innerHTML = "";
  
    myData.registered.forEach((id) => {
      const found = allCharacters.find((c) => c.id === id);
      if (!found) return;
  
      const card = document.createElement("div");
      card.className = "character-card";
      card.innerHTML = `
        <img src="${found.img}" alt="${found.name}" />
        <div class="char-name">${found.name}</div>
      `;
  
      // 클릭 시 등록 해제
      card.addEventListener("click", () => {
        onUnregisterCharacter(found.id);
      });
  
      container.appendChild(card);
    });
  }
  
  function onUnregisterCharacter(charId) {
    myData.registered = myData.registered.filter((id) => id !== charId);
    updateURL();
    renderMyCharacters();
  }
  
  /********************************************
   * 7) myData -> base64 -> URL
   ********************************************/
  function updateURL() {
    const str = JSON.stringify(myData);
    const b64 = btoa(str);
  
    const newURL = `${window.location.origin}${window.location.pathname}?data=${b64}`;
    window.history.replaceState({}, "", newURL);
  }
  