+function ($) { "use strict";
  $(function(){

    // table select/deselect all
    //$(document).on('change', 'table thead [type="checkbox"]', function(e){
    //  e && e.preventDefault();
    //  var $table = $(e.target).closest('table'), $checked = $(e.target).is(':checked');
    //  $('tbody [type="checkbox"]',$table).prop('checked', $checked);
    //});
  });
}(window.jQuery);

+function(a) {"use strict";
  a(function() {
    a(document).on("click", "[ui-toggle-class]",
        function(b) {
          b.preventDefault();
          var c = a(b.target);
          c.attr("ui-toggle-class") || (c = c.closest("[ui-toggle-class]"));
          var d = c.attr("ui-toggle-class").split(","),
              e = c.attr("target") && c.attr("target").split(",") || Array(c),
              f = 0;
          a.each(d,
              function(b, c) {
                var g = e[e.length && f];
                a(g).toggleClass(d[b]),
                    f++
              }),
              c.toggleClass("active")
        })
  })
} (jQuery);

+function(a) {"use strict";
    a(function() {
      a(document).on("click", "[ui-nav] a",
          function(b) {
            var c, d = a(b.target);
            d.is("a") || (d = d.closest("a")),
                c = d.parent().siblings(".active"),
            c && c.toggleClass("active").find("> ul:visible").slideUp(200),
            d.parent().hasClass("active") && d.next().slideUp(200) || d.next().slideDown(200),
                d.parent().toggleClass("active"),
            d.next().is("ul") && b.preventDefault()
          })
    })
} (jQuery)