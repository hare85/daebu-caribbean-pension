'use client'

import React, { useState, useEffect } from 'react'

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [exteriorSlide, setExteriorSlide] = useState(0)
  const [firstFloorSlide, setFirstFloorSlide] = useState(0)
  const [secondFloorSlide, setSecondFloorSlide] = useState(0)
  
  const heroImages = [
    '/images/outsides/1.jpeg',
    '/images/outsides/2.jpeg',
    '/images/outsides/3.jpeg',
    '/images/outsides/4.jpeg',
    '/images/outsides/5.jpeg'
  ]

  const exteriorImages = [
    '/images/outsides/1.jpeg',
    '/images/outsides/2.jpeg', 
    '/images/outsides/3.jpeg',
    '/images/outsides/4.jpeg',
    '/images/outsides/5.jpeg',
    '/images/outsides/6.jpeg',
    '/images/outsides/7.jpeg',
    '/images/outsides/8.jpeg',
    '/images/outsides/9.jpeg'
  ]

  const firstFloorImages = [
    '/images/first/1.jpeg',
    '/images/first/2.jpeg',
    '/images/first/3.jpeg',
    '/images/first/4.jpeg',
    '/images/first/5.jpeg',
    '/images/first/6.jpeg',
    '/images/first/7.jpeg',
    '/images/first/8.jpeg',
    '/images/first/9.jpeg',
    '/images/first/10.jpeg'
  ]

  const secondFloorImages = [
    '/images/second/1.jpeg',
    '/images/second/2.jpeg',
    '/images/second/3.jpeg',
    '/images/second/4.jpeg',
    '/images/second/5.jpeg',
    '/images/second/6.jpeg',
    '/images/second/7.jpeg',
    '/images/second/8.jpeg'
  ]

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMenuOpen(false) // Close mobile menu after navigation
    }
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const openImageInNewWindow = (imageSrc: string) => {
    window.open(imageSrc, '_blank', 'width=1200,height=800,scrollbars=yes,resizable=yes')
  }

  const nextSlide = (currentIndex: number, totalImages: number, setSlide: (index: number) => void) => {
    setSlide((currentIndex + 1) % totalImages)
  }

  const prevSlide = (currentIndex: number, totalImages: number, setSlide: (index: number) => void) => {
    setSlide(currentIndex === 0 ? totalImages - 1 : currentIndex - 1)
  }

  // Hero 슬라이드쇼 자동 재생
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length)
    }, 5000) // 5초마다 변경

    return () => clearInterval(slideInterval)
  }, [heroImages.length])

  // 네이버 지도 인증 실패 핸들러
  useEffect(() => {
    (window as any).navermap_authFailure = function () {
      console.error('네이버 지도 API 인증 실패 - Client ID를 확인해주세요')
      alert('네이버 지도 API 인증에 실패했습니다. Client ID를 확인해주세요.')
    }
  }, [])

  useEffect(() => {
    // 네이버 지도 초기화
    const initMap = () => {
      try {
        if (window.naver && window.naver.maps) {
          console.log('네이버 지도 API 로드 성공')
          
          const mapOptions = {
            center: new window.naver.maps.LatLng(37.231947, 126.625264), // 대부도 선감동 좌표 (37°14'37"N, 126°35'07"E)
            zoom: 16,
            disableKineticPan: true,
            disableDoubleClickZoom: true,
            disableDoubleTapZoom: true,
            scrollWheel: false,
            keyboardShortcuts: false,
            draggable: false,
            pinchZoom: false,
            mapTypeControl: false,
            logoControl: false,
            scaleControl: false,
            zoomControl: false,
            tileDuration: 200
          }

          const map = new window.naver.maps.Map('naverMap', mapOptions)
          console.log('지도 생성 성공')

          // 마커 추가
          const marker = new window.naver.maps.Marker({
            position: new window.naver.maps.LatLng(37.231947, 126.625264),
            map: map,
            title: '대부도 캐리비안펜션'
          })

          // 정보창 추가
          const infoWindow = new window.naver.maps.InfoWindow({
            content: '<div style="padding:10px;font-size:12px;"><strong>대부도 캐리비안펜션</strong><br>경기 안산시 단원구 참살이3길 9</div>'
          })

          // 정보창을 항상 열려있게 설정
          infoWindow.open(map, marker)

          // 지도 클릭 시 네이버 지도로 이동
          window.naver.maps.Event.addListener(map, 'click', () => {
            window.open(`https://map.naver.com/p/search/%EB%8C%80%EB%B6%80%EB%8F%84%20%EC%BA%90%EB%A6%AC%EB%B9%84%EC%95%88%20%ED%8E%9C%EC%85%98`, '_blank')
          })
        } else {
          console.log('네이버 지도 API 아직 로드되지 않음')
        }
      } catch (error) {
        console.error('네이버 지도 초기화 오류:', error)
      }
    }

    // 네이버 지도 API 로드 대기
    const checkNaverMaps = () => {
      if (window.naver && window.naver.maps) {
        initMap()
      } else {
        console.log('네이버 지도 API 로딩 중...')
        setTimeout(checkNaverMaps, 100)
      }
    }

    // 스크립트 로드 완료 대기
    setTimeout(() => {
      checkNaverMaps()
    }, 1000)
  }, [])

  return (
    <>
      {/* Header */}
      <header className="header">
        <div className="container">
          <nav className="nav">
            <div className="logo">대부도 캐리비안펜션</div>
            
            {/* Mobile Menu Button */}
            <button 
              className="mobile-menu-btn"
              onClick={toggleMenu}
              aria-label="메뉴 열기/닫기"
            >
              <span className={`hamburger ${isMenuOpen ? 'active' : ''}`}>
                <span></span>
                <span></span>
                <span></span>
              </span>
            </button>
            
            {/* Navigation Links */}
            <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
              <li><a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home') }}>홈</a></li>
              <li><a href="#exterior" onClick={(e) => { e.preventDefault(); scrollToSection('exterior') }}>외관</a></li>
              <li><a href="#interior" onClick={(e) => { e.preventDefault(); scrollToSection('interior') }}>내부</a></li>
              <li><a href="#facilities" onClick={(e) => { e.preventDefault(); scrollToSection('facilities') }}>시설</a></li>
              <li><a href="#location" onClick={(e) => { e.preventDefault(); scrollToSection('location') }}>위치</a></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-slideshow">
          {heroImages.map((image, index) => (
            <div
              key={index}
              className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
              style={{ backgroundImage: `url(${image})` }}
            />
          ))}
        </div>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>대부도 캐리비안펜션</h1>
          <p>가족과 함께하는 특별한 휴식 공간</p>
          <button className="cta-button" onClick={() => scrollToSection('facilities')}>
            시설 둘러보기
          </button>
        </div>
        
        {/* 슬라이드 인디케이터 */}
        <div className="hero-indicators">
          {heroImages.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </section>

      {/* Exterior Photos */}
      <section id="exterior" className="section">
        <div className="container">
          <h2 className="section-title">펜션 외관</h2>
          <div className="gallery-container">
            {/* Desktop Slider */}
            <div className="desktop-slider">
              <div className="slider-wrapper">
                <button 
                  className="slider-btn prev" 
                  onClick={() => prevSlide(exteriorSlide, exteriorImages.length, setExteriorSlide)}
                  aria-label="이전 사진"
                >
                  ‹
                </button>
                <div className="main-image-container">
                  <img 
                    src={exteriorImages[exteriorSlide]} 
                    alt={`펜션 외관 ${exteriorSlide + 1}`}
                    onClick={() => openImageInNewWindow(exteriorImages[exteriorSlide])}
                    className="main-image"
                  />
                </div>
                <button 
                  className="slider-btn next" 
                  onClick={() => nextSlide(exteriorSlide, exteriorImages.length, setExteriorSlide)}
                  aria-label="다음 사진"
                >
                  ›
                </button>
              </div>
              <div className="slider-indicators">
                {exteriorImages.map((_, index) => (
                  <button
                    key={index}
                    className={`indicator ${index === exteriorSlide ? 'active' : ''}`}
                    onClick={() => setExteriorSlide(index)}
                    aria-label={`사진 ${index + 1}로 이동`}
                  />
                ))}
              </div>
            </div>
            
            {/* Mobile List */}
            <div className="mobile-gallery">
              {exteriorImages.map((image, index) => (
                <div key={index} className="mobile-image-item">
                  <img 
                    src={image} 
                    alt={`펜션 외관 ${index + 1}`}
                    onClick={() => openImageInNewWindow(image)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Interior Photos */}
      <section id="interior" className="section">
        <div className="container">
          <h2 className="section-title">펜션 내부</h2>
          
          <h3 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '1.8rem' }}>1층</h3>
          <div className="gallery-container">
            {/* Desktop Slider */}
            <div className="desktop-slider">
              <div className="slider-wrapper">
                <button 
                  className="slider-btn prev" 
                  onClick={() => prevSlide(firstFloorSlide, firstFloorImages.length, setFirstFloorSlide)}
                  aria-label="이전 사진"
                >
                  ‹
                </button>
                <div className="main-image-container">
                  <img 
                    src={firstFloorImages[firstFloorSlide]} 
                    alt={`1층 사진 ${firstFloorSlide + 1}`}
                    onClick={() => openImageInNewWindow(firstFloorImages[firstFloorSlide])}
                    className="main-image"
                  />
                </div>
                <button 
                  className="slider-btn next" 
                  onClick={() => nextSlide(firstFloorSlide, firstFloorImages.length, setFirstFloorSlide)}
                  aria-label="다음 사진"
                >
                  ›
                </button>
              </div>
              <div className="slider-indicators">
                {firstFloorImages.map((_, index) => (
                  <button
                    key={index}
                    className={`indicator ${index === firstFloorSlide ? 'active' : ''}`}
                    onClick={() => setFirstFloorSlide(index)}
                    aria-label={`사진 ${index + 1}로 이동`}
                  />
                ))}
              </div>
            </div>
            
            {/* Mobile List */}
            <div className="mobile-gallery">
              {firstFloorImages.map((image, index) => (
                <div key={index} className="mobile-image-item">
                  <img 
                    src={image} 
                    alt={`1층 사진 ${index + 1}`}
                    onClick={() => openImageInNewWindow(image)}
                  />
                </div>
              ))}
            </div>
          </div>

          <h3 style={{ textAlign: 'center', margin: '3rem 0 2rem', fontSize: '1.8rem' }}>2층</h3>
          <div className="gallery-container">
            {/* Desktop Slider */}
            <div className="desktop-slider">
              <div className="slider-wrapper">
                <button 
                  className="slider-btn prev" 
                  onClick={() => prevSlide(secondFloorSlide, secondFloorImages.length, setSecondFloorSlide)}
                  aria-label="이전 사진"
                >
                  ‹
                </button>
                <div className="main-image-container">
                  <img 
                    src={secondFloorImages[secondFloorSlide]} 
                    alt={`2층 사진 ${secondFloorSlide + 1}`}
                    onClick={() => openImageInNewWindow(secondFloorImages[secondFloorSlide])}
                    className="main-image"
                  />
                </div>
                <button 
                  className="slider-btn next" 
                  onClick={() => nextSlide(secondFloorSlide, secondFloorImages.length, setSecondFloorSlide)}
                  aria-label="다음 사진"
                >
                  ›
                </button>
              </div>
              <div className="slider-indicators">
                {secondFloorImages.map((_, index) => (
                  <button
                    key={index}
                    className={`indicator ${index === secondFloorSlide ? 'active' : ''}`}
                    onClick={() => setSecondFloorSlide(index)}
                    aria-label={`사진 ${index + 1}로 이동`}
                  />
                ))}
              </div>
            </div>
            
            {/* Mobile List */}
            <div className="mobile-gallery">
              {secondFloorImages.map((image, index) => (
                <div key={index} className="mobile-image-item">
                  <img 
                    src={image} 
                    alt={`2층 사진 ${index + 1}`}
                    onClick={() => openImageInNewWindow(image)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Facilities */}
      <section id="facilities" className="section">
        <div className="container">
          <h2 className="section-title">펜션 시설</h2>
          <div className="facilities-grid">
            <div className="facility-card">
              <img src="/images/first/9.jpeg" alt="노래방" />
              <h3>노래방</h3>
              <p>최신 노래방 시설로 가족, 친구들과 함께 즐거운 시간을 보내세요. 최신 곡부터 추억의 명곡까지 다양한 노래를 즐길 수 있습니다.</p>
              <div className="pc-specs">
                <h4>노래방 이용</h4>
                <ul>
                  <li>별도 요금 X</li>
                  <li>업데이트는 주기적으로 진행됩니다</li>
                </ul>
              </div>
            </div>
            
            <div className="facility-card">
              <img src="/images/second/1.jpeg" alt="PC룸" />
              <h3>PC룸</h3>
              <p>고성능 게이밍 PC로 게임을 즐기거나 업무를 처리할 수 있습니다.</p>
              <div className="pc-specs">
                <h4>PC 사양</h4>
                <ul>
                  <li>CPU: Intel i5-10400</li>
                  <li>GPU: RTX 3060 Ti</li>
                  <li>RAM: 16GB DDR4</li>
                  <li>SSD: 512GB NVMe</li>
                  <li>모니터: 27인치 FHD 144Hz 커브드</li>
                  <li>앱코 해커 K640 키보드 & 로지텍 G102 마우스</li>
                </ul>
              </div>
            </div>
            
            <div className="facility-card">
              <img src="/images/outsides/5.jpeg" alt="수영장" />
              <h3>수영장</h3>
              <p>수영장은 여름만 운영합니다. 이용 시 참고하시기 바랍니다.</p>
              <div className="pc-specs">
                <h4>수영장 이용 요금</h4>
                <ul>
                  <li>준성수기, 성수기: 별도 요금 X</li>
                  <li>그 외 기간: 추가 요금 8만원</li>
                </ul>
              </div>
            </div>
            
            <div className="facility-card">
              <img src="/images/outsides/6.jpeg" alt="바베큐장" />
              <h3>바베큐장</h3>
              <p>야외 바베큐 시설로 가족, 친구들과 함께 맛있는 바베큐를 즐길 수 있습니다.</p>
              <div className="pc-specs">
                <h4>바베큐장 이용안내</h4>
                <ul>
                  <li>바베큐장 이용료는 별도로 없습니다</li>
                  <li>숯, 철망은 펜션 타운 단지 내 편의점에서 구매 가능 합니다</li>
                  <li>바베큐장은 직접 이용하시는 시설입니다</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location */}
      <section id="location" className="section location-section">
        <div className="container">
          <h2 className="section-title">오시는길</h2>
          
          {/* 지도 컨테이너 */}
          <div className="new-map-container">
            <div id="naverMap" style={{ width: '100%', height: '100%' }}></div>
          </div>
          
          {/* 지도 하단 정보 */}
          <div className="map-bottom-info">
            <div className="location-details">
              <h3 className="pension-name">대부도 캐리비안펜션</h3>
              <p className="address">경기도 안산시 단원구 참살이3길 9</p>
            </div>
            
            <div className="map-buttons">
              <button 
                className="map-btn directions-btn"
                onClick={() => window.open(`https://map.naver.com/p/directions/-/14095856.002729708,4471492.302640531,%EC%BA%90%EB%A6%AC%EB%B9%84%EC%95%88%ED%8E%9C%EC%85%98,,/-/transit?c=15.00,0,0,0,dh`, '_blank')}
              >
                <span className="nicon nicon_pathfind2"></span>
                길찾기
              </button>
            </div>
          </div>
          
          {/* 펜션 상세 정보 */}
          <div className="pension-info-grid">
            {/* 입실/퇴실 */}
            <div className="info-card">
              <div className="info-header">
                <span className="info-icon">🏠</span>
                <h3>입실/퇴실</h3>
              </div>
              <div className="info-content">
                <div className="time-info">
                  <span className="time-label">입실(체크인)</span>
                  <span className="time-value">15:00</span>
                </div>
                <div className="time-info">
                  <span className="time-label">퇴실(체크아웃)</span>
                  <span className="time-value">11:00</span>
                </div>
              </div>
            </div>

            {/* 성수기 기간 정보 */}
            <div className="info-card">
              <div className="info-header">
                <span className="info-icon">📅</span>
                <h3>성수기 기간정보</h3>
              </div>
              <div className="info-content">
                <p>준성수기간: 7-8월 중</p>
                <p>성수기간: 7월 마지막주 8월 1째주</p>
              </div>
            </div>

            {/* 추가 요금정보 */}
            <div className="info-card">
              <div className="info-header">
                <span className="info-icon">💰</span>
                <h3>추가 요금정보</h3>
              </div>
              <div className="info-content">
                <p>추가인원 요금 안내: 성인 초등학생까지의 학생 20,000원 / 7세 미만은 무료입니다.</p>
                <p>비수기 수영장 이용 요금내: 80,000원</p>
              </div>
            </div>

            {/* 이용안내 */}
            <div className="info-card amenities-card">
              <div className="info-header">
                <span className="info-icon">🏖️</span>
                <h3>이용안내</h3>
              </div>
              <div className="amenities-grid">
                <div className="amenity-item">
                  <span className="amenity-icon">🏊</span>
                  <span>수영장</span>
                </div>
                <div className="amenity-item">
                  <span className="amenity-icon">🍖</span>
                  <span>바베큐장</span>
                </div>
                <div className="amenity-item">
                  <span className="amenity-icon">🎤</span>
                  <span>노래방</span>
                </div>
                <div className="amenity-item">
                  <span className="amenity-icon">🏐</span>
                  <span>족구장</span>
                </div>
                <div className="amenity-item">
                  <span className="amenity-icon">📶</span>
                  <span>와이파이</span>
                </div>
                <div className="amenity-item">
                  <span className="amenity-icon">🏠</span>
                  <span>독채</span>
                </div>
                <div className="amenity-item">
                  <span className="amenity-icon">👥</span>
                  <span>단체</span>
                </div>
                <div className="amenity-item">
                  <span className="amenity-icon">🏠</span>
                  <span>복층</span>
                </div>
                <div className="amenity-item">
                  <span className="amenity-icon">🍳</span>
                  <span>개별바베큐</span>
                </div>
                <div className="amenity-item">
                  <span className="amenity-icon">♨️</span>
                  <span>온돌방</span>
                </div>
                <div className="amenity-item">
                  <span className="amenity-icon">🛏️</span>
                  <span>침대방</span>
                </div>
              </div>
            </div>

            {/* 사업자 정보 */}
            <div className="info-card">
              <div className="info-header">
                <span className="info-icon">👤</span>
                <h3>사업자정보</h3>
              </div>
              <div className="info-content">
                <p>상호명: 캐리비안펜션</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>&copy; 2024 대부도 캐리비안펜션. All rights reserved.</p>
          <p>가족과 함께하는 특별한 휴식 공간</p>
        </div>
      </footer>
    </>
  )
}