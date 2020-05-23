---
title: Daily Study Logging26 - 웹브라우저 동작방식
date: "2020-05-23T21:14:32.169Z"
description: 웹브라우저 동작방식
tags: ["knowledge", "studylog", "web"] 
---

[MDN의 브라우저 동작방식](https://developer.mozilla.org/en-US/docs/Web/Performance/How_browsers_work)을 의역을 많이 섞어서 번역한 글이다. 오타 및 오역에 주의 해 주시길..

브라우저는 싱글 쓰레드다. 렌더 타임이 좋은 유저경험의 핵심이다. 브라우져의 싱글쓰레드적 특징을 이해하고 가능한 메인 쓰레드의 부담을 줄이는 방향으로 코드를 짜는게 개발자의 역할이다. 

브라우져 동작 과정 

**네비게이션**, 

네비게이션은 웹페이지를 불러오는데 첫번째 스텝이다. 유저가 url을 입력하거나 링크를 클릭할 때 시작된다. 

DNS lookup: 
⁃	네비게이션의 첫 작업, 한번도 방문한 적이 없는 곳을 가기 위해서는 반드시 DNS를 거쳐야 한다. 한번 방문한 뒤로는 캐싱이 되어서 일정기간동안 그 이름과 IP주소를 브라우져는 알고 있다. DNS lookup은 페이지가 로드되는데 필요한 호스트 이름별로 이루어진다. 여러개의 호스트를 사용한다면 DNS lookup의 시간이 길어지고 로딩도 더 느려진다. 

⁃	모바일의 경우 문제는 더 심각한데, 모바일에서 핸드폰 회사에 들렸다가 dns에서 이름을 찾고 다시 알려줘야 하기 때문이다. 레이턴시 문제가 더 심하다. 

**TCP Handshake**

아이피 주소를 알게 되었다면, 브라우져는 TCP 3three-way handshake를 통해서 서버와 연결을 한다. 이 메커니즘을 통해서, 두 entity는 데이터를 전달하기 전에  종종 HTTPS 상에서 이루어질 네트워크 tcp 소켓커넥션에 대한 파라메터를 협의한다. 

TCP 3way는 SYN - SYN -ACK로 이루어진다. 
 

**TLS Negotiation**

HTTPS 에서 이루어지는 더 안전한 연결을 위해서는 한번의 handshake가 더 필요하다. 이를 TLS negotiation이라고 한다. 

TLS negotiation은 어떤 암호화 방식을 사용할지 클라이언트와 서버간에 협의하는 것이다. 이 과정은 3번의 roundtrip을 더 요구한다. 





**Response**

일단 서버와 연결이 이루어지고 나면 브라우져는 즉시 HTTP GET request를 보낸다. 이때 HTML file을 받아오게 된다. 리퀘스트를 받은 서버는 HTML 파일을 넘겨 준다. 

```html
<!doctype HTML>
<html>
 <head>
  <meta charset="UTF-8"/>
  <title>My simple page</title>
  <link rel="stylesheet" src="styles.css"/>
  <script src="myscript.js"></script>
</head>
<body>
  <h1 class="heading">My Page</h1>
  <p>A paragraph with a <a href="https://example.com/about">link</a></p>
  <div>
    <img src="myimage.jpg" alt="image description"/>
  </div>
  <script src="anotherscript.js"></script>
</body>
</html>
```
이 첫 response는 first byte of data recieved를 포한한다. TTFB(Time to First Byte)는 유저가 리퀘스트를 한 후 첫 HTML 패킷을 받는 데 까지 걸리는 시간을 의미한다.  첫 콘텐츠는 보통 14kb 정도의 용량이다. 
위의 HTML파일에 담겨 있는 링크는 바로 실행되지 안고 파싱의 과정에서 만나야 실행된다.

[ TCP Slow Start / 14kb rule ]

첫 response packet은 14 kb일 것이다. 이는 네트워크 연결속도의 벨런스를 잡아주는 TCP slow start 알고리즘의 일부다. TCP slow start는 네트워크의 최대 밴드윗이 결정될 때까지 전송되는 데이터의 양을 늘려간다.

TCP Slow Start에서, 첫 패킷을 받은 뒤 서버는 다음 패킷의 용량을 두배로 늘린다. threshold까지 늘어나거나 congestion이 감지되면 용량 늘리기를 멈춘다. 



[ Congestion control ]
클라이언트는 ACK를 서버로 보내 패킷을 받았음을 확인한다. 이 연결은 하드웨어나 네트워크 상황에 따라 제한된 용량을 가지고 있다. 서버가 너무 많은 패킷을 너무 빨리 보내면, 몇개는 유실 될 위험이 있다. 즉, ACK 가 없다는 말이다 이 경우 서버는 놓친 ACK를 기록한다. ACK 를 기준으로 서버는 패킷 용량을 늘릴지 말지 결정한다.

**Parsing**

브라우져가 데이터를 받으면 받은 데이터를 파싱하기 시작한다. Parsing은 브라우져가 받아온 데이터를 DOM 과 CSSOM 으로 바꾸는 과정을 말한다. 

DOM 은 브라우져 마크업의 내부적 표현이다. 자바스크립트 API로 조작될 수 있다. 

요청된 페이지의 HTML이 14kb가 넘더라도 브라우져는 파싱을 시작한다. 없는 부분은 이전에 가지고 있던 경험에 기반한다. 이때문에 HTML 과 필요한 정보(최소한 템플릿 이라도.. )를 처음 14kb안에 들어가도록 하는게 중요한다. 

Parsing 단계에서는 5가지 중요한 스텝이 있다.

[ Dom tree 만들기 ]

첫 단계는 HTML 마크업을 프로세스 해서 DOM tree를 만드는 것 이다. HTML 파싱은 토크나이제이션과 tree construction을 포함한다. Html 토큰은 속성 이름과 값, 시작과 끝 태그를 포함한다. 문서가 잘 작성되어 있으면 파싱은 더 빠르고 직관적이다. Parser는 토큰화된 인풋을 다큐먼트로 파싱하고 DOM tree를 만든다. 

DOM tree는 document의 컨텐츠를 설명한다. HTML 엘레먼트는 첫 태그다. 다른 테그안에 nesting 된 태그는 child node다.  DOM s노드가 많을수록DOM tree를 만드는데 시간이 더 오래 걸린다.

Img 태그 같은 블록이 아닌 리소스가 발견되면, 브라우져는 해당 리소스를 요청하고 파싱을 계속한다. Css file을 만나도  파싱은 계속되지만, async나 defer 속성이 없는 script 태그를 만다면 렌더링을 멈춘다. 브라우져의 preload scanner가 이 과정을 빠르게 하지만 여전히 많은 script태그를 쓰는건 바틀넥이 될 수 있다. 

[Preload scanner]

브라우져가 DOM tree를 만드는 동안, Preload scanner가 매인 스레드를 차지한다. 이 과정에서 preload scanner는 css, javascript, web font 등 우선순위가 높은 리소스를 먼저 요청한다. 

이 과정이 있기에 파서가 외부 링크를 찾고 리소스를 요청할 때까지 참지 않아도 된다. 백그라운드에서 미리 신청해 놓기에 HTML 파서가 요청을 한 순간에는 이미 요청이 보내졋거나 리소스가 다운로드 되어 있을 수 있다. 


[Building the CSSOM]

두번째 단계는 CSS 를 프로세스 해서 CSSOM 을 만드는 것이다. DOM과 비슷하지만 둘은 서로 독립적인 자료구조다.  브라우져는 CSS 를 이해할 수 있으면 CSS규칙을 스타일들의 맵으로 만든다. 그리고는 CSS 셀렉터를 기준으로 부모, 자식, 형제 관계의 트리를 만든다. 

CSSOM 트리는 유저의 스타일 시트를 따라서 만든다. 브라우저는 제일 일반적인 룰 을 먼저 적용하고 점차 세부적인 룰을 만들어 간다.즉 property value를 cascading 한다. 

CSSOM을 만드는 것은 아주 빠르고, 개발자 도구로 확인할 수 없을 정도로 빠르다. 개발자 도구의 “Recalculate Style” 을 보면 얼마나 빨리 완수 했는지 알 수 있다. 일반적으로 DNS 룩업보다도 빠르게 걸린다. 


[Other Processes]

자바스크립트 컴파일, CSS가 파싱되고 CSSOM이 만들어질 동안 자바스크립트 파일은 다운로드 되고 있다. (Preload scanner 덕분이다.) 자바스크립트는 iterpreted 되고 compile 되고 파싱 되고 수행된다. 

Accessibility Tree , 브라우져는 assistive device 가 파싱을 할 수 있도록 AOM 을 만든다. 


**Render**

CSSOM 과 DOM은 Render 단계에서 합쳐져서 눈에 보이는 요소들의 레이아웃을 정하는데사용된다. 그리고 그 뒤 화면이 그려진다. 몇몇 경우 컨텐츠는 메인스레드에서 벗어나 GPU가 아닌 CPU를 사용하여 필요한 연산을 하기도 한다. 


[Style] 

세번째 단계는, DOM과 CSSOM을 합쳐서 렌더 트리를 만드는 것이다. 렌더트리와 함께 DOM tree의 루트에서 시작하여, 보이는 모든 노드를 순회한다. 

눈에 보이지 않는 요소는 렌더 트리에 포함되지 않는다. 헤드테그나 display none등이 포함 안된다. 단, visiviity hidden은 실제 공간을 차지하므로 연산에 포함된다. 스크립트 노드도 포함되지 않는다. 

각 DOM노드는 CSSOM 규칙이 있다. 렌더 트리는 CSS cascade에 기초해서 어떤 스타일을 적용할지 정한다. 


[Layout]

네번째 단계는, 각 렌더 트리에 있는 각 노드의 위치를 정하기 위한 레이아웃을 계산하는 것이다.  Width, height, location, 등등 이 여기서 반영된다.

렌더 트리가 구성되면 레이아웃이 시작된다. 렌더 트리를 구상할때는 뭘 보여줄지는 정하지만 레이아웃 관련된 것은 정하지 않는다. 이 단계에서 렌더트리를 한번더 트레버싱한다. 

이 단계에서 뷰포트 사이즈를 고려하고 각 박스가 어떤 차원에 있는지를 계산한다. 뷰포트를 베이스로 바디부터 레이아웃을 적용한다. 박스모델 프로퍼티가 여기서 적용된다.

처음에 정해진 것을 레이아웃이라고 하고 다시 계산되는 것을 리플로우라고 한다. 이미지가 있고 사이즈를 정해놓지 않은경우 이미지가 도착하지 않은 시점에서 레이아웃이 계산되고 이미지 크기를 고려하여 리플로우가 일어난다. 

[Paint]

마지막 단계는, 각 노드를 스크린에 그리는 것이다. 처음으로 그려지는 것을 ‘first meaningful paint’ 라고 한다. Painting pahse에서 브라우져는 레이아웃 을 기반으로 실제 픽셀을 계산한다. 

페인팅 단계에서 GPU레이어에 연산을 맡겨서 퍼포먼스를 올릴수 있다.
<video><canvas> 태그나 opacity, 3d transform, will-change 같은 속성은 GPU 레이어에 연산을 맡긴다. 

연산 속도는 올리지만 메모리 관리에는 안좋기 때문에 남용 되면 안된다. 