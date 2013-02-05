$(function(){
	$('#compare').click(function(){

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
});

function compareLists(parse1, parse2, result) {
  $.each(parse1.queryKey, function(k1,v1){
    var klass = "notfound";

    $.each(parse2.queryKey, function(k2,v2){
      if(k1 == k2){
        // key founded
        klass = "key";

        if(v1 == v2){
          // key and value equal
          klass += "value";
        }

        return false;
      }
    });

    result.append('<li class="'+klass+'">'+k1+"="+v1+'</li>');

  });
}
