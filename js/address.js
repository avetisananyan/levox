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

let map;

function initMap() {
    map = new google.maps.Map(document.getElementById("hotelsMap"), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8,
    });
}

// $(document).ready(function() {
//     myMap.initialize();
// });
//
// var myMap = {
//     map: null,
//     markers: [],
//     infowindow: null,
//     minPrice: 0,
//     maxPrice: 0,
//     hotelsList: [{
//         name: 'Cafe Citta',
//         lat: '51.480561',
//         lng: '-3.179239',
//         price: 20,
//         description: 'To book a table please call us on 02920 224040. We cannot accept bookings on this page. Open Tues-Sat from midday to last food orders at 9pm.',
//     }, {
//         name: "Bomber's Sandwich House",
//         lat: '51.479411',
//         lng: '-3.179182',
//         price: 10,
//         description: 'A sandwich shop which offers you hearty sandwiches with fillings cooked that day and freshly baked bread.'
//     }, {
//         name: 'Science Cream',
//         lat: '51.480742',
//         lng: '-3.181066',
//         price: 30,
//         description: "Here at Science Cream we like to do things a little differently, but that doesn't mean that we've forgotten the classics. That's why you'll find indulgent chocolate and creamy vanilla on our board every single day. If you prefer to walk on the wild side, you'll find a revolving cast of flavours, from salted caramel and summer strawberries, to coffee, stout and chilli. Also, we take suggestions and can make your ice cream dreams a reality."
//     }, {
//         name: 'The Little Man Coffee Company',
//         lat: '51.479870',
//         lng: '-3.172483',
//         price: 5,
//         description: 'Takes Reservations, Walk-Ins Welcome, Good For Groups, Good For Kids, Take Out, Delivery and Catering'
//     }, {
//         name: 'Restaurant Minuet',
//         lat: '51.480740',
//         lng: '-3.181076',
//         price: 40,
//         description: 'Pellentesque accumsan molestie ipsum ut feugiat. Nunc varius nisl sed ligula vehicula, vitae sodales magna volutpat! Praesent tempus faucibus nisl, vel aliquet lectus viverra quis. Curabitur leo enim, tincidunt viverra vestibulum luctus, cursus et velit. Proin id metus ut mi sagittis varius in at nulla. Aliquam semper lobortis pellentesque. Donec aliquam risus sit amet ipsum consectetur pulvinar.'
//     }, ],
//     initialize: function() {
//         this.setMinMaxPrices();
//         this.displayHotels();
//         this.setSpinner();
//         this.createMap();
//         this.setMarkersAndInfoWindow();
//         this.setSlider();
//     },
//     setMinMaxPrices: function() {
//         this.minPrice = this.hotelsList[0].price;
//         this.maxPrice = this.hotelsList[0].price;
//         for (var i = 0; i < this.hotelsList.length; i++) {
//             this.minPrice = this.hotelsList[i].price < this.minPrice ? this.hotelsList[i].price : this.minPrice;
//             this.maxPrice = this.hotelsList[i].price > this.maxPrice ? this.hotelsList[i].price : this.maxPrice;
//         }
//         $('#currentRange').text('GBP ' + this.minPrice + ' - ' + 'GBP ' + this.maxPrice);
//     },
//     displayHotels: function() {
//         var str = '';
//         for (var i = 0; i < this.hotelsList.length; i++) {
//             var hotel = this.hotelsList[i];
//             str += '<h3 data-price="' + hotel.price + '">' + hotel.name + '</h3>';
//             str += '<div>';
//             str += '<div class="ui-state-highlight ui-corner-all" style="padding: 5px;">Price: GBP ' + hotel.price + '</div>';
//             str += hotel.description;
//             str += '</div>';
//         }
//         $('#listing').html(str);
//         $('#listing').accordion({
//             collapsible: true,
//             active: false,
//             heightStyle: 'content'
//         });
//     },
//     setSpinner: function() {
//         $('#spinner').spinner({
//             min: 0,
//             max: 18,
//             stop: function(event, ui) {
//                 myMap.map.setZoom(parseInt($(this).val(), 10));
//             }
//         });
//     },
//     createMap: function() {
//         var mapOptions = {
//             center: new google.maps.LatLng(51.479382, -3.179028),
//             zoom: parseInt($('#spinner').val(), 12),
//             disableDefaultUI: true,
//             mapTypeId: google.maps.MapTypeId.ROADMAP,
//             scrollwheel: true
//         };
//         this.map = new google.maps.Map($("#hotelsMap")[0], mapOptions);
//         this.infowindow = new google.maps.InfoWindow();
//     },
//     setMarkersAndInfoWindow: function() {
//         for (var i = 0; i < this.hotelsList.length; i++) {
//             var hotel = this.hotelsList[i];
//             var marker = new google.maps.Marker({
//                 position: new google.maps.LatLng(hotel.lat, hotel.lng),
//                 map: myMap.map,
//                 title: hotel.name
//             });
//             this.markers.push(marker);
//
//             google.maps.event.addListener(marker, 'click', function(marker, hotel) {
//                 return function() {
//                     var content = $('#tabs').html();
//                     myMap.infowindow.setContent('<div id="hotelFeatures" style="height:280px;">' + hotel.name + '<hr/>' + content + '</div>');
//                     myMap.infowindow.open(myMap.map, marker);
//
//
//                 };
//             }(marker, hotel));
//         }
//
//         google.maps.event.addListener(myMap.infowindow, 'domready', function() {
//             $('#hotelFeatures').tabs();
//         });
//
//     },
//     setSlider: function() {
//         $('#slider').slider({
//             min: myMap.minPrice,
//             max: myMap.maxPrice,
//             range: true,
//             values: [myMap.minPrice, myMap.maxPrice],
//             step: 2,
//             slide: function(event, ui) {
//                 $('#currentRange').text('USD ' + ui.values[0] + ' - ' + 'USD ' + ui.values[1]);
//             },
//             stop: function(event, ui) {
//                 $('#listing h3').each(function() {
//                     var price = parseInt($(this).data('price'), 10);
//                     //headerIndex corresponds to 0 based index of hotels in object as well as in DOM
//                     var headerIndex = $('#listing h3').index($(this));
//                     if (price >= ui.values[0] && price <= ui.values[1]) {
//                         $('#listing h3:eq(' + headerIndex + ')').show();
//                         myMap.markers[headerIndex].setMap(myMap.map);
//                     } else {
//                         $('#listing h3:eq(' + headerIndex + ')').hide();
//                         $('#listing div.ui-accordion-content:eq(' + headerIndex + ')').hide();
//                         myMap.markers[headerIndex].setMap(null);
//                     }
//                 });
//             }
//         });
//     }
// };