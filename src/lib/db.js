// simple data store facility


export let PRODUCTS = [
{ id: 'p1', title: 'Wooden Chair', price: 1999, image: 'https://picsum.photos/seed/chair/600/400' },
{ id: 'p2', title: 'Study Desk', price: 4999, image: 'https://picsum.photos/seed/desk/600/400' },
{ id: 'p3', title: 'LED Lamp', price: 1299, image: 'https://picsum.photos/seed/lamp/600/400' },
];

export function getProducts() { return PRODUCTS; }
export function getProduct(id) { return PRODUCTS.find(p => p.id === id); }
export function addProduct(p) { PRODUCTS = [p, ...PRODUCTS]; return p; }