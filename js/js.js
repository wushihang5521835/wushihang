/**
 * Created by Administrator on 2017/5/18.
 */

// -------------------------面向对象----------------------------------

//面向对象-2级导航
function Nav(navlis){
  this.navlis = $(navlis);
  var that = this;
  this.navlis.hover(function () {
    that.enter($(this));
  }, function () {
    that.leave($(this));
  });
}

Nav.prototype.enter = function (elem) {
  elem.children("a").addClass("selected").parent().siblings().children("a").removeClass("selected");
  elem.children('div').slideDown()
}

Nav.prototype.leave = function (elem) {
  elem.children("a").removeClass("selected").parent().children('div').slideUp();
}

//面向对象-tab页切换　
function Tab(tabid,containerid){
  this.tablis = $(tabid+" li");
  this.container = $(containerid+" > div");
  var that = this;
  this.tablis.on("mouseenter", function () {
    that.move($(this),$(this).index());
  })
}
Tab.prototype.move = function (elem,eq) {
  elem.addClass("active").siblings().removeClass("active");
  this.container.eq(eq).show().siblings().hide();
}


//面向对象-切换轮播
function MoveCarousel(tabid,containerid){
  Tab.call(this,tabid,containerid);
  var that = this;
  this.tablis.on("mouseenter", function () {
    that.move($(this).index());
  }).triggerHandler("mouseenter")
}

for (var i in Tab.prototype){
  MoveCarousel.prototype[i] = Tab.prototype[i];
}

MoveCarousel.prototype.move = function (eq) {
  console.log(eq);
  var btnnext = this.container.eq(eq).find(".hdnext");
  var btnprev = this.container.eq(eq).find(".hdprev");

  var that = this;
  btnnext.unbind("click").on("click", function () {
    that.cutnext($(this));
  });

  btnprev.unbind("click").on("click", function () {
    that.cutprev($(this));
  });
}

// 点击next
MoveCarousel.prototype.cutnext = function (elem) {
  var ul = elem.prev().find("ul");
  ul.animate({top: "-842px"}, 500 ,function () {
    $(this).append("<li>"+$(this).find('li:first').html()+"</li>");
    $(this).find("li:first").remove();
    $(this).css("top","-471px");
  });
}

// 点击prev
MoveCarousel.prototype.cutprev = function (elem) {
  var ul = elem.prev().prev().find("ul");
  ul.animate({top: "0"}, 500 ,function () {
    $(this).prepend("<li>"+$(this).find('li:last').html()+"</li>");
    $(this).find("li:last").remove();
    $(this).css("top","-471px");
  });
}



//面向对象-正常轮播
function Carousel(containerid){
  this.container = $(containerid);
  this.prev = this.container.find(".hdprev");
  this.next = this.container.find(".hdnext");
  this.width = this.container.find("li").outerWidth(true);
  var that = this;
  this.prev.on("click", function () {
    that.clickPrev($(this));
  })
  this.next.on("click", function () {
    that.clickNext($(this));
  })
}

// 点击next
Carousel.prototype.clickNext = function (elem) {
  var ul = elem.prev().find("ul");
  var that = this;
  ul.animate({left: "-"+that.width*2+"px"}, 300 ,function () {
    $(this).prepend("<li>"+$(this).find('li:last').html()+"</li>");
    $(this).find("li:last").remove();
    $(this).css("left","-"+that.width+"px");
  });
}

// 点击prev
Carousel.prototype.clickPrev = function (elem) {
  var ul = elem.prev().prev().find("ul");
  var that = this;
  ul.animate({left: "0"}, 300 ,function () {
    $(this).prepend("<li>"+$(this).find('li:last').html()+"</li>");
    $(this).find("li:last").remove();
    $(this).css("left","-"+that.width+"px");
  });
}



// -------------------------页面初始化----------------------------------
$(function () {
  // 2级导航
  new Nav("#header-nav li");
  // tab1切换卡
  new Tab("#serve-tab","#serve-container");
  // tab2切换卡
  new Tab("#case-tab","#case-container");
  // tab5切换卡
  new Tab("#news-tab","#news-container");
  // tab2轮播图
  new MoveCarousel("#case-tab","#case-container");
  // tab4轮播图
  new Carousel("#about-container");
})