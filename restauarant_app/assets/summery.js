(async () => {
	await fetch("http://127.0.0.1:8000/order/most_famous/main_dish")
		.then((response) => response.json())
		.then((result) => {
			let data = result.result;
			document.getElementById("famous-main-text").textContent = `${data.name}`;
			document.getElementById(
				"famous-main-count"
			).textContent = `${data.total} dishes sold`;
		})
		.catch((error) => {
			console.error("Error:", error);
		});

	await fetch("http://127.0.0.1:8000/order/most_famous/side_dish")
		.then((response) => response.json())
		.then((result) => {
			let data = result.result;
			document.getElementById("famous-side-text").textContent = `${data.name}`;
			document.getElementById(
				"famous-side-count"
			).textContent = `${data.total} dishes sold`;
		})
		.catch((error) => {
			console.error("Error:", error);
		});
})();

const submitDate = async () => {
	let select_date = document.getElementById("date-select").value;
    console.log(select_date);
	if (String(select_date).length < 1) {
		alert("Please select a date");
	} else {
		await fetch("http://127.0.0.1:8000/order/ordersTable/", {
            method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
                date: select_date
            }),
		})
        .then((response) => response.json())
        .then((result) => {
            let table = document.getElementById("daily-reports");
            let head = "<thead><td>Order ID</td><td>name</td><td>price</td></thead>";
            let body = "";
            let total = 0;
            result.forEach(element => {
                body += `<tr><td>${element.fields.order_id}</td><td>${element.fields.name}</td><td>${element.fields.price}</td></tr>`
                total += element.fields.price;
            });

            table.innerHTML = body != "" ? `${head}<tbody>${body}</tbody>` : `${head}<tbody><tr><td>No records available</td><td></td><td></td></tr></tbody>`
            document.getElementById("total-price").innerHTML = `Total: Rs. <span>${total}</span>`;
        })
        .catch((error) => {
            console.error("Error:", error);
        });
	}
};
