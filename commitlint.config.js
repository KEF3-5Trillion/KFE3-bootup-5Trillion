module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',     // 새로운 기능
        'fix',      // 버그 수정
        'docs',     // 문서만 변경
        'style',    // 코드 포맷팅, 세미콜론 누락 등
        'refactor', // 코드 리팩터링
        'perf',     // 성능 개선
        'test',     // 테스트 추가 또는 기존 테스트 수정
        'chore',    // 빌드 프로세스 또는 보조 도구 변경
        'build',    // 빌드 시스템 또는 외부 종속성 변경
        'ci',       // CI 설정 파일 및 스크립트 변경
        'revert',   // 이전 커밋 되돌리기
        'design',   // UI 디자인 변경 또는 css 관련 작업
        'hotfix',   // 긴급한 버그 수정
        'comment',  // 주석 추가 또는 수정
        'rename',   // 파일 또는 폴더명 변경
        'remove'    // 파일 삭제
      ]
    ],
    'subject-max-length': [2, 'always', 72],
    'subject-min-length': [2, 'always', 10],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'header-max-length': [2, 'always', 100]
  }
};
