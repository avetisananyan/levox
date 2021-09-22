let arr = [];
let obj = {};
//on window load address items..
$(".addresses-map.active .address-container .address-items.load .address-item").each(function() {
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

//on tab click load address items..
$(".tab-link").click(function() {
    let itemsArrList = [];
    let tabId = $(this).attr('data-tab');
    $(this).addClass('active').siblings().removeClass('active');
    $('#tab-' + tabId).addClass('active').siblings().removeClass('active');
    console.log("#tab-" + tabId + " .address-container .address-items")
    let addressItem = $("#tab-" + tabId + " .address-container .address-items").first();

    itemsArrList = getItems(addressItem);
    console.log(itemsArrList)
    myMap.initialize(itemsArrList, tabId);
});

function getItems(addressItem) {
    let arr = [];
    let obj = {};
    $(addressItem.children()).each(function() {
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
    return arr;
}

//For Select
document.querySelector('.select-wrapper').addEventListener('click', function() {
    this.querySelector('.select').classList.toggle('open');
});
for (const option of document.querySelectorAll(".custom-option")) {
    option.addEventListener('click', function() {
        if (!this.classList.contains('selected')) {
            this.parentNode.querySelector('.custom-option.selected').classList.remove('selected');
            this.classList.add('selected');
            this.closest('.select').querySelector('.select__trigger span').textContent = this.textContent;

            let dataValue = this.getAttribute('data-value');
            let className =  document.querySelectorAll(".addresses-map.active .address-container .address-items");
            for (const item of className) {
                item.classList.remove('current') // Remove class "info"
            }
            document.getElementsByClassName(dataValue)[0].classList.add('current');

            let itemArrList = [];
            let dataObj = {};
            let addressItem =  document.querySelectorAll(".addresses-map.active .address-container .address-items" + "." + dataValue + " .address-item");
            for (const item of addressItem) {
                dataObj = {
                    item: $(item).attr("data-item"),
                    lat: $(item).attr("data-lat"),
                    lng: $(item).attr("data-lng"),
                    title: $(item).find(".item-title").text(),
                    description: $(item).find(".item-description span").text(),
                    date: $(item).find(".item-date span").text(),
                };
                itemArrList.push(dataObj);
            }

            let dataTab = document.querySelector(".addresses-container .tabs .tab-link.active").getAttribute('data-tab');
            myMap.initialize(itemArrList, dataTab);
        }
    })
}
window.addEventListener('click', function(e) {
    const select = document.querySelector('.select')
    if (!select.contains(e.target)) {
        select.classList.remove('open');
    }
});


$(".address-items .address-item").on("click", function() {
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
    myMap.initialize(arr, 1);
}

let markers = [];
let myMap = {
    map: null,
    markers: [],
    infowindow: null,
    image: "assets/images/map-loc.svg",
    addressList: [],
    initialize: function(arrList, tabId) {
        this.addressList = arrList;
        this.createMap(tabId);
        this.setMarkersAndInfoWindow();
    },
    createMap: function(tabId) {
        let mapOptions = {
            center: new google.maps.LatLng(51.481382, -3.179028),
            zoom: 16,
            disableDefaultUI: true,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            scrollwheel: true
        };
        let aa = $("#addressMap" + tabId);
        this.map = new google.maps.Map(aa[0], mapOptions);
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
                        myMap.infowindow.setContent('<div class="map-addresses map-addresses-maps"><div class="map-addresses-title"><span>' + address.title + '</span><a class="close"><img src="assets/icons/close.svg"></a></div><div class="map-addresses-images d-flex"><div class="map-addresses-img"><img src="assets/images/addresses-1.png"></div><div class="map-addresses-img"><img src="assets/images/addresses-2.png"></div><div class="map-addresses-img"><img src="assets/images/addresses-3.png"></div></div><div class="map-addresses-info-container"><div class="map-addresses-info"><label>Адрес:</label><span class="map-addresses-description">' + address.description + '</span></div><div class="map-addresses-info"><label>Режим работы:</label><span class="map-addresses-date">' + address.date + '</span></div><div class="map-addresses-info"><label>Площадь магазина:</label><span>1 000 м2</span></div><div class="map-addresses-info"><label>Телефон:</label><a href="tel:+79183333333"><span>+ 7 (918) 333-33-33</span></a></div></div><div class="map-addresses-action"><button>Выбрать</button></div></div>');
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
