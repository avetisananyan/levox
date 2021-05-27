$(".address-items .address-item").click(function() {
    $('.address-items .address-item').removeClass('active');
    $(this).addClass('active');

    let itemTitle = $(this).find('.item-title span').text();
    let itemDescription = $(this).find('.item-description span').text();
    let itemDate = $(this).find('.item-date span').text();

    $('.map-addresses .map-addresses-title span').text(itemTitle);
    $('.map-addresses .map-addresses-description').text(itemDescription);
    $('.map-addresses .map-addresses-date').text(itemDate);

    // myMap.setMarker();
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

let myMap = {
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
        let mapOptions = {
            center: new google.maps.LatLng(51.479382, -3.179028),
            zoom: 12,
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
                title: address.name
            });
            this.markers.push(marker);

            google.maps.event.addListener(marker, 'click', function(marker, address) {
                return function() {
                    let content = $('#map-addresses').html();
                    myMap.infowindow.setContent('<div id="addressFeatures">' + content + '</div>');
                    myMap.infowindow.open(myMap.map, marker);
                };
            }(marker, address));
        }

        google.maps.event.addListener(myMap.infowindow, 'domready', function() {

        });
    },
    // setMarker: function() {
    //     let address = this.addressList[1];
    //     console.log(address);
    //     let marker = new google.maps.Marker({
    //         position: new google.maps.LatLng(address.lat, address.lng),
    //         // map: myMap.map,
    //         title: address.name
    //     });
    //
    //     let content = $('#map-addresses').html();
    //     console.log(myMap.map);
    //     myMap.infowindow.setContent('<div id="addressFeatures">' + content + '</div>');
    //     myMap.infowindow.open(marker);
    // }
};
