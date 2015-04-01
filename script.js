$(function(){
    $('#url1,#url2').keyup(function(){

      var url1 = $("#url1").val();
      var url2 = $("#url2").val();

      var url1par = parseUri(url1);
      var url2par = parseUri(url2);

      var url1res = $('#url1res');
      var url2res = $('#url2res');

      url1res.children().remove();
      url2res.children().remove();

      compareLists(url1par, url2par, url1res);
      compareLists(url2par, url1par, url2res);

    });

    $(document).on('mouseenter','ul li', function(){
        var thisParent   = $(this).parent();
        var thisParentId = thisParent.attr('id');

        var other = thisParentId === 'url1res' ? 'url2res' : 'url1res';
        var classes = $(this).text().split(' = ');

        $(this).addClass('hover');
        $('#'+other+' .'+classes[0]+'.'+classes[0]).addClass('hover');
    });

    $(document).on('mouseleave','ul li', function(){
        $('ul li.hover').removeClass('hover');
    });

});

function compareLists(parse1, parse2, result) {
  $.each(parse1.queryKey, function(k1,v1){
    var cssStatusClass = "notfound";

    $.each(parse2.queryKey, function(k2,v2){
      if(k1 == k2){
        // key founded
        cssStatusClass = "key";

        if(v1 == v2){
          // key and value equal
          cssStatusClass += "value";
        }

        return false;
      }
    });

    result.append('<li class="'+cssStatusClass+' '+k1+' '+v1+' '+'">'+k1+" = "+v1+'</li>');

  });
}
