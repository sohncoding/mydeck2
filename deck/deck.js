let myData = {
    registered: [],
    deck: []
  };
  
  const allCharacters = [
    { id: "101", name: "스노우 화이트", img: "../images/101.png" },
    { id: "102", name: "이사벨", img: "../images/102.png" },
    { id: "103", name: "라푼젤", img: "../images/103.png" },
    { id: "104", name: "홍련", img: "../images/104.png" },
    { id: "105", name: "하란", img: "../images/105.png" },
    { id: "106", name: "노아", img: "../images/106.png" },
    { id: "107", name: "모더니아", img: "../images/107.png" },
    { id: "108", name: "니힐리스타", img: "../images/108.png" },
    { id: "109", name: "도로시", img: "../images/109.png" },
    { id: "110", name: "레드 후드", img: "../images/110.png" },
    { id: "111", name: "스노우 화이트:이노센트 데이즈", img: "../images/111.png" },
    { id: "112", name: "홍련:흑영", img: "../images/112.png" },
    { id: "113", name: "크라운", img: "../images/113.png" }
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
  