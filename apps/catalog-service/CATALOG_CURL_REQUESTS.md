# Catalog Service API Curl Requests

Use these curl commands to interact with the Catalog Service. 

## Public API
These endpoints are used by the storefront for browsing.

### 1. List Products
Retrieve a list of all active products. Optionally filter by category.

```bash
curl -X GET "http://localhost:3001/products"
```

**With Category Filter:**
```bash
curl -X GET "http://localhost:3001/products?category=electronics"
```

---

### 2. Get Product by SKU
Retrieve detailed information for a specific product using its SKU.

```bash
curl -X GET "http://localhost:3001/products/SKU123"
```

---

## Admin API
These endpoints are used for catalog management. In a production environment, these would be protected by admin roles via the API Gateway or internal headers.

### 3. List All Products (Admin)
Retrieve all products, including disabled ones.

```bash
curl -X GET "http://localhost:3001/admin/products"
```

---

### 4. Create Product
Add a new product to the catalog.

```bash
curl -X POST http://localhost:3001/admin/products \
     -H "Content-Type: application/json" \
     -d '{
       "name": "Wireless Mouse",
       "sku": "MOUSE-001",
       "description": "Ergonomic 2.4G wireless mouse",
       "price": 25.99,
       "category": "peripherals",
       "brand": "TechGear",
       "imageUrl": "http://example.com/mouse.jpg"
     }'
```

---

### 5. Disable Product
Hide a product from the public catalog.

```bash
curl -X PATCH http://localhost:3001/admin/products/<product_id>/disable
```

---

### 6. Enable Product
Make a disabled product visible again.

```bash
curl -X PATCH http://localhost:3001/admin/products/<product_id>/enable
```
