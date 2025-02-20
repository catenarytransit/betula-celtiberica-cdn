const fs = require("fs");

fetch("https://birch.catenarymaps.org/getroutesofchateau/deutschland")
    .then((response) => response.json())
    .then((data) => {
        let results = data.filter((r) => r.agency_id === "254").map((x) => {return {route_id: x.route_id, short_name: x.short_name}}).sort((a, b) => a.route_id - b.route_id);

        fs.writeFile("dresden_routes.json", JSON.stringify(results, null, 2), (err) => {
            if (err) {
                console.error("Error writing file:", err);
            } else {
                console.log("dresden_routes.json successfully written!");
            }
        });
    })
    .catch((error) => {
        console.error("Fetch error:", error);
    });