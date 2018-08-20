(function ($) {
  $.fn.extend({
    Pagination: function (options) {
      var defaults = {
        width: 800,
        height: 400,
        fadeSpeed: 400,
        fontSize: 20,
        lineHeight: 25,
        onPageChange: function(cpage, totalPage) { console.log(cpage, totalPage) }
      };
      var options = $.extend(defaults, options);

      var $content = $(this);

      var scrollHeight;
      var lastPage;
      var cPage = 1;
      var gap = 100;

      setContent = function () {
        $content.removeAttr("style");
        $content.css("font-size", options.fontSize);
        $content.css("line-height", options.lineHeight + "px");
        $content.css('overflowX', 'hidden');
        scrollHeight = $content.innerHeight();
        lastPage = Math.ceil(scrollHeight / options.height);
        $content.css("height", options.height);
        _setColumnWidth(options.width);
        _setColumnGap(gap + 'px');
      };

      _setColumnWidth = function (width) {
        $content.css("column-width", width);
        $content.css("-moz-column-width", width);
        $content.css("-webkit-column-width", width);
      };

      _setColumnGap = function (gap) {
        $content.css("column-gap", gap);
        $content.css("-moz-column-gap", gap);
        $content.css("-webkit-column-gap", gap);
      };

      showPage = function (page) {
        page = page > 1 ? page : 1;
        page = page >= lastPage ? lastPage : page;
        cPage = page;

        $content.animate({
          scrollLeft: (page - 1) * (options.width + gap)
        }, options.fadeSpeed);
        options.onPageChange(cPage, lastPage);
      };

      setContent();
      showPage(1);

      var windowHeight = $(window).height();
      var $body = $("body");
      var startX, startY;
      var dir = 0;
      $body.css("height", windowHeight);
      $("body").on("touchstart", function (e) {
        startX = e.originalEvent.changedTouches[0].pageX;
        startY = e.originalEvent.changedTouches[0].pageY;
      });
      $("body").on("touchmove", function (e) {
        moveEndX = e.originalEvent.changedTouches[0].pageX;
        moveEndY = e.originalEvent.changedTouches[0].pageY;
        X = moveEndX - startX;
        Y = moveEndY - startY;

        if (Math.abs(X) > Math.abs(Y) && X > 0) {
          dir = 0;
        }
        else if (Math.abs(X) > Math.abs(Y) && X < 0) {
          dir = 1;
        }
      });
      $("body").on("touchend", function (e) {
        if (dir) {
          showPage(cPage + 1);
        } else {
          showPage(cPage - 1);
        }
      })

    }
  });
})(jQuery);
