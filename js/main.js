// js/main.js

window.addEventListener('DOMContentLoaded', () => {
    const userData = getUserDataFromUrl();
    const characterListDiv = document.getElementById('character-list');
  
    // userData.characters 에는 사용자가 등록한 캐릭터 ID 배열이 들어 있음
    if (userData.characters.length === 0) {
      characterListDiv.textContent = "등록된 캐릭터가 없습니다. 등록 페이지로 가서 캐릭터를 추가해보세요!";
      return;
    }
  
    // 등록된 캐릭터를 가져와서 화면에 표시
    userData.characters.forEach(charId => {
      // ALL_CHARACTERS에서 해당 캐릭터 정보 찾아오기
      const charInfo = ALL_CHARACTERS.find(c => c.id === charId);
      if (!charInfo) return;
  
      // DOM 생성
      const img = document.createElement('img');
      img.src = charInfo.img;
      img.alt = charInfo.name;
      img.style.width = "100px";
      img.style.height = "100px";
      img.style.marginRight = "10px";
  
      characterListDiv.appendChild(img);
    });
  });
  