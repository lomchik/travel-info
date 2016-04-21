map.on('style.load', function () {
    map.addSource("summits", {
        "type": "geojson",
        "data": {
            "type": "FeatureCollection",
            "features": [{
                    "type": "Feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": [24.499931390772105, 48.16022630333785]
                    },
                    "properties": {
                        "title": "Hoverla",
                        "description": "the highest mountain in Ukraine",
                        "marker-symbol": "mountain"
                    }
                }, {
                    "type": "Feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": [24.42151907426097, 48.17201745845338]
                    },
                    "properties": {
                        "title": "Petros",
                        "description": "asdasdasd",
                        "marker-symbol": "mountain",
                        'marker-size': 'small'
                    }
                }
            ]
        }
    });

    map.addLayer({
        "id": "mountains",
        "type": "symbol",
        "source": "summits",
        "interactive": true,
        "layout": {
            "icon-image": "{marker-symbol}-15",
            "text-field": "{title}",
            "text-font": ["Open Sans Regular"],
            "text-size": 12,
            "text-offset": [0, 1],
            "text-anchor": "top"
        }
    });
});


var popup = new mapboxgl.Popup();
// When a click event occurs near a marker icon, open a popup at the location of
// the feature, with description HTML from its properties.
map.on('click', function (e) {
    map.featuresAt(e.point, {
        radius: 15, // Half the marker size (15px).
        includeGeometry: true,
        layer: ['mountains']
    }, function (err, features) {
        if (err || !features.length) {
            popup.remove();
            return;
        }
        var feature = features[0];
        // Populate the popup and set its coordinates
        // based on the feature found.
        popup.setLngLat(feature.geometry.coordinates)
            .setHTML(feature.properties.description)
            .addTo(map);
    });
    map.featuresAt(e.point, {
        radius: 0, // Half the marker size (15px).
        includeGeometry: true
    }, function (err, features) {
        console.log(features);
    })
});

map.on('mousemove', function (e) {
    map.featuresAt(e.point, {
        radius: 7.5, // Half the marker size (15px).
        layer: ['mountains']
    }, function (err, features) {
        map.getCanvas().style.cursor = (!err && features.length) ? 'pointer' : '';
    });
});