# 대부도 캐리비안펜션 홍보 사이트

Next.js로 제작된 펜션 홍보용 웹사이트입니다.

## 주요 기능

- 펜션 외관 사진 갤러리
- 펜션 내부 1층/2층 사진 갤러리  
- 펜션 제공 시설 소개 (노래방, PC룸, 수영장, 바베큐장)
- PC룸 상세 사양 정보
- 펜션 위치 및 오시는 길 지도
- 반응형 디자인 (모바일 최적화)

## 개발 환경 설정

### 1. 네이버 지도 API 키 설정

⚠️ **중요**: 신규 NCP Maps API를 사용합니다.

1. [네이버 클라우드 플랫폼](https://console.ncloud.com/naver-service/application)에서 **신규 Maps API** 신청
2. **ncpKeyId** 발급받기 (기존 clientId와 다름)
3. `.env.local` 파일 생성:

```bash
NEXT_PUBLIC_NAVER_MAP_CLIENT_ID=your_ncp_key_id_here
```

📖 자세한 가이드: [NCP Maps API 변경 안내](https://navermaps.github.io/maps.js.ncp/docs/tutorial-2-Getting-Started.html)

### 2. 프로젝트 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 빌드
npm run build

# 프로덕션 서버 실행
npm start
```

## Vercel 배포

이 프로젝트는 Vercel에 배포할 수 있도록 설계되었습니다.

1. GitHub에 코드 푸시
2. Vercel에 프로젝트 연결
3. 자동 배포 설정

## 이미지 추가 방법

`public/images/` 디렉토리에 다음 이미지들을 추가해주세요:

### 외관 사진
- `exterior-1.jpg` - 펜션 정면
- `exterior-2.jpg` - 펜션 전경  
- `exterior-3.jpg` - 펜션 야경

### 내부 사진 (1층)
- `interior-1f-living.jpg` - 1층 거실
- `interior-1f-kitchen.jpg` - 1층 주방
- `interior-1f-room.jpg` - 1층 침실

### 내부 사진 (2층)
- `interior-2f-room1.jpg` - 2층 침실1
- `interior-2f-room2.jpg` - 2층 침실2
- `interior-2f-bathroom.jpg` - 2층 화장실

### 시설 사진
- `karaoke.jpg` - 노래방
- `pc-room.jpg` - PC룸
- `pool.jpg` - 수영장
- `bbq.jpg` - 바베큐장

### 기타
- `hero-bg.jpg` - 메인 배경 이미지

## 사이트 구조

- **헤더**: 네비게이션 메뉴
- **히어로 섹션**: 메인 배너
- **외관 갤러리**: 펜션 외부 사진들
- **내부 갤러리**: 1층/2층 내부 사진들
- **시설 소개**: 노래방, PC룸, 수영장, 바베큐장
- **위치 안내**: 지도 및 연락처 정보
- **푸터**: 저작권 정보

## 기술 스택

- Next.js 14
- TypeScript
- CSS3
- React