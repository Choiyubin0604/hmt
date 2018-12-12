
(function($) { 

  var indicator = $('.indicator');
  var indiLi    = indicator.children('li');

  var slideBtn  = $('.slide_btn');
  var prevBtn   = slideBtn.children('.prev_btn')[0];
  var nextBtn   = slideBtn.children('.next_btn')[0];

  var bannerWrap = $('.banner_wrap');
  var bannerLength = bannerWrap.children('div').length - 1;

  var timed     = 500; 
  var easing    = 'linear';
  var num       = 0;

  var start, end;

  var CommonFn = function (n){ 
    var move = n * -100 + '%';                          
    bannerWrap.animate({marginLeft:move}, timed, easing); 
    indiLi.eq(n).addClass('select');                    
    indiLi.eq(n).siblings('li').removeClass('select');  
    console.log(n);
  };


var mediaPlay = function(k){ 
  var mediaUrl = '../media/',
      media = ['nar_01', 'nar_02'],
      mediaType = ['ogg', 'wav', 'mp3'],
      n = k || 0, 
      i=0, 
      mdlen = mediaType.length,
      audio = $('.audio_file');
 
  if(n == 'none'){
    audio.find('source').removeAttr('src');
  }else{
    for(; i<mdlen; i++){
      audio.find('source').eq(i).attr('src',mediaUrl+media[n]+'.'+ mediaType[i]);
    }
  }
  audio[0].load();
  audio[0].play();
};

  indiLi.on('click',function(e) {
    e.preventDefault();
    var it = $(this);
    num = it.index(); 
    CommonFn(num);
  });



var TouchStart = function(e){
  start = e.originalEvent.changedTouches[0].screenX;
  console.log(start);
  return start;
}

var TouchEnd = function(e){
  end = e.originalEvent.changedTouches[0].screenX;
  console.log(end);
  return YbSwipe(start,end);
}

$(document).on({'touchstart': TouchStart ,'touchend': TouchEnd});

// $(document).on('touchstart',function(e){
//   // start = e.originalEvent.changedTouches[0].screenX;
//   // return start;
// });

// $(document).on('touchend',function(e){
//   end = e.originalEvent.changedTouches[0].screenX;
//   YbSwipe(start,end);
// });

function YbSwipe(start,end){
  var result = start - end;
  console.log(start, end);

  if(result < 0 && num > 0){
      num -= 1;
      CommonFn(num);
      mediaPlay(num);
  }else if(result > 0 && num < bannerLength){
    console.log('왼쪽으로 스와이프 했습니다.');
      num += 1;
      CommonFn(num);
      mediaPlay(num);
  }else{
    console.log('클릭했습니다.');
  }
}


  slideBtn.children('button').on('click',function(e) {
    var it = $(this)[0];
    if(it === prevBtn && num > 0){
      num -= 1;
      console.log('이전보기 버튼 클릭했어요');
    }else if(it === nextBtn && num < bannerLength){
      num += 1;
      console.log('다음보기 버튼 클릭했어요');
    }

  CommonFn(num);
  mediaPlay(num);
  });
  

var audio = $('.audio_file');

mediaPlay(0);


$('.script_btn').children('button').off().on('click',function(e){
    e.preventDefault();

    $('.audio_file')[0].pause();
    var scriptP = $('.script_area').children('p');
    scriptP.removeAttr('style');    
    var view = scriptP.css('display') == 'none';
    // (view) ? scriptP.eq(num).css({'display':'block'}) : scriptP.removeAttr('style');
    mediaPlay(num);

   if (view){ 
    scriptP.eq(num).css({'display':'block'}) 
    $('.script_area').css({height:'100%',transition:'all 300ms linear'});
    $('.close_btn').fadeIn();
  }else{
   scriptP.css({'display':'none'});  
  }


    $('.close_btn').off().on('click',function(e){
      e.preventDefault();
      audio[0].pause();
      mediaPlay('none');

      $(this).fadeOut(function(){
        $(this).removeAttr('style');
      });
      $('.script_area').css({height:0, transition:'all 300ms linear'},function(){
        $(this).removeAttr('style');
        scriptP.removeAttr('style');
         $('.close_btn').removeAttr('style');
      });
    });
});

  $('.pause_btn').off().on('click',function(e){
    e.preventDefault();
      audio[0].pause();
      mediaPlay('none');
    
  })



})(jQuery);