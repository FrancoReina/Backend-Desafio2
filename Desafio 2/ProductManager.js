const fs = require('fs');

class ProductManager {
  constructor(filePath) {
    this.path = filePath;
  }

  addProduct(product) {
    const products = this.getProducts();
    const newProduct = {
      id: products.length + 1,
      title: product.title,
      description: product.description,
      price: product.price,
      thumbnail: product.thumbnail,
      code: product.code,
      stock: product.stock,
    };
    products.push(newProduct);
    this.saveProducts(products);
  }

  getProducts() {
    try {
      const fileData = fs.readFileSync(this.path, 'utf8');
      return JSON.parse(fileData);
    } catch (error) {
      return [];
    }
  }

  getProductById(id) {
    const products = this.getProducts();
    const product = products.find((product) => product.id === id);
    return product ? product : null;
  }

  updateProduct(id, updatedFields) {
    const products = this.getProducts();
    const index = products.findIndex((product) => product.id === id);
    if (index !== -1) {
      products[index] = { ...products[index], ...updatedFields };
      this.saveProducts(products);
    }
  }

  deleteProduct(id) {
    const products = this.getProducts();
    const filteredProducts = products.filter((product) => product.id !== id);
    this.saveProducts(filteredProducts);
  }

  saveProducts(products) {
    fs.writeFileSync(this.path, JSON.stringify(products), 'utf8');
  }
}

const manager = new ProductManager('productos.json');

const Cocacola = {
  title: 'CocaCola',
  description: 'Bebida Cocacola 2,25 lt',
  price: 500,
  thumbnail: 'descargas/coca.jpg',
  code: '1000',
  stock: 100,
};

manager.addProduct(Cocacola);

const Pepsi = {
  title: 'Pepsi',
  description: 'Bebida Pepsi 2,25 lt',
  price: 450,
  thumbnail: 'descargas/Pepsi.jpg',
  code: '1001',
  stock: 100,
};

manager.addProduct(Pepsi);

const products = manager.getProducts();
console.log(products);

const MostrarProductos = manager.getProductById(2);
console.log(MostrarProductos);

manager.updateProduct(1, { price: 550, stock: 200 });

manager.deleteProduct(2);
