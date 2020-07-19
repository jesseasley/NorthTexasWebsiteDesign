function displayCarousel(obj)
{
    //sample call with the maximum number of option parameters -- just pass in the parameters you need
    //displayCarousel({ city: "Flower Mound", minPrice: "400000", maxPrice: "400000", minBeds: "400000",
    //      mls: "400000", maxBeds: "400000", minBaths: "400000" });

    if (obj.city === undefined) city = "Plano"; else city = obj.city;
    if (obj.minPrice === undefined) minPrice = "390000"; else minPrice = obj.minPrice;
    if (obj.maxPrice === undefined) maxPrice = "400000"; else maxPrice = obj.maxPrice;
    if (obj.minBeds === undefined) minBeds = ""; else minBeds = obj.minBeds;
    if (obj.mls === undefined) mls = ""; else mls = obj.mls;
    if (obj.maxBeds === undefined) maxBeds = ""; else maxBeds = obj.maxBeds;
    if (obj.minBaths === undefined) minBaths = ""; else minBaths = obj.minBaths;
    $.ajax({
        type: "GET",
        url: "active_listings_new.php",
        async: false,
        data: "city=" + city + "&mls=" + mls + "&minBeds=" + minBeds + "&maxBeds=" + maxBeds + 
            "&minBaths=" + minBaths + "&minPrice=" + minPrice + "&maxPrice=" + maxPrice,
        success: function (data) {
            alert(data);
            first = 1;
            html = "<div id='Carousel2' class='carousel slide carousel-fade' data-ride='carousel' data-interval='5000'>\n";
            html += "   <div class='carousel-inner'>\n";

            $(data).find("Row").each(
                function (j, f) {
                    if (first == 1) {
                        first = 0;
                        html += "<div class='item active row'>\n";
                    }
                    else {
                        html += "<div class='item row'>\n";
                    }
                    html += "            <div class='row'>\n";
                    html += "               <div class='col-lg-12'>\n";
                    html += "                  <center>\n";
                    html += "                     <a href=\"" + $(f).find("url").text() + "\" target=_empty>\n";
                    html += "                        " + $(f).attr("fullAddr") + "\n";
                    html += "                     </a>\n";
                    html += "                  </center>\n";
                    html += "                  <hr>\n";
                    html += "               </div>\n";
                    html += "            </div>\n";
                    html += "            <div class='row'>\n";
                    html += "               <div class='col-lg-7 col-sm-7'>\n";
                    html += "                  <center>\n";
                    html += "                     <a href=\"" + $(f).find("url").text();
                    html += "\" target=_empty><img src=\"" + $(f).attr("img") + "\" width=80%></a>\n";
                    html += "                  </center>\n";
                    html += "               </div>\n";
                    html += "               <div class='col-lg-5 col-sm-5'>\n";
                    html += "                  <div>" + $(f).attr("bed") + " bedrooms</div>\n";
                    html += "                  <div>" + $(f).attr("baths") + " baths</div><br>\n";
                    html += "                  <div>" + $(f).attr("sqft") + "</div>\n";
                    html += "                  <div>Lot size " + $(f).attr("acres") + " acres</div><br>\n";
                    html += "                  MLS# " + $(f).attr("mlsNo") + "\n";
                    html += "               </div>\n";
                    html += "            </div>\n";
                    html += "            <div class='row'>\n";
                    html += "               <div class='col-lg-12'>\n";
                    html += "                  <hr>\n";
                    html += "                  <center>\n";
                    html += "                     " + $(f).attr("price") + "\n";
                    html += "                  </center>\n";
                    html += "               </div>\n";
                    html += "            </div>\n";
                    html += "      </div>\n";

                }
            );
            html += "   </div>\n";
            html += "   <a class='left carousel-control' href='#Carousel2' role='button' data-slide='prev'>\n";
            html += "      <span class='glyphicon glyphicon-chevron-left'></span>\n";
            html += "      <span class='sr-only'>Previous</span>\n";
            html += "   </a>\n";
            html += "   <a class='right carousel-control' href='#Carousel2' role='button' data-slide='next'>\n";
            html += "      <span class='glyphicon glyphicon-chevron-right'></span>\n";
            html += "      <span class='sr-only'>Next</span>\n";
            html += "   </a>\n";
            html += "</div>\n";

            $('.carousel').carousel();
            return html;
        },
        error: function (j, err) {
            alert("error on call to active_listings_new: " + j.status);
        }
    }).fail(function () {
        alert("AJAX Call failed on active_listings_new");
    });
}
