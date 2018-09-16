 var map, heatmap;

        function initMap() {
            var points = [];

            fetch('http://209.97.149.77/tweets').then(function (response) {
                return response.json();
            }).then(function (data) {
                data.forEach(function (elem) {
                    var parts = elem[3].split(',');
                    points.push(new google.maps.LatLng(parseFloat(parts[0]), parseFloat(parts[1])));
                });
            }).then(function () {
                map = new google.maps.Map(document.getElementById('map'), {
                    zoom: 6,
                    center: { lat: 35.775, lng: -77.8 },
                    mapTypeId: 'roadmap',
                    disableDefaultUI: true,
                    zoomControl: true,
                    styles: [{ featureType: "poi", stylers: [{ visibility: "off" }] }, { stylers: [{ saturation: -70 }, { lightness: 37 }, { gamma: 1.15 }] }, { elementType: "labels", stylers: [{ gamma: .26 }, { visibility: "off" }] }, { featureType: "road", stylers: [{ lightness: 0 }, { saturation: 0 }, { hue: "#ffffff" }, { gamma: 0 }] }, { featureType: "road", elementType: "labels.text.stroke", stylers: [{ visibility: "off" }] }, { featureType: "road.arterial", elementType: "geometry", stylers: [{ lightness: 20 }] }, { featureType: "road.highway", elementType: "geometry", stylers: [{ lightness: 50 }, { saturation: 0 }, { hue: "#ffffff" }] }, { featureType: "administrative.province", stylers: [{ visibility: "on" }, { lightness: -50 }] }, { featureType: "administrative.province", elementType: "labels.text.stroke", stylers: [{ visibility: "off" }] }, { featureType: "administrative.province", elementType: "labels.text", stylers: [{ lightness: 20 }] }]
                });

                heatmap = new google.maps.visualization.HeatmapLayer({
                    data: points,
                    map: map
                });
                heatmap.set('radius', 30);

                var kmzLayer = new google.maps.KmlLayer("https://storage.googleapis.com/meat-magic-lcm/Florence.kmz");
                kmzLayer.setMap(map);
            });

        }
