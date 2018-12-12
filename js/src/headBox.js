
(function($){


  //브라우저의 크기 값 가져와서 변수 처리
   var winW = $(window).outerWidth(true);


    //버튼 변수 선언
    var gnbBtn = $('#gnbBtn');
    var gnbDrop = $('.gnb_drop');


    //slideToggle 요소의 height 값을 조작해서 움직임을 만듬


    gnbBtn.on('click',function(e){
    gnbDrop.stop().slideToggle();
    //gnbDrop.stop().fadeToggle();
    $(this).toggleClass('active');
    }); 



  //===자동으로 새로고침 처리하기
  $(window).on('resize',function(e){
    var nowW = $(window).outerWidth();
    if(winW !== nowW){
      location.reload();
    }
  });



})(jQuery);