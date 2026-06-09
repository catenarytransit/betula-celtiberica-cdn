const fs = require("fs");

fetch("https://birch.catenarymaps.org/getchateaus")
    .then((response) => response.json())
    .then((data) => {
        let results = data;

        if (results && results.features) {
            results.features = results.features.map(feature => {
            if (feature.geometry && feature.geometry.type === 'MultiPolygon') {
                feature.geometry.coordinates = feature.geometry.coordinates.map(polygon =>
                polygon.map(ring =>
                
                     ring.map(coord =>
                            
                                
                                    [
                                        coord[0].toFixed(6),
                                        coord[1].toFixed(6),
                                    ]
                            
                        )
                
                )
                );
            }
            return feature;
            });
        }

        

        fs.writeFile("data/chateaus_simp.json", JSON.stringify(results), (err) => {
            if (err) {
                console.error("Error writing file:", err);
            } else {
                console.log("chateaus_simp.json successfully written!");
            }
        });
    })
    .catch((error) => {
        console.error("Fetch error:", error);
    });