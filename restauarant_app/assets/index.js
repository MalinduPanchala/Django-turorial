let dishes = [
	{
		id: 1,
		name: "Rice",
		type: "main_dish",
		price: 100,
	},
	{
		id: 2,
		name: "Rotty",
		type: "main_dish",
		price: 20,
	},
	{
		id: 3,
		name: "Noodles",
		type: "main_dish",
		price: 150,
	},
	{
		id: 4,
		name: "Wadai",
		type: "side_dish",
		price: 45,
	},
	{
		id: 5,
		name: "Dhal curry",
		type: "side_dish",
		price: 75,
	},
	{
		id: 6,
		name: "Fish curry",
		type: "side_dish",
		price: 120,
	},
	{
		id: 7,
		name: "Watalappam",
		type: "desserts",
		price: 40,
	},
	{
		id: 8,
		name: "jelly",
		type: "desserts",
		price: 20,
	},
	{
		id: 9,
		name: "Pudding",
		type: "desserts",
		price: 25,
	},
];

let side_dishes = [
	{
		id: 4,
		name: "Wadai",
		type: "side_dish",
		price: 45,
	},
	{
		id: 5,
		name: "Dhal curry",
		type: "side_dish",
		price: 75,
	},
	{
		id: 6,
		name: "Fish curry",
		type: "side_dish",
		price: 120,
	},
];

let desserts = [
	{
		id: 7,
		name: "Watalappam",
		type: "desserts",
		price: 40,
	},
	{
		id: 8,
		name: "jelly",
		type: "desserts",
		price: 20,
	},
	{
		id: 9,
		name: "Pudding",
		type: "desserts",
		price: 25,
	},
];

let side_dish_selection = [];
let dessert_selection = [];
let main_dish_selection = {};

const req_body = {
	main_dish: {
		id: 2,
		name: "Rotty",
		price: 100,
	},
	side_dishes: [
		{
			id: "3",
			name: "wadai",
			price: 45,
		},
		{
			id: "5",
			name: "Dhal curry",
			price: 75,
		},
	],
	desserts: [
		{
			id: "7",
			name: "Watalappam",
			price: 40,
		},
	],
};

const addSideDish = () => {
	let sideDishSelection = document.getElementById("side-dish-select").value;
	let selected = side_dishes.find((item) => item.id == sideDishSelection);
	side_dishes = side_dishes.filter((item) => item.id != selected.id);
	side_dish_selection.push(selected);

	let render = "";
	side_dish_selection.forEach((element) => {
		render += `<tr><td>${element.name}<td><td>${element.price}<td><tr>`;
	});

	let options = "";
	side_dishes.forEach((element) => {
		options += `<option value="${element.id}">${element.name}<option>`;
		console.log(options);
	});

	document.getElementById("side-dish-select").innerHTML = options;

	document.getElementById("show-side-dishes").innerHTML = render;

	updatePrice();
};

const addDesert = () => {
	let desertSelection = document.getElementById("dessert-dish-select").value;
	let selected = desserts.find((item) => item.id == desertSelection);
	desserts = desserts.filter((item) => item.id != selected.id);
	dessert_selection.push(selected);

	let render = "";
	dessert_selection.forEach((element) => {
		render += `<tr><td>${element.name}<td><td>${element.price}<td><tr>`;
	});

	let options = "";
	desserts.forEach((element) => {
		options += `<option value="${element.id}">${element.name}<option>`;
		console.log(options);
	});

	document.getElementById("dessert-dish-select").innerHTML = options;

	document.getElementById("show-desserts").innerHTML = render;

	updatePrice();
};

const handleMainDishChange = (value) => {
	document.getElementById("main-dish-select-price").textContent = dishes.find(
		(item) => item.id == value
	).price;
	main_dish_selection = dishes.find((item) => item.id == value);

	updatePrice();
};

const handleSideDishChange = (value) => {
	document.getElementById("side-dish-select-price").textContent = dishes.find(
		(item) => item.id == value
	).price;
};

const handleDessert = (value) => {
	if (value != "default") {
		let price = dishes.find((item) => item.id == value).price;
		document.getElementById("dessert-select").innerHTML = `Price: Rs. ${price}`;
	} else {
		document.getElementById("dessert-select").innerHTML = ``;
	}
};

const submitOrder = async () => {
	if (side_dish_selection.length < 1) {
		alert("You need to select atleast 1 side dish");
	} else {
		let request_body = {
			main_dish: {},
			side_dishes: [],
			desserts: [],
		};

		let main_dish_value = document.getElementById("main-dish-select").value;

		request_body.main_dish = dishes.find((item) => item.id == main_dish_value);

		side_dish_selection.forEach((item) => {
			request_body.side_dishes.push(item);
		});

		dessert_selection.forEach((item) => {
			request_body.desserts.push(item);
		});

		console.log(request_body);

		await fetch("http://127.0.0.1:8000/order/orders/", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(request_body),
		})
			.then((response) => response.json())
			.then((result) => {
				console.log("Success:", result);
				alert("Order placed succesfully");
				window.location.reload();
			})
			.catch((error) => {
				console.error("Error:", error);
			});
	}
};

const handleSubmit = async () => {
	await fetch("http://127.0.0.1:8000/order/orders/", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(req_body),
	})
		.then((response) => response.json())
		.then((result) => {
			console.log("Success:", result);
			alert("Order placed succesfully");
			window.location.reload();
		})
		.catch((error) => {
			console.error("Error:", error);
		});
};

const updatePrice = () => {
	let main_dish_value = document.getElementById("main-dish-select").value;

	let price = 0;
	price += dishes.find((item) => item.id == main_dish_value).price;

	side_dish_selection.forEach((item) => {
		price += item.price;
	});

	dessert_selection.forEach((item) => {
		price += item.price;
	});

	document.getElementById("total-price").textContent = price;
};

document.getElementById("main-dish-select");
