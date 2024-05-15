Get list of products:

```sh
curl -XPOST -H"Content-Type: application/json" localhost:8080/products -d'{"keyword": "Samsung", "page_size": 5, "page_number": 0}'
```

Get product by its id:

```sh
curl -XGET localhost:8080/product/2
```

Admin account credentials:
- username: `admin`
- password: `admin`

Add product (require admin privileges):

```sh
curl -XPOST -H"Content-Type: application/json" -H"Authorization: Bearer ey...Fg" localhost:8080/product -d'{
"title": "New Title",
"description": "New Description",
"images": ["https://example.com/test.png"],
"brand": "New Brand",
"category": "New Category",
"price": "123.45",
"amount": "1"
}'
```

Change product (require admin privileges):

```sh
curl -XPUT -H"Content-Type: application/json" -H"Authorization: Bearer ey...Fg" localhost:8080/product/2 -d'{
"id": "2",
"title": "Sony X75H 139cm (55 inch) 4K UHD LED Android Smart TV (55X7500H, Black) ",
"description": "Test Description",
"images": [
	"https://media.croma.com/image/upload/f_auto,q_auto,d_Croma%20Assets:no-product-image.jpg,h_260,w_260/v1605339021/Croma%20Assets/Entertainment/Television/Images/8942482620446.png"
],
"brand": "Sony",
"category": "Televisions \u0026 Accessories",
"price": "2092.19",
"rating": "0",
"amount": "1"
}'
```

Delete product (require admin privileges):

```sh
curl -XDELETE -H"Authorization: Bearer ey...Fg" localhost:8080/product/2
```

Register new user:

```sh
curl -XPOST -H"Content-Type: application/json" localhost:8080/register -d'{
    "firstName": "Vladimir",
    "lastName": "Kopaliani",
    "phoneNumber": "+995599000000",
    "email": "kopaliani@example.com",
    "password": "1234"
}'
```

Login with email:

```sh
curl -XPOST -H"Content-Type: application/json" localhost:8080/login -d'{
	"email": "kopaliani@example.com",
	"password": "1234"
}'
```

Get info about your user (required token in Authorization header):

```sh
curl -H"Authorization: Bearer ey...Fg" localhost:8080/me
```

Change user info (required token in Authorization header):

```sh
curl -XPOST -H"Content-Type: application/json" -H"Authorization: Bearer ey...Fg" localhost:8080/user -d'{
    "firstName": "Vladimeri",
    "lastName": "Kopaliani",
    "phoneNumber": "+995599000001",
    "email": "kopaliani@example.com"
}'
```

Get list of all brands:

```sh
curl -XGET localhost:8080/brands
```