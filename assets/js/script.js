var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("demo");
    if (n > slides.length) {
        slideIndex = 1
    }
    if (n < 1) {
        slideIndex = slides.length
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}
var slideIndexs = 0;
showSlidess();

function showSlidess() {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("demo");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndexs++;
    if (slideIndexs > slides.length) {
        slideIndexs = 1
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndexs - 1].style.display = "block";
    dots[slideIndexs - 1].className += " active";
    setTimeout(showSlidess, 6000); // Change image every 2 seconds
}
///Count Down
Vue.filter('zerofill', function (value) {
  //value = ( value < 0 ? 0 : value );
  return (value < 10 && value > -1 ? '0' : '') + value;
});

var Tracker = Vue.extend({
  template: `
  <span v-show="show" class="flip-clock__piece">
    <span class="flip-clock__card flip-card">
      <b class="flip-card__top">{{current | zerofill}}</b>
      <b class="flip-card__bottom" data-value="{{current | zerofill}}"></b>
      <b class="flip-card__back" data-value="{{previous | zerofill}}"></b>
      <b class="flip-card__back-bottom" data-value="{{previous | zerofill}}"></b>
    </span>
    <span class="flip-clock__slot">{{property}}</span>
  </span>`,
  props: ['property', 'time'],
  data: () => ({
    current: 0,
    previous: 0,
    show: false }),


  events: {
    time(newValue) {

      if (newValue[this.property] === undefined) {
        this.show = false;
        return;
      }

      var val = newValue[this.property];
      this.show = true;

      val = val < 0 ? 0 : val;

      if (val !== this.current) {

        this.previous = this.current;
        this.current = val;

        this.$el.classList.remove('flip');
        void this.$el.offsetWidth;
        this.$el.classList.add('flip');
      }

    } } });
var el = document.createElement('div');
document.body.appendChild(el);

var Countdown = new Vue({

  el: el,

  template: ` 
  <div class="flip-clock" data-date="2017-02-11" @click="update">
    <tracker 
      v-for="tracker in trackers"
      :property="tracker"
      :time="time"
      v-ref:trackers
    ></tracker>
  </div>
  `,

  props: ['date', 'callback'],

  data: () => ({
    time: {},
    i: 0,
    trackers: ['Days', 'Hours', 'Minutes', 'Seconds'] //'Random', 
  }),

  components: {
    Tracker },


  beforeDestroy() {
    if (window['cancelAnimationFrame']) {
      cancelAnimationFrame(this.frame);
    }
  },

  watch: {
    'date': function (newVal) {
      this.setCountdown(newVal);
    } },


  ready() {
    if (window['requestAnimationFrame']) {
      this.setCountdown(this.date);
      this.callback = this.callback || function () {};
      this.update();
    }
  },

  methods: {

    setCountdown(date) {

      if (date) {
        this.countdown = moment(date, 'YYYY-MM-DD HH:mm:ss');
      } else {
        this.countdown = moment().endOf('day'); //this.$el.getAttribute('data-date');
      }
    },

    update() {
      this.frame = requestAnimationFrame(this.update.bind(this));
      if (this.i++ % 10) {return;}
      var t = moment(new Date());
      // Calculation adapted from https://www.sitepoint.com/build-javascript-countdown-timer-no-dependencies/
      if (this.countdown) {

        t = this.countdown.diff(t);

        //t = this.countdown.diff(t);//.getTime();
        //console.log(t);
        this.time.Days = Math.floor(t / (1000 * 60 * 60 * 24));
        this.time.Hours = Math.floor(t / (1000 * 60 * 60) % 24);
        this.time.Minutes = Math.floor(t / 1000 / 60 % 60);
        this.time.Seconds = Math.floor(t / 1000 % 60);
      } else {
        this.time.Days = undefined;
        this.time.Hours = t.hours() % 13;
        this.time.Minutes = t.minutes();
        this.time.Seconds = t.seconds();
      }

      this.time.Total = t;

      this.$broadcast('time', this.time);
      return this.time;
    } 
  } 
});
///Scroll
$(function() {
  $('a[href*=#]').on('click', function(e) {
    e.preventDefault();
    $('html, body').animate({ scrollTop: $($(this).attr('href')).offset().top}, 500, 'linear');
  });
});
//PAGE LOADER
$(window).on("load", function() {

  "use strict";
  $(".loader").fadeOut(800);

  $('.side-menu').removeClass('hidden');



  /*===================================
          Cube Portfolio OWL CAROUSEL
  ======================================*/

  $('#js-grid-blog-posts').cubeportfolio({
      filters: '#js-filters-blog-posts',
      search: '#js-search-blog-posts',
      defaultFilter: '*',
      animationType: '3dflip',
      gapHorizontal: 70,
      gapVertical: 30,
      gridAdjustment: 'responsive',
      mediaQueries: [{
          width: 1500,
          cols: 3,
      }, {
          width: 1100,
          cols: 3,
      }, {
          width: 800,
          cols: 3,
      }, {
          width: 481,
          cols: 2,
          options: {}
      }, {
          width: 320,
          cols: 1,
          options: {}
      }],
      caption: 'none',
      displayType: 'fadeIn',
      displayTypeSpeed: 400,
  });

  /*===================================
      sync-portfolio- and Owl Carousel
======================================*/

  $('.sync-portfolio-carousel').owlCarousel({
      loop: true,
      margin: 0,
      dots: false,
      nav: true,
      responsive: {
          0: {
              items: 1
          },
          600: {
              items: 1
          },
          1000: {
              items: 1
          }
      }
  });

  $(".owl-prev").html('<div class="navigation-link-prev"><a class="prev-btn"><i class="lni-chevron-left"></i> </a></div>');
  $(".owl-next").html('<div class="navigation-link-next"><a class="next-btn"><i class="lni-chevron-right"></i> </a></div>');

  // $('.navigation-links a.prev-btn').click(function() {
  //     var owl = $('.sync-portfolio-carousel');
  //     owl.owlCarousel();
  //     owl.trigger('next.owl.carousel');
  // });
  // $('.navigation-links a.next-btn').click(function() {
  //     var owl = $('.sync-portfolio-carousel');
  //     owl.owlCarousel();
  //     owl.trigger('prev.owl.carousel', [300]);
  // });




});