$(function() {

  var windowHeight = $(window).height();    // 画面の高さ

  // Slideshow --------------------------------------------------------------------

  function slideShow() {
  
    var $slides = $(this).find('img'),      // すべてのスライド
        slideCount = $slides.length,        // スライドの枚数
        currentIndex = 0;                   // 現在のスライドのインデックス番号

    // 1 番目のスライドをフェードインで表示
    $slides.eq(currentIndex).fadeIn();

    // 5500 ミリ秒ごとに showNextSlide 関数を実行
    setInterval(showNextSlide, 5500);

    // 次のスライドを表示する関数
    function showNextSlide() {

      // 次に表示するスライドのインデックス
      // (もし最後のスライドなら最初に戻る)
      var nextIndex = (currentIndex + 1) % slideCount;

      // 現在のスライドをフェードアウト
      $slides.eq(currentIndex).fadeOut();

      // 次のスライドをフェードイン
      $slides.eq(nextIndex).fadeIn();

      // 現在のスライドのインデックスを更新
      currentIndex = nextIndex;
  
    }

  }

  if (window.matchMedia("(max-width: 576px)").matches) {
    // ウインドウ幅 576px以下

    $('.slideshow-small').each(slideShow);

  } else {
    // ウインドウ幅 576px超
    
    $('.slideshow').each(slideShow);

  }

  // Sticky header --------------------------------------------------------------------

  if (window.matchMedia("(max-width: 576px)").matches) {
    // ウインドウ幅 576px以下
    
  } else {
    // ウインドウ幅 576px超
    
    $('.page-header').each(function () {
  
      var $window = $(window), // Window オブジェクト
          $header = $(this),   // ヘッダー
  
          // ヘッダーのクローン
          $headerClone = $header.contents().clone(),
  
          // ヘッダーのクローンのコンテナー
          $headerCloneContainer = $('<div class="page-header-clone"></div>'),
  
          // HTML の上辺からヘッダーの底辺までの距離 = ヘッダーのトップ位置 + ヘッダーの高さ
          threshold = $header.offset().top + $header.outerHeight();
  
      // コンテナーにヘッダーのクローンを挿入
      $headerCloneContainer.append($headerClone);
  
      // コンテナーを body の最後に挿入
      $headerCloneContainer.appendTo('body');
  
      // スクロール時に処理を実行する
      $window.scroll(function () {
        if ($window.scrollTop() > threshold) {
          $headerCloneContainer.addClass('visible');
        } else {
          $headerCloneContainer.removeClass('visible');
        }
      });
  
      // スクロールイベントを発生させ、初期位置を決定
      $window.trigger('scroll');
    });

  }

  // ハンバーガーメニュー --------------------------------------------------------------------

  $('.Toggle').click(function() {
    
    $(this).toggleClass('active');
    
    if ($(this).hasClass('active')) {
      $('.NavMenu').addClass('active');　  //クラスを追加
      
    } else {
      $('.NavMenu').removeClass('active'); //クラスを削除
      
    }
    
  });
  
  var overFlg; // マウスカーソルがメニュー上 or メニュー外

  $('.NavMenu, .Toggle').hover(function() {
    overFlg = true;
  }, function() {
    overFlg = false;
  });

  // メニュー外をクリックしたらメニューを閉じる
  $('body').click(function() {
    if (overFlg == false) {
      $('.NavMenu, .Toggle').removeClass('active');
    }
  });

  // Smooth scroll --------------------------------------------------------------------
  
  // 各リンクへスクロール
  $('.smooth-scroll a').click(function() {
    // クリックしたボタンの飛び先を取得
    var id = $(this).attr('href');

    // 飛び先の最上部からの距離を取得
    var position = $(id).offset().top;

    $('body,html').animate({
      scrollTop: position
    }, 500);
    return false;
  });

  // スクロールボタン スクロールでトップへ戻る
  $('#page-top').click(function() {
    $('body,html').animate({
      scrollTop: 0
    }, 500);
    return false;
  });
  
  // Scroll effect --------------------------------------------------------------------
  
  $(window).scroll(function() {
    
    var scrollPosition = $(this).scrollTop(),                                   // 現在のスクロール位置
        positionAbout = $('#about').offset().top - windowHeight * 1 / 5,        // Aboutのトリガーポイント
        positionServices = $('#services').offset().top - windowHeight * 1 / 5,  // Servicesのトリガーポイント
        positionWorks = $('#works').offset().top - windowHeight * 1 / 5,        // Worksのトリガーポイント
        positionContact = $('#contact').offset().top - windowHeight * 1 / 5;    // Contactのトリガーポイント
    
    // スクロールボタン --------------------------------------------------------------------
    
    // scrollが500に達したら表示
    if (scrollPosition > 500) {
      $('#page-top').fadeIn();
      
    } else {
      $('#page-top').fadeOut();
      
    }
    
    // ヘッダーフォーカス --------------------------------------------------------------------
    
    // スクロール位置がどのセクションか検出
    if (scrollPosition < positionAbout) {
      
      // 該当セクションのヘッダーのみフォーカス
      $('.header-about, .header-services, .header-works, .header-contact').removeClass('bgc-white');
      $('.header-home').addClass('bgc-white');
      
    } else if (scrollPosition > positionAbout && scrollPosition < positionServices) {
      
      // 該当セクションのヘッダーのみフォーカス
      $('.header-home, .header-services, .header-works, .header-contact').removeClass('bgc-white');
      $('.header-about').addClass('bgc-white');
      
    } else if (scrollPosition > positionServices && scrollPosition < positionWorks) {
      
      // 該当セクションのヘッダーのみフォーカス
      $('.header-home, .header-about, .header-works, .header-contact').removeClass('bgc-white');
      $('.header-services').addClass('bgc-white');
      
    } else if (scrollPosition > positionWorks && scrollPosition < positionContact) {
      
      // 該当セクションのヘッダーのみフォーカス
      $('.header-home, .header-about, .header-services, .header-contact').removeClass('bgc-white');
      $('.header-works').addClass('bgc-white');
      
    } else if (scrollPosition > positionContact) {
      
      // 該当セクションのヘッダーのみフォーカス
      $('.header-home, .header-about, .header-services, .header-works').removeClass('bgc-white');
      $('.header-contact').addClass('bgc-white');
      
    }
    
    // スクロール フェードイン  --------------------------------------------------------------------
    
    $('.fadein').each(function() {
      
      var targetElement = $(this).offset().top;  // ターゲット要素の高さ
      
      if (scrollPosition > targetElement - windowHeight + 200) {
        $(this).css('opacity','1');
        $(this).css('transform','translateY(0)');
        
      } else {
        $(this).css('opacity','0');
        $(this).css('transform','translateY(30px)');
      }
      
    });
    
    // スクロール スライドイン  --------------------------------------------------------------------
    
    $('.slidein-left, .slidein-right, .slidein-up').each(function() {
      
      var targetElement = $(this).offset().top;  // ターゲット要素の高さ
      
      if (scrollPosition > targetElement - windowHeight + 100) {
        $(this).addClass('show');
        
      } else {
        $(this).removeClass('show');
      }
      
    });
    
  });
  
  // プラグイン　--------------------------------------------------------------------

  // Text typing animation --------------------------------------------------------------------

  $('#auto-typing').t({
    speed: 300,        // タイプ速度
    speed_vary: true,  // 文字毎にウエイト
    mistype: 10,       // タイピングミス頻度
    blink: false,      // 実行中のカーソル点滅
    delay: 1,          // タイプ開始までのウエイト時間
    repeat: true       // リピート
  });
  
  // lightbox2 パラメータ --------------------------------------------------------------------

  lightbox.option({
    'fitImagesInViewport': false,  // trueの場合、画面内に収まるように画像サイズを変更
    'showImageNumberLabel': false, // falseの場合、キャプション下のテキスト非表示
    'maxWidth': 400,               // 設定した場合、画像の幅をピクセル単位で設定
    'wrapAround': true             // trueの場合、最後の画像から最初の画像に戻れる
  });
  
});
