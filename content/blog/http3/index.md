---
title: HTTP3, 사실 진짜로 바뀐건 TCP 였다.
date: "2021-08-15T12:40:32.169Z"
description: 왜 HTTP3가 등장했을까? 왜 빠를까?
ogimage: "thumbnail.jpeg"
tags: ["http"]
---

HTTP 3가 나오면서 이에 관한 이야기를 종종 듣는다. 이런저런 설명을 대충 들으면서 아 빨라지는구나, 더 보안성이 높아지는구나 이 정도의 느낌만 가지고 있었다.

그러던 중 [HTTP/3 From A To Z: Core Concepts (Part 1)](https://www.smashingmagazine.com/2021/08/http3-core-concepts-part1/) 을 읽고 새로 깨닫게 된 점들을 요약 및 정리해 본다.

하이레벨에서 HTTP 3과 QUIC에 대한 이해를 하기에 정말 좋은 글이라고 생각한다. 이 글을 읽고 흥미가 동하신 분 이라면 위의 글을 꼭 읽어보시길 추천해 드린다.

## HTTP 3가 중요한 게 아니다. TCP가 바뀌는 게 중요한 것이다.

HTTP 1.1 에서 HTTP 2로, 다시 HTTP 2에서 HTTP 3으로 발전해 간다. OSI7 계층이 머릿속에 들어 있는 우리들은 당연히 애플리케이션 레이어 단에서의 변화라고 이를 생각하기 쉽다.

그렇게 깊게 HTTP 3을 뜯어볼 시간이 없는 대부분의 우리들은 HTTP 3이니까 더 빠르고 보안이 강화되었겠거니 하고 넘어간다. 어느 정도는 사실이다. 하지만 HTTP 3을 도입했을 때 나오는 변화들은 HTTP 3 때문이 아니다. HTTP 3의 밑의 계층이 TCP가 아닌 QUIC를 사용하기 때문에 발생하는 변화다. HTTP 3은 QUIC위에서 HTTP 통신을 하려는 장치일 뿐이다.

![https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_2000/https://cloud.netlifyusercontent.com/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/37fc4bc9-65cb-4290-a1ed-6ad39762f18a/protocol-stack-preview.png](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_2000/https://cloud.netlifyusercontent.com/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/37fc4bc9-65cb-4290-a1ed-6ad39762f18a/protocol-stack-preview.png)

위의 그림처럼 네트워크 계층에서 사용하는 기술 스택이 변화한 것이다. 그럼 TCP가 뭐가 문제길래 잘 쓰고 있는 TCP를 이렇게 바꾸려고 하는 걸까?

## TCP는 인류가 이런 식으로 발전할 거라고 상상 할 수 없는 시기에 만들어졌다.

TLS를 사용하는 등의 보안 통신이 일반적으로 사용될 것이라고 상상하지 못했다. 당시에는 암호화된 통신 자체의 리소스가 비쌌고 몇몇 특이한 경우에 보안 통신을 하는 것을 생각했다. 그래서 암호화 레이어를 별도로 사용하고 있다.

TCP가 만들어지던 시절에 우리는 이렇게 클라이언트와 서버가 동시다발적으로 여러 개 파일의 데이터 패킷을 교환할 것이라고 상상하지 못했다. 하나의 TCP 통신에서 여러 파일을 교환하던 중 패킷손실이 발생하면, 다른 파일들의 전송 역시 같이 중단되는 현상이 존재했다.

모바일 기기를 통해 네트워크 환경을 바꾸어가면서 서버와 클라이언트가 소통할 수 있을 것이라고 생각하지 못했다. 그 때문에 와이파이를 바꾸는 등의 사건이 발생하면 다시 새로운 커넥션을 맺어야 한다.

## QUIC은 TCP의 단점을 효율적으로 극복해 낸다.

### QUIC은 보안 통신이 디폴트다.

보안 레이어인 TLS 없이는 QUIC을 사용할 수 없다.

![https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_2000/https://cloud.netlifyusercontent.com/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/f2240cb4-eb62-4054-ad19-0e72190e0a4f/connection-setup.png](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_2000/https://cloud.netlifyusercontent.com/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/f2240cb4-eb62-4054-ad19-0e72190e0a4f/connection-setup.png)

인터넷이 처음 만들어지는 시기에는 선택 사항이었던 보안 연결이, 이제는 거의 필수 사항처럼 이용되고 있다.

QUIC은 프로토콜 단에서 암호화된 통신을 강제한다. 이를 통해서 라운드 트립을 한번 절약하는 효과를 볼 수 있는데, 위 그림에서 볼 수 있듯이 TLS 핸드 셰이크와 QUIC 핸드 셰이크가 동시에 발생하기 때문이다.

기존의 TLS-TCP 관계에서는 TLS를 위한 핸드 셰이크와 TCP를 위한 핸드 셰이크가 별도로 사용되어 QUIC에 비해 라운드트립히 한 번 더 발생한다.

![https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_2000/https://cloud.netlifyusercontent.com/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/fbf86b42-8f20-4b27-aea5-f1fc164b2683/tcp-vs-quic-packetization.png](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_2000/https://cloud.netlifyusercontent.com/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/fbf86b42-8f20-4b27-aea5-f1fc164b2683/tcp-vs-quic-packetization.png)

또한 위의 그림처럼 기존에 암호화되지 않던 영역까지 암호화에 포함해 보안성을 더 강화하였다.

## QUIC은 여러 파일의 데이터를 동시에 통신할 수 있다.

![https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_2000/https://cloud.netlifyusercontent.com/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/7981cb82-395c-4484-8873-46fd92804b4d/hol-blocking-basic.png](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_2000/https://cloud.netlifyusercontent.com/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/7981cb82-395c-4484-8873-46fd92804b4d/hol-blocking-basic.png)

HTTP 1 에서는 TCP 커넥션 한 번에 하나의 파일밖에 전송할 수 없었다. HTTP 2에 서는 이를 개선하여 하나의 TCP 커넥션 에서도 여러 파일을 전송할 수 있도록 만들었다. 하지만, TCP는 하나의 커넥션을 하나의 파일로 취급하기에 패킷 로스가 발생하면, 해당 파일 뿐만 아니라 TCP 커넥션을 공유하는 다른 파일들의 패킷도 중단이 되는 문제가 발생할 수 있다.

QUIC은 개별 파일을 구분하여 중간에 패킷 로스가 발생해도 해당 파일의 스트림만 정지가 되도록 할 수 있다.

### QUIC은 네트워크가 바뀌어도 커넥션을 유지할 수 있다.

클라이언트와 서버가 서로를 구분하기 위해서는 클라이언트 IP, 클라이언트 포트, 서버 IP, 서버 포트, 이렇게 네 가지가 필요하다.

핸드폰을 들고 와이파이존에서 LTE 데이터를 사용하게 됐을 때 일시적 지연이 일어나는 이유는 클라이언트 IP가 이때 바뀌기 때문이다. 다른 건 전부 동일하더라도 이거 하나가 바뀌면 TCP 통신에서는 핸드 셰이크를 처음부터 다시 해야 한다.

![https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_2000/https://cloud.netlifyusercontent.com/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/9413b221-47e9-427b-b958-b0e62fe7f681/1-migration-tcp.png](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_2000/https://cloud.netlifyusercontent.com/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/9413b221-47e9-427b-b958-b0e62fe7f681/1-migration-tcp.png)

QUIC에서는 커넥션 ID라는 개념이 있다. 서버와 클라이언트는 커넥션 ID를 기억해서 핸드셰이크를 처음부터 진행하지 않을 수 있도록 한다.

![https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_2000/https://cloud.netlifyusercontent.com/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/e6ae0ec1-3b85-49a9-9707-ee21ce5b02b3/2-migration-single-cid.png](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_2000/https://cloud.netlifyusercontent.com/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/e6ae0ec1-3b85-49a9-9707-ee21ce5b02b3/2-migration-single-cid.png)

## QUIC은 쉽게 도입되지 않을 수 있다.

QUIC이 이렇게 좋은 많은 것들을 제공해 주고 있지만, 기업들이 이를 도입하지 않을 현실적인 이유가 있다. 기존에 암호화하지 않고 있던 헤더 필드 영역까지 암호화하게 됨에 따라, 혹은 등의 정보에 쉽게 접근할 수 없게 되었다. 이런 헤더의 정보를 사용하는 ISP나 네트워크 중계회사들은 QUIC을 도입하는데 주저함이 클 것이다.

또한 QUIC은 패킷별로 암호화를 한다. 이는 기존의 TLS-TCP에서 패킷을 묶어서 암호화하는 것보다 더 큰 리소스 소모를 불러올 수 있다는 단점이 있다.

---

QUIC이 구체적으로 어떤 기술로 어떻게 이런 것들을 가능케 하는지는 이글의 목적 밖이다. 다음에 기회가 되면 구체적인 기술적 구현에 관해서도 이야기해 보도록 하겠다.
