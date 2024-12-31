// js/common.js

/**
 * URL 쿼리 파라미터에서 data를 가져와서 JSON으로 파싱해주는 함수
 * 예: ?data=<base64문자열> 이 있으면 그걸 파싱
 */
function getUserDataFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    const encodedData = urlParams.get('data');
    if (!encodedData) {
      // 데이터가 없으면 기본 구조를 리턴
      return {
        userName: "Jeff",
        age: 27,
        characters: [],
        deck: []
      };
    }
    
    // base64 디코딩 -> JSON 파싱
    try {
      const decoded = atob(encodedData);
      return JSON.parse(decoded);
    } catch (error) {
      console.error("URL data 파싱 에러:", error);
      return {
        userName: "Jeff",
        age: 27,
        characters: [],
        deck: []
      };
    }
  }
  
  /**
   * userData(객체)를 JSON.stringify -> base64 인코딩 -> URL 변경
   */
  function setUserDataToUrl(userData, redirect = false) {
    const jsonString = JSON.stringify(userData);
    const encodedData = btoa(jsonString);
  
    // 현재 URL에서 data 파라미터만 교체
    const url = new URL(window.location.href);
    url.searchParams.set('data', encodedData);
  
    if (redirect) {
      // 페이지 리다이렉트
      window.location.href = url.toString();
    } else {
      // 히스토리만 변경 (페이지 새로고침 X)
      window.history.replaceState({}, '', url.toString());
    }
  }
  
  /**
   * 유저가 캐릭터를 소유하고 있는지 확인
   */
  function hasCharacter(userData, characterId) {
    return userData.characters.includes(characterId);
  }
  