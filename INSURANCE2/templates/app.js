
  
  function onClickedInsurancePremium() {
    console.log("Estimate premium button clicked");
    var age = document.getElementById("uiage");
    var bmi = document.getElementById("uibmi");
    var children = document.getElementById("uichildren");
    var gender = document.getElementById("uisex");
    var smoker = document.getElementById("uismoker");
    var region = document.getElementById("uiregion");
    var premium = document.getElementById("uipremium");
  
    var url = "http://127.0.0.1:5000/predict_premium"; //Use this if you are NOT using nginx which is first 7 tutorials
    //var url = "/api/predict_home_price"; // Use this if  you are using nginx. i.e tutorial 8 and onwards
  
    $.post(url, {
        age: parseInt(age.value),
        bmi: parseFloat(bmi.value),
        children: parseInt(children.value),
        gender: gender.value,
        smoker: smoker.value,
        region: region.value,
        premium: premium.value

    },function(data, status) {
        console.log(data.estimated_premium);
        premium.innerHTML = "<h2>" + '$'+data.estimated_premium.toFixed(2) + "</h2>";
        console.log(status);
    });
  }
  
  function onPageLoad() {
    console.log( "document loaded" );
    var url_smoker = "http://127.0.0.1:5000/smoker"; // Use this if you are NOT using nginx which is first 7 tutorials
    var url_gender = "http://127.0.0.1:5000/gender";
    var url_region = "http://127.0.0.1:5000/region";
    //var url = "/api/get_location_names"; // Use this if  you are using nginx. i.e tutorial 8 and onwards
    $.get(url_smoker,function(data, status) {
        console.log("got response for get_location_names request");
        if(data) {
            var smoker = data.smoker
            var uiLocations = document.getElementById("uismoker")
            $('#uismoker').empty();
            for(var i in smoker) {
                var opt = new Option(smoker[i]);
                $('#uismoker').append(opt);
                //$(opt).appendTo('#uiLocations');
            }
        }
    })
    $.get(url_gender,function(data, status) {
      console.log("got response for get_location_names request");
      if(data) {
          var gender = data.gender
          var uisex = document.getElementById("uisex")
          $('#uisex').empty();
          for(var i in gender) {
              var opt = new Option(gender[i]);
              $('#uisex').append(opt);
              //$(opt).appendTo('#uiLocations');
          }
      }
  })
  $.get(url_region,function(data, status) {
    console.log("got response for get_location_names request");
    if(data) {
        var region = data.region
        var uiLocregion = document.getElementById("uiregion")
        $('#uiregion').empty();
        for(var i in region) {
            var opt = new Option(region[i]);
            $('#uiregion').append(opt);
            //$(opt).appendTo('#uiLocations');
        }
    }
})
  }

  
window.onload = onPageLoad;