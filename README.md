## clapProject-server

* 모든 데이터는 시크릿 키를 사용 aes 방식으로 암호화 후 백엔드와 프론트 에서 각각 복호화 후 처리 함
* 클라이언트 페이지에서 는 headers 에 key : 유저 클라이언트 키, 관리자 페이지에서는 auth : base64 문자열로 압축 변환 된 토큰 객체 { a : accessToken, r : refreshToken } 를 담아 api 통신
* contents 폴더에서 유저의 프로필 이미지, 프로젝트 이미지, 첨부 파일 저장
* 운영 서버에서는 gulp를 돌려 난독화 된 파일을 import



- API

| URL                      | Method  | 기능                                 
| ------------------------ | ------- | ---------------------------------------------------------
| /api/account/login       |  POST   | 로그인                               
| /api/account/register    |  POST   | 회원가입                              
| /api/account/idSearch    |  POST   | 아이디 찾기                            
| /api/account/pwSearch    |  POST   | 비밀번호 찾기                           
| /api/account/pwChange    |  POST   | 비밀번호 변경                           
| /api/account/experience  |  POST   | 체험계정 생성                           
| /api/account/logout      |  GET   | 로그아웃                               
| /api/account/withdrawal  |  GET    | 회원탈퇴                               
| /api/files/swiperData    |  POST   | 프로젝트 게시물의 이미지 파일들을 업로드       
| /api/files/attachedFiles |  POST   | 프로젝트 게시물의 첨부 파일들을 업로드        
| /api/files/deleteFiles   |  POST   | 프로젝트 게시물의 이미지, 첨부 파일들을 삭제   
| /api/files/download      |  POST   | 서버에 저장된 첨부 파일을 다운로드           
| /api/hashTag/get         |  GET    | 저장된 내 해시태그 조회
| /api/hashTag/update      |  POST   | 해시태그 업데이트
| /api/key:key             |  GET    | 클라이언트 키가 유효한 키인지 조회
| /api/message/get         |  GET    | 나에게 온 메세지 조회                  
| /api/message/read        |  POST   | 읽지않은 메세지를 읽음 처리                 
| /api/message/delete      |  POST   | 나에게 온 메세지 삭제                  
| /api/message/post        |  POST   | 클라이언트 페이지에서 메세지 보내기
| /api/myInfo/get          |  GET    | 유저 정보 조회
| /api/myInfo/update       |  POST   | 유저 정보 수정 (직업 변경 및 생년월일, 이메일, 휴대폰번호 공개 or 비공개)
| /api/myInfo/home         |  POST   | 내 포트폴리오 사이트 링크 조회
| /api/profileImg/get      |  GET    | 유저 프로필 이미지 조회
| /api/profileImg/update   |  POST   | 유저 프로필 이미지 수정
| /api/project/get         |  GET    | 유저가 등록한 프로젝트 조회
| /api/project/add         |  POST   | 유저 프로젝트 등록
| /api/project/update      |  POST   | 유저가 등록한 프로젝트 수정
| /api/project/delete      |  POST   | 등록한 프로젝트 삭제
| /api/project/:itemKey    |  GET    | 프로젝트 상세 페이지 조회
| /api/resume/get          |  GET    | 유저가 등록한 이력 조회
| /api/resume/add          |  POST   | 유저 이력 등록
| /api/resume/update       |  POST   | 유저가 등록한 이력 수정
| /api/resume/delete       |  POST   | 등록한 이력 삭제
| /api/token/verify        |  GET    | 토큰 유효성 검사
