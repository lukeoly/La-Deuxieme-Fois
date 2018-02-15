$(document).ready(function() {
  $('.gallery-carousel').slick({
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 300,
    slidesToScroll: 1,
    // centerMode: true,
    variableWidth: true,
    responsive: [
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 4,
      }
    }
  ]
  });
});
