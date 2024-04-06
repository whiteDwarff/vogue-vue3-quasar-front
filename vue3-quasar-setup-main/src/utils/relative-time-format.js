/**
 * @param { string } currentTime
 * @returns { string } currentTime의 상대시간 (몇분 전, 몇일 전..)을 반환
 * -------------------------------------------------------------------
 */
export function formatRelativeTime(time) {
  // 국제화와 관련된 JS 객체, 날짜, 시간등...
  const rtf = new Intl.RelativeTimeFormat('ko', {
    /**
     * numeric
     *  - auto : 그저께
     *  - always : 2일 전  (숫자로 출력)
     */
    numeric: 'always',
  });

  // 현재시간 객체
  const currentTime = new Date();
  // 파라미터로 받아온 time - 현재시간 (양수로 변환)
  const timeDifference = Math.abs(time - currentTime);

  const seconds = Math.floor(timeDifference / 1000); // 초
  const minutes = Math.floor(seconds / 60); // 분
  const hours = Math.floor(minutes / 60); // 시간
  const days = Math.floor(hours / 24); // 날짜
  const years = Math.floor(days / 365); // 년

  if (years > 0) return rtf(-1 * years, 'year');
  /**
   * @TODO:
   * 적당한 일수가 지나면 time 값 그대로 return 시켜도 될듯..?
   */ else if (days > 0) return rtf.format(-1 * days, 'day');
  else if (hours > 0) return rtf.format(-1 * hours, 'hours');
  else if (minutes > 0) return rtf.format(-1 * minutes, 'minutes');
  else return rtf.format(-1 * seconds, 'second');
}
