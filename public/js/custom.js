$(document).ready(function(){
    // navbar mobile 
    $('.hamburger').click(function(){
        $('nav').toggleClass('active')
    });

    
    $('#tgMenuItem').click(function(){
        $('nav').toggleClass('active')
    });

    $('#tokenomics').click(function(){
        $('nav').toggleClass('active')
    });

    $('#roadmap_nav').click(function(){
        $('nav').toggleClass('active')
    });


    $('#tutorials').click(function(){
        $('nav').toggleClass('active')
    });

    $('#contacts').click(function(){
        $('nav').toggleClass('active')
    });

    // header form
    $('#name').on('keyup', function(){
        input_check();
    });
    $('#email').on('keyup', function(){
        input_check();
    });
    $('#telegram').on('keyup', function(){
        input_check();
    });

    $(".header-button").on('mouseout', function(){
        $(this).find('.header-telegram').toggleClass('active');
    });

    $(".content4").on('mouseover', function(){
        $(".reverse-car-dog").addClass('active');
    });
    $(".last").on('mouseover', function(){
        $(".last-animal").addClass('active');
        $(".timer").addClass('active');
    });
    $(".done").click(function(){
        $(".alert-success-custom").show();
    });
    // body scroll event animation
    $(document).on('scroll', function(){
        var top = $(document).scrollTop();
        if(top > 10){
            $(".header-dog").addClass("active");
        }
        if(top>500){
            $(".content1-dog-img").addClass("active");
            $(".lp-active").addClass("active");
            $(".burn-active").addClass("active");
        }
        if(top>1000){
            $(".content2-img").addClass("active");
        }
        
    });

    $(".nav-dog").addClass('active');
    $(".header-img").addClass('active');

    var i = 0;
    // $(document).on('mouseover', '#preview-video-div', function(){
    //     i++;
    //     if(i==1){
    //         $("#preview-video-image").hide();
    //         $(".preview-video").show();
    //         $(".preview-video").get(0).play();
    //     }
    // });
    var tutorial_video = document.getElementById("tutorial_video");
    $(document).on('click', '#how_to_buy', function(){
        tutorial_video.play();
    });
    $(document).on('mouseover', '.Rectangle-Copy-14', function(){
        // tutorial_video.play();
    });
    $(document).on('mouseleave', '.Rectangle-Copy-14', function(){
        // tutorial_video.pause();
    });
    
    $(document).on('click', '.arrowslip', function(){
        $('html, body').animate({
            scrollTop: 0
         }, 1000);
    });

    $(document).scroll(function(){
        var scroll = $(document).scrollTop();
        if(scroll>2000){
            $('.arrowslip').show();
        }else{
            $('.arrowslip').hide();
        }
    });
    
    $('[data-toggle="popover"]').popover();
});
