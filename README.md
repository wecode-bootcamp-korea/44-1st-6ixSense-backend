# Team 6ixSense -osulloc Clone coding
<br />
프로젝트 기간: 2023.04.03 ~ 2023.04.14

## FrontEnd

- <a href="https://github.com/Hyomins-013">신효민<img src="https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=GitHub&logoColor=white&link=https://github.com/hongyeollee"/></a>
- <a href="https://github.com/alchogh">조건호<img src="https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=GitHub&logoColor=white&link=https://github.com/hongyeollee"/></a>
- <a href="https://github.com/Hyoster">박효성<img src="https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=GitHub&logoColor=white&link=https://github.com/hongyeollee"/></a>


|                                             JavaScript                                             |                                                 React                                                 |                                                                              Sass                                                                               |                                                 esLint                                                 |                                                 Prettier                                                  |
| :------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------: |
| <img src="https://techstack-generator.vercel.app/js-icon.svg" alt="icon" width="65" height="65" /> | <img src="https://techstack-generator.vercel.app/react-icon.svg" alt="icon" width="65" height="65" /> | <div style="display: flex; align-items: flex-start;"><img src="https://techstack-generator.vercel.app/sass-icon.svg" alt="icon" width="65" height="65" /></div> | <img src="https://techstack-generator.vercel.app/eslint-icon.svg" alt="icon" width="65" height="65" /> |<div style="display: flex; align-items: flex-start;"><img src="https://techstack-generator.vercel.app/prettier-icon.svg" alt="icon" width="65" height="65" /></div> |




<br />



## BackEnd

- <a href="https://github.com/parkseyik">박세익 <img src="https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=GitHub&logoColor=white&link=https://github.com/minseoya"/></a>
- <a href="https://github.com/thornewater">김원종<img src="https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=GitHub&logoColor=white&link=https://github.com/lsg622"/></a>
- <a href="https://github.com/songsong95">송석준<img src="https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=GitHub&logoColor=white&link=https://github.com/Dongrang072"/></a>

<br />


|                                             JavaScript                                             |                                                Nodejs                                                 |                                                 MySql                                                 |                                                  Rest                                                   |
| :------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------: |
| <img src="https://techstack-generator.vercel.app/js-icon.svg" alt="icon" width="65" height="65" /> | <img src="https://techstack-generator.vercel.app/nginx-icon.svg" alt="icon" width="65" height="65" /> | <img src="https://techstack-generator.vercel.app/mysql-icon.svg" alt="icon" width="65" height="65" /> | <img src="https://techstack-generator.vercel.app/restapi-icon.svg" alt="icon" width="65" height="65" /> |

  
<br/>

# 오설록 -  클론 코딩 프로젝트



1. 회원가입, 로그인 , 인증 (원종)
2. productList 페이지네이션, 상품 필터링 (세익)
3. productDetailPage 페이지네이션 (석준)
4. 좋아요 API (석준)
5. 장바구니 CRUD API (원종)
6. 주문 API (석준)
<br/>

# 회원가입, 로그인 , 인증 (원종)
![signup](https://user-images.githubusercontent.com/123849268/232360555-3188c6df-31dc-4627-9717-161ac49a2c35.gif)
![logingif](https://user-images.githubusercontent.com/123849268/232360579-23392ced-1c12-43a8-9980-806d6a6e4270.gif)

1. 회원가입시 중복된 아이디가 있는 경우 DB에서 저장되지 않게 함
2.  회원가입 시, 아이디와 비밀번호에 정규표현식을 설정하여 특정 조건을 만족하지 못하면 회원가입이 되지 못하게 함.
3. 회원가입 시 사용자의 비밀번호는 해시를 사용하여 암호화되어 데이터베이스에 저장
4. 인증이 성공하면 JSON 웹 토큰(JWT)이 생성되어 응답으로 전달되며, 이후 추가 인증 요청에 사용할 수 있습니다.
<br/>

# productList 페이지네이션, 상품 필터링 (세익)
![main_2 (1)](https://user-images.githubusercontent.com/123849268/232360878-481bf06a-b1a6-46bf-a0dd-bdd46126256b.gif)
![listgif](https://user-images.githubusercontent.com/123849268/232360953-d8050f34-fbae-4f7a-97a3-cad522116124.gif)


1. 메인 페이지의 오늘의 추천 상품에 추천상품과 할인된 가격의 데이터를 만들어 Client가 받을 수 있게 연결
2. 상품의 가격을 정렬하여 낮은 가격순, 높은 가격순으로 선택할 수 있는 api구현
3. 상품의 카테고리별로 필터링하여 상품을 선택할 수 있도록 구현
4. 상품 이미지를 선택할 시 Product Image와 Hover Image를 함께 제공하기 위해, 상품 정보에 2개의 이미지 URL을 추가하고 클라이언트 측에서 이를 구현
5. LIMIT와 OFFSET으로 페이지네이션을 적용하여 페이지 이동 구현
6. 상품 가격 외 할인된 가격도 함께 계산 할 수 있도록 쿼리문에서 조건문을 사용하여 구현
