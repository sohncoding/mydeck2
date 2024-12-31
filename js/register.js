// js/register.js

window.addEventListener('DOMContentLoaded', () => {
  const userData = getUserDataFromUrl();
  const allCharactersDiv = document.getElementById('all-characters');

  // 전체 캐릭터 정보를 표시
  ALL_CHARACTERS.forEach((charInfo) => {
    const charContainer = document.createElement('div');
    charContainer.style.display = "inline-block";
    charContainer.style.textAlign = "center";
    charContainer.style.margin = "10px";

    const img = document.createElement('img');
    img.src = charInfo.img;
    img.alt = charInfo.name;
    img.style.width = "100px";
    img.style.height = "100px";
    img.style.display = "block";
    img.style.cursor = "pointer";

    const label = document.createElement('span');
    label.textContent = charInfo.name;

    // 이미 등록한 캐릭터면 반투명 처리
    if (hasCharacter(userData, charInfo.id)) {
      img.style.opacity = "0.5";
    }

    // 캐릭터 클릭 시 등록 처리
    img.addEventListener('click', () => {
      // 이미 등록되어 있으면 무시
      if (hasCharacter(userData, charInfo.id)) {
        alert("이미 등록된 캐릭터입니다!");
        return;
      }
      // 등록
      userData.characters.push(charInfo.id);
      setUserDataToUrl(userData, true); // URL에 반영 & 페이지 리다이렉트
    });

    charContainer.appendChild(img);
    charContainer.appendChild(label);
    allCharactersDiv.appendChild(charContainer);
  });
});
