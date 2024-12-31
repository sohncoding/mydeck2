let myData = {
    registered: [],
    deck: []
  };
  
  const allCharacters = [
    { id: "101", name: "슬라임", img: "../images/101.png" },
    { id: "102", name: "고블린", img: "../images/102.png" },
    { id: "103", name: "드래곤", img: "../images/103.png" }
  ];
  
  window.addEventListener("DOMContentLoaded", () => {
    parseDataFromURL();
    renderMyCharacters();
    renderMyDeck();
  });
  
  /********************************************
   * 1) URL → myData
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
   * 2) 등록된 캐릭터를 표시 -> 클릭 시 덱에 추가
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
  
      card.addEventListener("click", () => {
        onAddToDeck(found.id);
      });
  
      container.appendChild(card);
    });
  }
  
  function onAddToDeck(charId) {
    if (myData.deck.includes(charId)) {
      alert("이미 덱에 등록된 캐릭터입니다.");
      return;
    }
    if (myData.deck.length >= 5) {
      alert("덱은 최대 5개까지 가능합니다.");
      return;
    }
    myData.deck.push(charId);
    updateURL();
    renderMyDeck();
  }
  
  /********************************************
   * 3) 내 덱 표시 -> 클릭 시 제거
   ********************************************/
  function renderMyDeck() {
    const container = document.getElementById("my-deck");
    container.innerHTML = "";
  
    myData.deck.forEach((id) => {
      const found = allCharacters.find((c) => c.id === id);
      if (!found) return;
  
      const card = document.createElement("div");
      card.className = "character-card";
      card.innerHTML = `
        <img src="${found.img}" alt="${found.name}" />
        <div class="char-name">${found.name}</div>
      `;
  
      card.addEventListener("click", () => {
        onRemoveFromDeck(found.id);
      });
  
      container.appendChild(card);
    });
  }
  
  function onRemoveFromDeck(charId) {
    myData.deck = myData.deck.filter((id) => id !== charId);
    updateURL();
    renderMyDeck();
  }
  
  /********************************************
   * 4) updateURL
   ********************************************/
  function updateURL() {
    const str = JSON.stringify(myData);
    const b64 = btoa(str);
    const newURL = `${window.location.origin}${window.location.pathname}?data=${b64}`;
    window.history.replaceState({}, "", newURL);
  }
  