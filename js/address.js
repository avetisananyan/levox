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
    map = new google.maps.Map(document.getElementById("addressMap"), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8,
    });
}
