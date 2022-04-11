// Typer Starts

var Typer = function(element) {
    console.log("constructor called");
    this.element = element;
    var delim = element.dataset.delim || ","; 
    var words = element.dataset.words || "override these,sample typing";
    this.words = words.split(delim).filter(function(v){return v;}); 
    this.delay = element.dataset.delay || 200;
    this.deleteDelay = element.dataset.deleteDelay || 800;
    
    this.progress = { word:0, char:0, building:true, atWordEnd:false };
    this.typing = true;
    
    var colors = element.dataset.colors || "black";
    this.colors = colors.split(",");
    this.element.style.color = this.colors[0];
    this.colorIndex = 0;
    
    this.doTyping();
    };
    
    Typer.prototype.start = function() {
    if (!this.typing) {
      this.typing = true;
      this.doTyping();
    }
    };
    Typer.prototype.stop = function() {
    this.typing = false;
    };
    Typer.prototype.doTyping = function() {
    var e = this.element;
    var p = this.progress;
    var w = p.word;
    var c = p.char;
    var currentChar = this.words[w][c];
    p.atWordEnd = false;
    if (this.cursor) {
      this.cursor.element.style.opacity = "1";
      this.cursor.on = true;
      clearInterval(this.cursor.interval);
      var itself = this.cursor;
      this.cursor.interval = setInterval(function() {itself.updateBlinkState();}, 400);
    }
    if (p.building) {
      e.innerHTML += currentChar;
      p.char += 1;
      if (p.char == this.words[w].length) {
        p.building = false;
        p.atWordEnd = true;
      }
    } else {
      e.innerHTML = e.innerHTML.slice(0, -1);
      if (!this.element.innerHTML) {
        p.building = true;
        p.word = (p.word + 1) % this.words.length;
        p.char = 0;
        this.colorIndex = (this.colorIndex + 1) % this.colors.length;
        this.element.style.color = this.colors[this.colorIndex];
      }
    }
    var myself = this;
    setTimeout(function() {
      if (myself.typing) { myself.doTyping(); };
    }, p.atWordEnd ? this.deleteDelay : this.delay);
    };
    
    typers = {};
    elements = document.getElementsByClassName("typer");
    for (var i = 0, e; e = elements[i++];) {
    typers[e.id] = new Typer(e);
    }
    elements = document.getElementsByClassName("typer-stop");
    for (var i = 0, e; e = elements[i++];) {
    var owner = typers[e.dataset.owner];
    e.onclick = function(){owner.stop();};
    }
    elements = document.getElementsByClassName("typer-start");
    for (var i = 0, e; e = elements[i++];) {
    var owner = typers[e.dataset.owner];
    e.onclick = function(){owner.start();};
    }
    
    
    var Cursor = function(element) {
    this.element = element;
    this.cursorDisplay = element.dataset.cursorDisplay || "_";
    this.owner = typers[element.dataset.owner] || "";
    element.innerHTML = this.cursorDisplay;
    this.on = true;
    element.style.transition = "all 0.1s";
    var myself = this;
    this.interval = setInterval(function() {
      myself.updateBlinkState();
    }, 400);
    }
    Cursor.prototype.updateBlinkState = function() {
    if (this.on) {
      this.element.style.opacity = "0";
      this.on = false;
    } else {
      this.element.style.opacity = "1";
      this.on = true;
    }
    }
    
    elements2 = document.getElementsByClassName("cursor");
    for (var i = 0, e; e = elements2[i++];) {
    var t = new Cursor(e);
    t.owner.cursor = t;
    console.log(t.owner.cursor);
    }
    


    // Navigation

    const header = document.querySelector("header");
    const sectionOne = document.querySelector(".banner-wrapper");

    const faders = document.querySelectorAll('.fade-in')


    const sectionOneOptions = {
      rootMargin: "-200px 0px 0px 0px"
    };
    const sectionOneObserver = new IntersectionObserver
    (function(
      entries,
      sectionOneObserver
    ) {
      entries.forEach(entry => {
        if(!entry.isIntersecting) {
          header.classList.add("nav-scrolled");
        } else {
          header.classList.remove("nav-scrolled");
        }
      })
    }, sectionOneOptions);

    sectionOneObserver.observe(sectionOne);


    // Navigation Fade

    const appearOptions = {
      threshold: .3
    };

  const appearOnScroll = new IntersectionObserver
  (function(
    entries,
    appearOnScroll
  ){
    entries.forEach(entry => {
      if(!entry.isIntersecting) {
        return;
      } else {
        entry.target.classList.add('appear');
        appearOnScroll.unobserve(entry.target);
      }
    })
  },
  appearOptions);

  faders.forEach(fader => {
    appearOnScroll.observe(fader);
  })


  // Menu slider


$(function(){

  $('.slider-info').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: false,
    adaptiveHeight: true,
        infinite: false,
        useTransform: true,
        speed: 400,
        cssEase: 'cubic-bezier(0.77, 0, 0.18, 1)',
  });


  $('.slider-nav')
  
  .on('init', function (event, slick) {
            $('.slider-nav .slick-slide.slick-current').addClass('s-active');
        })
  
  .slick({
    slidesToShow: 4,
    slidesToScroll: 7,
    dots: false,
    focusOnSelect: false,
    infinite: false,
    responsive: [{
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
      }
    }, {
      breakpoint: 769,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
      }
    }, {
      breakpoint: 420,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      }
    }]
  });

  $('.slider-info').on('afterChange', function (event, slick, currentSlide) {
        $('.slider-nav').slick('slickGoTo', currentSlide);
        var currentNavSElem = '.slider-nav .slick-slide[data-slick-index="' + currentSlide + '"]';
        $('.slider-nav .slick-slide.s-active').removeClass('s-active');
        $(currentNavSElem).addClass('s-active');
    });

    $('.slider-nav').on('click', '.slick-slide', function (event) {
        event.preventDefault();
        var goToContentSlide = $(this).data('slick-index');

        $('.slider-info').slick('slickGoTo', goToContentSlide);
    });

});
  

// Scroller

const toTop = document.querySelector(".scrollup");

window.addEventListener("scroll", () => {
  if(window.pageYOffset > 300){
    toTop.classList.add("appear");
  } else {
    toTop.classList.remove("appear");
  }
})




// Smoooothth




  // Active link switching
  
$(function(){
  var scrollLink = $(".activate")
  
  scrollLink.click(function(e){
    e.preventDefault();
    $("body,html").animate({
      scrollTop: $(this.hash).offset().top + 20
    })
  });
  $(window).scroll(function(){
    var scrollbarLocation = $(this).scrollTop();
    scrollLink.each(function(){
      var sectionOffset = $(this.hash).offset().top
  
      if ( sectionOffset <= scrollbarLocation ){
        $(this).parent().addClass("active");
        $(this).parent().siblings().removeClass("active");
      }
  
    })
  });
  
  
  });
    
  
  