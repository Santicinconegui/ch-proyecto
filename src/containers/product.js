import fs from "fs";

class Product {
	constructor(nameFile) {
		this.nameFile = nameFile;
	}

	getAll() {
		const response = fs.readFileSync(`./src/${this.nameFile}`, "utf-8");
		if (response === "") {
			return this.assign(true);
		} else {
			return JSON.parse(response);
		}
	}

	get(id) {
		const data = this.getAll();
		if (id <= 0 || id > data.length) {
			return {
				error: `El producto con el id especificado no ha sido encontrado. Solo hay ${data.length} productos`,
			};
		}
		return data.find((element) => element.id === id);
	}

	save(product) {
		const data = this.getAll();
		product.id = data.length + 1;
		product.timestamp = Date.now();
		product.code = `${product.nombre}${product.timestamp}`;
		data.push(product);
		fs.writeFileSync(`./src/${this.nameFile}`, JSON.stringify(data));
		return {
			product: product,
		};
	}

	update(id, product) {
		const data = this.getAll();
		if (id <= 0 || id > data.length) {
			return {
				error: `El producto con el id especificado no ha sido encontrado. Solo hay ${data.length} productos.`,
			};
		} else {
			product.id = id;
			product.timestamp = Date.now();
			product.code = `${product.nombre}${product.timestamp}`;
			const previousProduct = data.splice(id - 1, 1, product);
			fs.writeFileSync(`./src/${this.nameFile}`, JSON.stringify(data));
			return {
				previous: previousProduct[0],
				new: product,
			};
		}
	}

	delete(id) {
		const data = this.getAll();
		if (id <= 0 || id > data.length) {
			return {
				error: `El producto con el id especificado no ha sido encontrado. Solo hay ${data.length} productos`,
			};
		} else {
			const previousProduct = data.splice(id - 1, 1);
			fs.writeFileSync(`./src/${this.nameFile}`, JSON.stringify(data));
			this.assign();
			return {
				deleted: previousProduct,
			};
		}
	}

	// Agrega id a los productos del archivo "products.json" si sufre alguna modificacion
	assign(empty = false) {
		if (empty) {
			let id = 1;
			listProducts.forEach((element) => {
				element.id = id++;
				element.timestamp = Date.now();
				element.code = `${element.nombre}${element.timestamp}`;
			});
			fs.writeFileSync(`./src/${this.nameFile}`, JSON.stringify(listProducts));
			return listProducts;
		} else {
			const data = this.getAll();
			let id = 1;
			data.forEach((element) => {
				element.id = id++;
			});
			fs.writeFileSync(`./src/${this.nameFile}`, JSON.stringify(data));
		}
	}
}
export default Product;

// Lista de productos por defecto
const listProducts = [
	{
		nombre: "Intel I5",
		precio: 22000,
		imagen:"https://mexx-img-2019.s3.amazonaws.com/tumb_37558_1.jpeg",
		stock: 5,
		descripcion: "Descripción del producto",
		id: 1,
	},
	{
		nombre: "Intel Core I7 10700F 4.8Ghz",
		precio: 45000,
		imagen:"https://mexx-img-2019.s3.amazonaws.com/tumb_39187_1.jpeg",
		stock: 2,
		descripcion: "Descripción del producto",
		id: 2,
	},
	{
		nombre: "Placa de video GeForce RTX 3060TI 8gb Asus",
		precio: 170000,
		imagen: "https://mexx-img-2019.s3.amazonaws.com/tumb_placa-video-rtx_41144_2.jpeg?v998",
		stock: 2,
		descripcion: "Descripción del producto",
		id: 3,
	},
	{
		nombre: "Amd Ryzen 5 3600",
		precio: 44000,
		imagen:"https://mexx-img-2019.s3.amazonaws.com/tumb_36329_2.jpeg",
		stock: 10,
		descripcion: "Descripción del producto",
		id: 4,
	},
	{
		nombre: "Amd Ryzen 7 5800X3D",
		precio: 100000,
		imagen: "https://mexx-img-2019.s3.amazonaws.com/tumb_procesador-amd-ryzen-5800x3d_42614_1.jpeg",
		stock: 1,
		descripcion: "Descripción del producto",
		id: 5,
	},
	{
		nombre: "Placa de video GeForce GTX 1650 4gb Asus",
		precio: 72000,
		imagen:"https://mexx-img-2019.s3.amazonaws.com/tumb_Placa-De-Video-GeForce-GTX-1650-4Gb-Asus-Dual-Oc-D6-MINI-CSM_43166_1.jpeg",
		stock: 6,
		descripcion: "Descripción del producto",
		id: 6,
	},
];