(function ($) {

  "use strict";

  /* Page Loader active
  ========================================================*/
  $('#preloader').fadeOut();


  /* intro image
  ========================================================*/

  // Khởi tạo carousel cho .intro-img
  $(".intro-img").owlCarousel({
    navigation: false,
    pagination: true,
    slideSpeed: 1000,
    margin: 10,
    loop: true, // Lặp lại vô hạn
    stopOnHover: true,
    autoPlay: true,
    items: 1,
    itemsDesktopSmall: [1024, 1],
    itemsTablet: [600, 1],
    itemsMobile: [479, 1],
    itemsDesktop: [1]
  });




  /* Testimonials Carousel 
  ========================================================*/
  var owl = $("#client-testimonial");
  owl.owlCarousel({
    navigation: true,
    pagination: false,
    slideSpeed: 1000,
    stopOnHover: true,
    autoPlay: true,
    items: 1,
    animateIn: 'fadeIn',
    animateOut: 'fadeOut',
    addClassActive: true,
    itemsDesktop: [1199, 1],
    itemsDesktopSmall: [980, 1],
    itemsTablet: [768, 1],
    itemsTablet: [767, 1],
    itemsTabletSmall: [480, 1],
    itemsMobile: [479, 1],
  });
  $('#client-testimonial').find('.owl-prev').html('<i class="lni-chevron-left"></i>');
  $('#client-testimonial').find('.owl-next').html('<i class="lni-chevron-right"></i>');


  /* showcase Slider
  =============================*/
  var owl = $(".showcase-slider");
  owl.owlCarousel({
    navigation: false,
    pagination: true,
    slideSpeed: 1000,
    margin: 10,
    loop: true, // Lặp lại vô hạn
    stopOnHover: true,
    autoPlay: true,
    items: 5,
    itemsDesktopSmall: [1024, 3],
    itemsTablet: [600, 1],
    itemsMobile: [479, 1]
  });



  /* 
   Sticky Nav
   ========================================================================== */
  $(window).on('scroll', function () {
    if ($(window).scrollTop() > 100) {
      $('.header-top-area').addClass('menu-bg');
    } else {
      $('.header-top-area').removeClass('menu-bg');
    }
  });

  /* 
 VIDEO POP-UP
 ========================================================================== */
  $('.video-popup').magnificPopup({
    disableOn: 700,
    type: 'iframe',
    mainClass: 'mfp-fade',
    removalDelay: 160,
    preloader: false,
    fixedContentPos: false,
  });

  /* 
   Back Top Link
   ========================================================================== */
  var offset = 200;
  var duration = 500;
  $(window).scroll(function () {
    if ($(this).scrollTop() > offset) {
      $('.back-to-top').fadeIn(400);
    } else {
      $('.back-to-top').fadeOut(400);
    }
  });

  $('.back-to-top').on('click', function (event) {
    event.preventDefault();
    $('html, body').animate({
      scrollTop: 0
    }, 600);
    return false;
  })

  /* 
   One Page Navigation
   ========================================================================== */


  $(window).on('load', function () {

    $('body').scrollspy({
      target: '.navbar-collapse',
      offset: 195
    });

    $(window).on('scroll', function () {
      if ($(window).scrollTop() > 100) {
        $('.fixed-top').addClass('menu-bg');
      } else {
        $('.fixed-top').removeClass('menu-bg');
      }
    });

  });

  /* Auto Close Responsive Navbar on Click
  ========================================================*/
  function close_toggle() {
    if ($(window).width() <= 768) {
      $('.navbar-collapse a').on('click', function () {
        $('.navbar-collapse').collapse('hide');
      });
    }
    else {
      $('.navbar .navbar-inverse a').off('click');
    }
  }
  close_toggle();
  $(window).resize(close_toggle);

  /* Nivo Lightbox
  ========================================================*/
  $('.lightbox').nivoLightbox({
    effect: 'fadeScale',
    keyboardNav: true,
  });

  /* Contact 
  ========================================================*/

  /* Form Validation and Submission
    ========================================================*/
  document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
      contactForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Ngăn chặn hành vi gửi form mặc định

        clearAllErrors(); // Xóa các thông báo lỗi cũ

        let formIsValid = true; // Biến cờ kiểm tra trạng thái hợp lệ của form

        // Kiểm tra các trường input/textarea bắt buộc (required)
        const requiredInputs = contactForm.querySelectorAll('input[required]');
        requiredInputs.forEach(input => {

          if (input.id === 'phone') {
            const phonePattern = /^\d{8,11}$/;
            if (!phonePattern.test(input.value.trim())) {
              formIsValid = false;
              displayError(input, 'Vui lòng nhập số điện thoại hợp lệ (8-11 chữ số).');
            }
          }
        });

        // Nếu form hợp lệ, xử lý gửi dữ liệu
        if (formIsValid) {

          // const msgSubmitDiv = document.getElementById('msgSubmit');
          // if (msgSubmitDiv) {
          //   msgSubmitDiv.textContent = 'Form đã được gửi thành công!';
          //   msgSubmitDiv.classList.remove('hidden');
          //   msgSubmitDiv.classList.add('text-success'); // Thêm class để định kiểu thành công
          //   setTimeout(() => {
          //     msgSubmitDiv.classList.add('hidden');
          //     msgSubmitDiv.classList.remove('text-success');
          //     msgSubmitDiv.textContent = '';
          //   }, 5000); // Ẩn sau 5 giây
          // }
          // ... (phần code kiểm tra validation của bạn ở đây) ...

          /*  ========================================================*/

          // Chuẩn bị dữ liệu form để gửi
          const form = document.forms['contact-form']


          // Lấy tham chiếu đến div thông báo chung
          const msgSubmitDiv = document.getElementById('msgSubmit');

          // URL của Google Apps Script Web App mà bạn đã triển khai
          const scriptURL = 'https://script.google.com/macros/s/AKfycbx1yeGKRe5ePdNJ8JhY1bppvMRwrrrwKLiTYJlVPrIGd_FLKXUVco7BhsWBtRb1L6Gj/exec'

          event.preventDefault()

       

          if (msgSubmitDiv) {
            msgSubmitDiv.textContent = 'Form đã được gửi thành công!';
            msgSubmitDiv.classList.remove('hidden');
            msgSubmitDiv.classList.add('text-success'); // Thêm class để định kiểu thành công
            setTimeout(() => {
              msgSubmitDiv.classList.add('hidden');
              msgSubmitDiv.classList.remove('text-success');
              msgSubmitDiv.textContent = '';
            }, 5000); // Ẩn sau 5 giây
          }

        } else {
          // Nếu form không hợp lệ
          const msgSubmitDiv = document.getElementById('msgSubmit');
          if (msgSubmitDiv) {
            msgSubmitDiv.textContent = 'Vui lòng sửa các lỗi trong form.';
            msgSubmitDiv.classList.remove('hidden');
            msgSubmitDiv.classList.add('text-danger'); // Thêm class để định kiểu lỗi
            setTimeout(() => {
              msgSubmitDiv.classList.add('hidden');
              msgSubmitDiv.classList.remove('text-danger');
              msgSubmitDiv.textContent = '';
            }, 5000);
          }
        }
      });
    }

    /**
     * Hàm hiển thị thông báo lỗi cho một input.
     * @param {HTMLElement} inputElement - Phần tử input.
     * @param {string} message - Thông báo lỗi.
     */
    function displayError(inputElement, message) {
      const errorDiv = inputElement.nextElementSibling; // Thẻ div.help-block.with-errors ngay sau input
      if (errorDiv && errorDiv.classList.contains('help-block') && errorDiv.classList.contains('with-errors')) {
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
      }
    }

    /**
     * Hàm xóa tất cả các thông báo lỗi hiện có.
     */
    function clearAllErrors() {
      const errorBlocks = document.querySelectorAll('.help-block.with-errors');
      errorBlocks.forEach(block => {
        block.textContent = '';
        block.style.display = 'none';
      });
      const msgSubmitDiv = document.getElementById('msgSubmit');
      if (msgSubmitDiv) {
        msgSubmitDiv.classList.add('hidden');
        msgSubmitDiv.classList.remove('text-success', 'text-danger');
        msgSubmitDiv.textContent = '';
      }
    }


  });

}(jQuery));

