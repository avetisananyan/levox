$(function() {
    let buttonPlus  = $(".cart-qty-plus");
    let buttonMinus = $(".cart-qty-minus");

    let incrementPlus = buttonPlus.click(function() {
        let $n = $(this)
            .parent(".cart-qty-container")
            .parent(".cart-item-qty")
            .find(".qty");
        $n.val(Number($n.val())+1 );
        if (Number($n.val()) > 1) {
            $(this).parent().find(".cart-qty-minus").css("color", "#202020");
        }
    });

    let incrementMinus = buttonMinus.click(function() {
        let $n = $(this)
            .parent(".cart-qty-container")
            .parent(".cart-item-qty")
            .find(".qty");
        let amount = Number($n.val());
        if (amount > 1) {
            $n.val(amount-1);
            $(this).css("color", "#202020");
        } else {
            $(this).css("color", "#C4C4C4");
        }
    });

    $('.delivery .tabs-nav a').click(function() {

        // Check for active
        $('.delivery .tabs-nav li').removeClass('active');
        $(this).parent().addClass('active');

        // Display active tab
        let currentTab = $(this).attr('href');
        $('.delivery .tabs-content > div').hide();
        $(currentTab).show();

        return false;
    });

    $('.payment-method .tabs-nav a').click(function() {
        let wrapperWith = $(".horizontal-scroll-wrapper").width();
        let windowWith = $(window).width();
        let attrTab = $(this).parent().attr("tab");

        if (attrTab == 1) {
            $(".horizontal-scroll-wrapper").scrollLeft(0);
        } else if (attrTab == 3) {
            $(".horizontal-scroll-wrapper").scrollLeft(wrapperWith);
        } else {
            $(".horizontal-scroll-wrapper").scrollLeft((wrapperWith - $(this).parent().width()) / 6);
        }
        
        $(this).parent().parent().attr("data-tab", 'tab-'+$(this).parent().attr('tab'));
        // Check for active
        $('.payment-method .tabs-nav li').removeClass('active');
        $(this).parent().addClass('active');

        // Display active tab
        let currentTab = $(this).attr('href');
        $('.payment-method .tabs-content > div').hide();
        $(currentTab).show();

        return false;
    });

    $('.lift-option-dropdown').click(function(e) {
        e.preventDefault();
        e.stopPropagation();
        $(this).toggleClass('expanded');
        $('#' + $(e.target).attr('for')).prop('checked', true);
        $('#' + $(e.target).attr('for')).attr('area-checked', true).siblings().attr('area-checked', false);
        console.log($(e.target).attr('for'));
        if ($(e.target).attr('for') != "lift-default") {
            $("[for=lift-default]").empty();
        }
    });

    if(!window.matchMedia("(max-width: 768px)").matches) {
        function alignModal() {
            var modalDialog = $(this).find(".modal-dialog");
            // Applying the top margin on modal to align it vertically center
            modalDialog.css("margin-top", Math.max(0, ($(window).height() - modalDialog.height()) / 2));
        }
        // Align modal when it is displayed
        $(".modal").on("shown.bs.modal", alignModal);
        // Align modal when user resize the window
        $(window).on("resize", function(){
            $(".modal:visible").each(alignModal);
        });
    }

    $(".cart-terms-label").on('click', function() {
        if($(".checkbox input").is(":checked")) {
            $(".checkbox input").prop('checked', false);
        } else {
            $(".checkbox input").prop('checked', true);
        }
    });
});

let arr = [];
let obj = {};

$(".address-container .address-item").each(function(index) {
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
$('#addressModal').on('shown.bs.modal', function () {
    initMap();
});
