ㅊ# clapProject-server-code

* 모든 데이터는 시크릿 키를 사용 aes 방식으로 암호화 후 백엔드와 프론트 에서 각각 복호화 후 처리 함
* 클라이언트 페이지에서 는 headers 에 key : 클라이언트 키, 관리자 페이지에서는 auth : base64 문자열로 압축 변환 된 토큰 객체 { a : accessToken, r : refreshToken } 를 담아 api 통신

| URL                    | Method  | 기능             | 설명                                                           |
| ------------------------ | ------- | --------------- | ------------------------------------------------------------- |
| /api/account/login       |  POST   | 로그인            | 로그인 성공시 base64 문자열로 압축 변환한 토큰 객체를 넘겨 받음
| /api/account/register    |  POST   | 회원가입           | 비밀번호는 base64 문자열로 압축 변환 해 데이터베이스에 저장
| /api/account/idSearch    |  POST   | 아이디 찾기        | 이름과 이메일, 폰번호로 유저 정보를 조회 후 아이디를 넘겨받음
| /api/account/pwSearch    |  POST   | 비밀번호 찾기       | 아이디, 이름, 이메일, 폰번호 로 유저 정보를 조회
| /api/account/pwChange    |  POST   | 비밀번호 변경       | 새로 변경할 비밀번호를 base64 문자 열로 압축 변환후 저장
| /api/account/experience  |  POST   | 체험계정 생성       | 생성할 아이디와 비밀번호를 시크릿 키와 함께 백엔드로 전송
| /api/account/logout      |  GET   | 로그아웃           | 서버에서 토큰을 폐기
| /api/account/withdrawal  |  GET    | 회원탈퇴           | 데이터 베이스에서 유저 정보를 제거 함

| /api/account/withdrawal  |  GET    | 회원탈퇴           | 데이터 베이스에서 유저 정보를 제거 함

