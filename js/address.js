$(".address-items .address-item").click(function() {
    $('.address-items .address-item').removeClass('active');
    $(this).addClass('active');

    let itemTitle = $(this).find('.item-title span').text();
    let itemDescription = $(this).find('.item-description span').text();
    let itemDate = $(this).find('.item-date span').text();

    $('.map-addresses .map-addresses-title span').text(itemTitle);
    $('.map-addresses .map-addresses-description').text(itemDescription);
    $('.map-addresses .map-addresses-date').text(itemDate);

    $(".addresses-map-container .map-addresses").show(200);
});

$(".addresses-map-container .map-addresses .map-addresses-title .close").click(function() {
    $(".addresses-map-container .map-addresses").hide(200);
});

// let map;
// function initMap() {
//     map = new google.maps.Map(document.getElementById("addressMap"), {
//         center: { lat: -34.397, lng: 150.644 },
//         zoom: 8,
//     });
// }

$(document).ready(function() {
    myMap.initialize();
});

var myMap = {
    map: null,
    markers: [],
    infowindow: null,
    addressList: [{
        name: 'LEVOX Краснодар 1',
        lat: '51.480561',
        lng: '-3.179239',
    }, {
        name: "LEVOX Краснодар 2",
        lat: '51.479411',
        lng: '-3.179182',
    }, {
        name: 'LEVOX Краснодар 3',
        lat: '51.480742',
        lng: '-3.181066',
    }, {
        name: 'LEVOX Краснодар 4',
        lat: '51.479870',
        lng: '-3.172483',
    }, {
        name: 'LEVOX Краснодар 5',
        lat: '51.480740',
        lng: '-3.181076',
    }, ],
    initialize: function() {
        this.createMap();
        this.setMarkersAndInfoWindow();
    },

    createMap: function() {
        var mapOptions = {
            center: new google.maps.LatLng(51.479382, -3.179028),
            disableDefaultUI: true,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            scrollwheel: true
        };
        this.map = new google.maps.Map($("#addressMap")[0], mapOptions);
        this.infowindow = new google.maps.InfoWindow();
    },
    setMarkersAndInfoWindow: function() {
        for (var i = 0; i < this.addressList.length; i++) {
            var address = this.addressList[i];
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(address.lat, address.lng),
                map: myMap.map,
                title: address.name
            });
            this.markers.push(marker);

            google.maps.event.addListener(marker, 'click', function(marker, address) {
                return function() {
                    var content = $('#map-addresses').html();
                    myMap.infowindow.setContent('<div id="addressFeatures" style="height:280px;">' + address.name + '<hr/>' + content + '</div>');
                    myMap.infowindow.open(myMap.map, marker);
                };
            }(marker, address));
        }

        google.maps.event.addListener(myMap.infowindow, 'domready', function() {
            $('#addressFeatures').tabs();
        });

    }
};
