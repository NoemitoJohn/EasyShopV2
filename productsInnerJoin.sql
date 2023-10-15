select products.id, products.name, products.price, products.stocks, products.rating, products_info.description, products_info.img_url, categories.name

from products 

inner join products_info 
on products.id = products_info.product_id

inner join categories
on categories.id = products_info.category_id  

where products.id = 1