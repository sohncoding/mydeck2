// js/deck.js

window.addEventListener('DOMContentLoaded', () => {
  const userData = getUserDataFromUrl();
  const myCharactersDiv = document.getElementById('my-characters');
  const saveDeckBtn = document.getElementById('save-deck-btn');

  // 등록된 캐릭터 목록 (ID) -> 캐릭터 정보
  const myChars = ALL_CHARACTERS.filter(c => userData.characters.includes(c.id));

  if (myChars.length === 0) {
    myCharactersDiv.textContent = "등록된 캐릭터가 없습니다. 먼저 캐릭터를 등록해주세요!";
    saveDeckBtn.disabled = true;
    return;
  }

  // 선택한 캐릭터 ID를 저장할 배열
  let selectedCharIds = [...userData.deck]; // 만약 deck에 이미 설정한 캐릭터가 있다면 기본값으로
  renderMyCharacters();

  saveDeckBtn.addEventListener('click', () => {
    if (selectedCharIds.length !== 5) {
      alert("덱은 정확히 5명이어야 합니다!");
      return;
    }
    userData.deck = selectedCharIds;
    setUserDataToUrl(userData, true); // URL에 반영 & 페이지 리다이렉트
  });

  function renderMyCharacters() {
    myCharactersDiv.innerHTML = ''; // 초기화

    myChars.forEach(char => {
      const charContainer = document.createElement('div');
      charContainer.style.display = "inline-block";
      charContainer.style.margin = "10px";
      charContainer.style.textAlign = "center";

      const img = document.createElement('img');
      img.src = char.img;
      img.alt = char.name;
      img.style.width = "100px";
      img.style.height = "100px";
      img.style.display = "block";
      img.style.cursor = "pointer";

      // 선택된 캐릭터는 테두리 표시
      if (selectedCharIds.includes(char.id)) {
        img.style.border = "2px solid red";
      }

      const label = document.createElement('span');
      label.textContent = char.name;

      // 클릭 시 선택/해제
      img.addEventListener('click', () => {
        if (selectedCharIds.includes(char.id)) {
          // 이미 선택 -> 해제
          selectedCharIds = selectedCharIds.filter(id => id !== char.id);
        } else {
          // 선택
          if (selectedCharIds.length >= 5) {
            alert("덱은 최대 5명까지 가능합니다.");
            return;
          }
          selectedCharIds.push(char.id);
        }
        renderMyCharacters(); // 다시 그리기
      });

      charContainer.appendChild(img);
      charContainer.appendChild(label);
      myCharactersDiv.appendChild(charContainer);
    });
  }
});
