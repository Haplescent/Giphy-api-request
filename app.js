$(document).ready(function () {
  // ---------- VARIABLES ----------

  var search = "";
  var title = "";
  var posterURL = "";
  var oldSearch = "";

  // ---------- ON.CLICKS ----------

  // submit button
  $(document).on("click", "#btnSubmit", function (e) {
    e.preventDefault();
    search = $("#search").val();
    $("#pastSearches").append(
      `<button class="reSearch btn">${search}</button>`
    );
    renderResults(search);
  });

  // see more button

  // history
  $(document).on("click", ".reSearch", function () {
    oldSearch = $(this).text();
    renderResults(oldSearch);
  });

  // ---------- FUNCTIONS ----------

  function renderResults(str) {
    $("#results").html("");

    $.ajax({
      type: "GET",
      url: `https://api.giphy.com/v1/gifs/search?api_key=07S9I5BCiB35dZ0afrPbtrBm9M9xMq49&q=${str}&limit=20`,
      dataType: "json",
    }).then(function (response) {
      console.log(response);
      for (var i = 0; i < response.data.length; i++) {
        posterURL = response.data[i].images.original.url
        $("#results")
          .append(`<div class="card col-sm-3 m-1" style="width: 18rem;">
        <img src="${posterURL}" class="card-img-top mt-3" style="width:auto; height:400px" />
        <div class="card-body">
        <div style="height:80px">
          <p class="card-text">
            <strong>Title:</strong> ${title} <br/>
          </p>
          </div>
        </div>
      </div>`);
      }
    });
    $("#search").val("");
  }
});