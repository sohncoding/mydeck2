// js/register.js

window.addEventListener('DOMContentLoaded', () => {
  // 1. URL에서 userData를 읽어오기
  const userData = getUserDataFromUrl();

  const allCharactersDiv = document.getElementById('all-characters');
  const completeBtn = document.getElementById('complete-btn');

  // 2. 전체 캐릭터 목록 표시
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

    // 이미 등록되어 있다면 반투명 처리
    if (hasCharacter(userData, charInfo.id)) {
      img.style.opacity = "0.5";
    }

    // 캐릭터 클릭 시
    img.addEventListener('click', () => {
      // 이미 등록한 경우 경고
      if (hasCharacter(userData, charInfo.id)) {
        alert("이미 등록된 캐릭터입니다!");
        return;
      }

      // 등록
      userData.characters.push(charInfo.id);

      // URL에 반영하되, 페이지 리로드(redirect)는 하지 않음
      // 두 번째 인자 false → history.replaceState로 URL만 바꿈
      setUserDataToUrl(userData, false);

      // 반투명 처리
      img.style.opacity = "0.5";
    });

    charContainer.appendChild(img);
    charContainer.appendChild(label);
    allCharactersDiv.appendChild(charContainer);
  });

  // 3. 등록 완료 버튼
  completeBtn.addEventListener('click', () => {
    // 혹시 마지막에 또 저장해주고 싶다면(옵션)
    setUserDataToUrl(userData, false);

    // 현재 URL에서 data= 파라미터 추출
    const currentUrl = new URL(window.location.href);
    const dataParam = currentUrl.searchParams.get('data') || '';

    // 메인 페이지로 이동하되, ?data=... 포함
    window.location.href = `../?data=${dataParam}`;
  });
});
