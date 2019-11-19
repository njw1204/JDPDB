# JDPDB
프론트엔드 – 2명  
백엔드 – 1명  
풀스택 (백엔드를 좀더 많이 봄) - 2명 

발표 : 방석현

<br/>

# 이번주 일요일(11월 24일)까지 프론트엔드, 백엔드 파트별로 다 만들기 (통합 작업 제외)

***다음주 월요일(11월 25일)에 만나서 합칩니다***

<br/>

## 프론트엔드

참고해서 만들자 : 유튜브, 트위치, 페이스북, 아프리카TV 등등...

## 페이지
* 메인 - (통함 검색) (카테고리) (Hot 동물) (구독한 동물) (최근 업로드 동물) (로그인 / 회원가입 -> 로그아웃) (월렛 잔액 + 충전) (내 동물 가기 or 동물 생성 - 동물 페이지는 하나만 만들 수 있다)  
* 로그인 - (이메일) (비밀번호) (회원가입)  
* 회원가입 - (이메일) (닉네임) (비밀번호 1) (비밀번호 2)  
* 동물별 SNS 메인 페이지  
* 검색 결과 페이지 (동물 검색 + 포스트 검색) - 프론트에서 할 수 있을만큼 띄우기 (동물 이름 + 사용자 이름으로 동물 검색, 포스트의 태그 검색)  
* SNS 피드  
* 물품 관리 페이지  

## 동물별 SNS 메인 페이지  
* 기본 - (프로필 사진/이름/등등) (팔로우 수) (SNS 피드) (필요 물품 이름/필요한 개수/1개당 가격)[구매 수량 설정, 구매 버튼] (도네 금액별 혜택 리스트)[도네 금액 설정, 도네 버튼]  
if(후원자) - (후원자 등급 별 전용 글 (백)) (총 후원 금액, 등급)  
if(관리자) - (프로필 사진/이름/등등)[관리] (팔로우 수) (SNS 피드)[글쓰기][글수정][글삭제] (필요 물품)[관리] (도네 금액별 혜택 리스트)[관리]  
* SNS 피드 - (글/사진) (태그) (댓글 칸) (댓글 달기)  

* 필요 물품에 대한 설명은 클릭하면 레이어 팝업(or 모달)으로 뜨게  

## 필요 물품 관리 페이지  
if(관리자) - (물품) (개수) (가격) [추가][수정][삭제]

-----------------------

## 백엔드

프레젠테이션 계층 : 프론트와 연동되는 곳 (사용자에게 보여주는 페이지 백엔드쪽 처리)

* 메인  
  - 구독자 수가 많은 동물을 리스트로 반환  
  - 로그인해있으면 구독한 동물 리스트로 반환  
  - 최근에 포스트 업로드한 동물을 리스트로 반환  
  - 충전 버튼 누를때 포인트 무한으로 늘어나게 구현  
  - 자기 동물 등록되었나 판별 / 등록되어있으면 자기 동물 페이지의 id 반환  

* 로그인  
  - 그냥 전형적인 로그인  

* 회원가입  
  - 그냥 전형적인 회원가입  

* 동물별 SNS 메인 페이지 + SNS 피드  
  - 사용자의 로그인 상태/총 후원 금액, 등급/관리자 여부 반환  
  - 프로필 사진/이름/등등(단순 SELECT), 팔로우 수(쿼리 잘 써서) 반환  
  - 해당 페이지의 Post 목록(나의 후원자 등급 기준으로 볼 수 있는 것들만) 반환 / Post에 관계를 가진 Post_Files 전부 반환 / Post에 관계를 가진 Post_Tags 전부 반환 / Post에 관계를 가진 Comment 전부 반환  
  - Comment 추가/수정/삭제  
  - 만약 관리자라면, 게시글 추가/수정/삭제  
  - 해당 페이지의 필요 물품 목록 반환  
  - 필요 물품에 딸린 구매 버튼 눌렀을 때 구매 처리  
  - 도네 금액별 혜택 리스트 반환  
  - 도네 버튼 누르면 도네 처리  

* 검색 결과 페이지  
  - 검색 : 프론트에서 준 쿼리를 기반으로 조회해서 반환  

* 필요 물품 관리 페이지  
  - 관리자만 접근 가능하게 설정  
  - CRUD (해당 페이지의 필요 물품 반환, 필요 물품 추가/수정/삭제)  

-----------------------------------------------------------------------------------

데이터 엑세스 계층 : 데이터베이스를 다루는 곳 (Post.addPost(title, description))  


DAO (Data Access Object) : SQL  
VO (Value Object) : 메소드가 없고 getter/setter (UserVO : email, name)  

1. DAO의 메인 테이블(FROM에 들어가는것)은 클래스 이름과 일치해야 된다  
2. DAO는 기본적으로 CRUD + CONDITIONAL READ(where에 조건 주는거)를 지원한다.  
3. VO는 테이블과 똑같이  
4. DAO 메소드는 SQL 쿼리 하나를 만드는 느낌으로 작성  
5. 테이블마다 DAO, VO 하나씩 다 만들면 됨  

**클래스 40개 / 메소드 160개 만들 예정**  

### DAO 메소드 예제  
bool create(PostVO post) // 리턴값 : 성공 여부  
bool update(PostVO post) // 리턴값 : 성공 여부  
bool delete(PostVO post) // 리턴값 : 성공 여부  

List<PostVO> getAll() // 리턴값 : 전체 post의 list  
List<PostVO> getPostsOfPage(PageVO page) // 해당 page의 모든 post의 list  
PostVO getPost(int id) // 리턴값 : id에 해당하는 post 반환  