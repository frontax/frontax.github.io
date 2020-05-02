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

    $('.slideshowSmall').each(slideShow);

  } else {
    // ウインドウ幅 576px超
    
    $('.slideshow').each(slideShow);

  }

  // Sticky header --------------------------------------------------------------------

  if (window.matchMedia("(max-width: 576px)").matches) {
    // ウインドウ幅 576px以下
    
  } else {
    // ウインドウ幅 576px超
    
    $('.pageHeader').each(function () {
  
      var $window = $(window), // Window オブジェクト
          $header = $(this),   // ヘッダー
  
          // ヘッダーのクローン
          $headerClone = $header.contents().clone(),
  
          // ヘッダーのクローンのコンテナー
          $headerCloneContainer = $('<div class="pageHeaderClone"></div>'),
  
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

  $('.toggle').click(function() {
    
    $(this).toggleClass('active');
    
    if ($(this).hasClass('active')) {
      $('.NavMenu').addClass('active');　  //クラスを追加
      
    } else {
      $('.NavMenu').removeClass('active'); //クラスを削除
      
    }
    
  });
  
  var overFlg; // マウスカーソルがメニュー上 or メニュー外

  $('.NavMenu, .toggle').hover(function() {

    overFlg = true;

  }, function() {

    overFlg = false;

  });

  // メニュー外をクリックしたらメニューを閉じる
  $('body').click(function() {

    if (overFlg == false) {
      $('.NavMenu, .toggle').removeClass('active');

    }

  });

  // Smooth scroll --------------------------------------------------------------------
  
  // 各リンクへスクロール
  $('.smoothScroll a').click(function() {
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
  $('#pageTop').click(function() {

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
      $('#pageTop').fadeIn();
      
    } else {
      $('#pageTop').fadeOut();
      
    }
    
    // ヘッダーフォーカス --------------------------------------------------------------------
    
    // スクロール位置がどのセクションか検出
    if (scrollPosition < positionAbout) {
      
      // 該当セクションのヘッダーのみフォーカス
      $('.headerAbout, .headerServices, .headerWorks, .headerContact').removeClass('bgcWhite');
      $('.headerHome').addClass('bgcWhite');
      
    } else if (scrollPosition > positionAbout && scrollPosition < positionServices) {
      
      // 該当セクションのヘッダーのみフォーカス
      $('.headerHome, .headerServices, .headerWorks, .headerContact').removeClass('bgcWhite');
      $('.headerAbout').addClass('bgcWhite');
      
    } else if (scrollPosition > positionServices && scrollPosition < positionWorks) {
      
      // 該当セクションのヘッダーのみフォーカス
      $('.headerHome, .headerAbout, .headerWorks, .headerContact').removeClass('bgcWhite');
      $('.headerServices').addClass('bgcWhite');
      
    } else if (scrollPosition > positionWorks && scrollPosition < positionContact) {
      
      // 該当セクションのヘッダーのみフォーカス
      $('.headerHome, .headerAbout, .headerServices, .headerContact').removeClass('bgcWhite');
      $('.headerWorks').addClass('bgcWhite');
      
    } else if (scrollPosition > positionContact) {
      
      // 該当セクションのヘッダーのみフォーカス
      $('.headerHome, .headerAbout, .headerServices, .headerWorks').removeClass('bgcWhite');
      $('.headerContact').addClass('bgcWhite');
      
    }
    
    // スクロール フェードイン  --------------------------------------------------------------------
    var cnt1 = $('#about .fadein').length;       // About内のフェードイン要素のカウント
    var cnt2 = $('#services .fadein').length;    // Services内のフェードイン要素のカウント
    var cnt3 = $('#works .fadein').length;       // Works内のフェードイン要素のカウント

    $('.fadein').each(function(i) {
      
      var targetElement = $(this).offset().top;  // ターゲット要素の高さ
      
      if (scrollPosition > targetElement - windowHeight + 200) {
        $(this).css('opacity','1');
        $(this).css('transform','translateY(0)');
        $(this).css('-webkit-transform','translateY(0)');

        if (window.matchMedia("(max-width: 576px)").matches) {
          // ウインドウ幅 576px以下
          
        } else {
          // ウインドウ幅 576px超
          
          // 各セクションにおけるDelay Timeのリセット
          if (scrollPosition > positionServices - windowHeight * 4 / 5 && scrollPosition < positionWorks - windowHeight * 4 / 5) {
            i = i - cnt1;
            
          } else if (scrollPosition > positionWorks - windowHeight * 4 / 5 && scrollPosition < positionContact - windowHeight * 4 / 5) {
            i = i - cnt1 - cnt2;

          } else if (scrollPosition > positionContact - windowHeight * 4 / 5) {
            i = i - cnt1 - cnt2 - cnt3;
 
          }

          // Delay Timeの設定
          var delayTime = i * 0.4;
          $(this).css('transition-delay', delayTime + 's');
          $(this).css('-webkit-transition-delay', delayTime + 's');
      
        }
        
      } else {
        $(this).css('opacity','0');
        $(this).css('transform','translateY(30px)');
        $(this).css('-webkit-transform','translateY(30px)');

      }
      
    });
    
    // スクロール スライドイン  --------------------------------------------------------------------
    
    $('.slideinLeft, .slideinRight').each(function() {
      
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

  $('#autoTyping').t({
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
    'maxWidth': 360,               // 設定した場合、画像の幅をピクセル単位で設定
    'wrapAround': true             // trueの場合、最後の画像から最初の画像に戻れる
  });
  
});
