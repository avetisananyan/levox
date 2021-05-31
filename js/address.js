$('.tab-link').click( function() {
    let tabID = $(this).attr('data-tab');
    $(this).addClass('active').siblings().removeClass('active');
    $('#tab-'+tabID).addClass('active').siblings().removeClass('active');
});

let arr = [];
let obj = {};
$(".addresses-map.active .address-item").each(function(index) {
    obj = {
        item: $(this).attr("data-item"),
        lat: $(this).attr("data-lat"),
        lng: $(this).attr("data-lng"),
        title: $(this).find(".item-title").text(),
        description: $(this).find(".item-description span").text(),
        date: $(this).find(".item-date span").text(),
    };

    arr.push(obj);
});

$(".address-items .address-item").click(function() {
    if(window.matchMedia("(max-width: 768px)").matches) {
        $('.address-items .address-item').removeClass('active');
        $(this).addClass('active');

        let itemTitle = $(this).find('.item-title span').text();
        let itemDescription = $(this).find('.item-description span').text();
        let itemDate = $(this).find('.item-date span').text();

        $('.map-addresses .map-addresses-title span').text(itemTitle);
        $('.map-addresses .map-addresses-description').text(itemDescription);
        $('.map-addresses .map-addresses-date').text(itemDate);
    } else {
        let dataItem = $(this).attr("data-item");
        myMap.setMarker(dataItem);
    }
});

if(window.matchMedia("(max-width: 768px)").matches) {
    $(".address-items .address-item").click(function() {
        $(".addresses-map-container .map-addresses").show(200);
    });

    $(".addresses-map-container .map-addresses .map-addresses-title .close").click(function() {
        $(".addresses-map-container .map-addresses").hide(200);
    });
}

function initMap() {
    myMap.initialize();
}

let markers = [];
let myMap = {
    map: null,
    markers: [],
    infowindow: null,
    image: "assets/images/map-loc.svg",
    addressList: arr,
    initialize: function() {
        this.createMap();
        this.setMarkersAndInfoWindow();
    },
    createMap: function() {
        let mapOptions = {
            center: new google.maps.LatLng(51.481382, -3.179028),
            zoom: 16,
            disableDefaultUI: true,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            scrollwheel: true
        };
        this.map = new google.maps.Map($("#addressMap")[0], mapOptions);
        this.infowindow = new google.maps.InfoWindow();
    },
    setMarkersAndInfoWindow: function() {
        for (let i = 0; i < this.addressList.length; i++) {
            let address = this.addressList[i];
            let marker = new google.maps.Marker({
                position: new google.maps.LatLng(address.lat, address.lng),
                map: myMap.map,
                title: address.name,
                icon: this.image,
                draggarble: false
            });
            this.markers.push(marker);

            if(!window.matchMedia("(max-width: 768px)").matches) {
                google.maps.event.addListener(marker, 'click', function (marker, address) {
                    return function () {
                        myMap.infowindow.setContent('<div class="map-addresses map-addresses-maps"><div class="map-addresses-title"><span>' + address.title + '</span><a class="close"><img src="assets/icons/close.svg"></a></div><div class="map-addresses-images d-flex"><div class="map-addresses-img"><img src="assets/images/addresses-1.png"></div><div class="map-addresses-img"><img src="assets/images/addresses-2.png"></div><div class="map-addresses-img"><img src="assets/images/addresses-3.png"></div></div><div class="map-addresses-info-container"><div class="map-addresses-info"><label>Адрес:</label><span class="map-addresses-description">' + address.description + '</span></div><div class="map-addresses-info"><label>Режим роботы:</label><span class="map-addresses-date">' + address.date + '</span></div><div class="map-addresses-info"><label>Площадь магазина:</label><span>1 000 м2</span></div><div class="map-addresses-info"><label>Телефон:</label><span>+ 7 (918) 333-33-33</span></div></div></div>');
                        myMap.infowindow.open(myMap.map, marker);

                        for (let j = 0; j < markers.length; j++) {
                            markers[j].setIcon("assets/images/map-loc.svg");
                        }
                        marker.setIcon("assets/images/map-loc-active.svg");
                        $(".addresses-map-container .gm-ui-hover-effect").on("click", function() {
                            marker.setIcon("assets/images/map-loc.svg");
                        });
                    };
                }(marker, address));
            } else {
                google.maps.event.addListener(marker, 'click', function (marker, address) {
                    return function () {
                        $(`.address-items .address-item[data-item=${address.item}]`).click();
                        for (let j = 0; j < markers.length; j++) {
                            markers[j].setIcon("assets/images/map-loc.svg");
                        }
                        marker.setIcon("assets/images/map-loc-active.svg");
                        $(".addresses-map-container .map-addresses .map-addresses-title .close").click(function() {
                            marker.setIcon("assets/images/map-loc.svg");
                        });
                    };
                }(marker, address));
            }
            markers.push(marker);
        }
    },
    setMarker: function(dataItem) {
        google.maps.event.trigger(this.markers[dataItem], 'click');
    }
};
