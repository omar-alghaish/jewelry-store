/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Select, Input, Button, message } from "antd";
import { toast } from "react-toastify";
import "./style/main.css";
import levelup from "levelup";
import leveljs from "level-js";
import { getCurrentDate } from "../../functions/uniqeId";

const { Option } = Select;

const db = levelup(leveljs("./db"));

const ProductRecalls = () => {
  const [stores, setStores] = useState([]);
  const [selectedStore, setSelectedStore] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [product, setProduct] = useState({});
  const [products, setProducts] = useState([]);
  const [image, setImage] = useState();
  const [productRecallsBills, setProductRecallsBills] = useState([]);

  const handleGetAllStores = () => {
    db.get("stores", function (err, value) {
      setStores(value ? JSON.parse(value) : []);
    });
  };

  useEffect(() => {
    db.get("stores", function (err, value) {
      setStores(value ? JSON.parse(value) : []);
    });
    db.get("products", function (err, value) {
      setProducts(value ? JSON.parse(value) : []);
    });
    db.get("productRecallsBills", function (err, value) {
      setProductRecallsBills(value ? JSON.parse(value) : []);
    });
  }, []);
  console.log(products);
  const handleChange = (value) => {
    setSelectedStore(value);
    const theProduct = stores.filter((item) => item.id === +value);
    setProduct(theProduct[0]);
    setImage(theProduct[0].image);
    message.info(`Selected Store: ${value}`);
  };

  const handleQuantityChange = (e) => {
    setQuantity(parseInt(e.target.value, 10) || 0);
  };

  const handleUpdateStores = () => {
    if (selectedStore !== null) {
      const updatedStores = stores.map((store) => {
        if (store.id === selectedStore) {
          const updatedQuantity = Math.max(0, store.quantity - quantity);
          handleGetAllStores();

          setProduct((prev) => ({ ...prev, quantity: updatedQuantity }));
          return { ...store, quantity: updatedQuantity, image };
        }
        return store;
      });

      db.put("stores", JSON.stringify(updatedStores), function (err) {
        if (err) {
          console.error("Error updating stores:", err);
          toast.error("حدث خطأ");
        } else {
          setStores(updatedStores);
          message.success("تم سحب المنتج من المخزن بنجاح");
        }
      });

      const updatedProducts = products.map((item) => {
        console.log(item.product_name === product.productName);
        console.log(product);
        if (item.product_name === product.productName) {
          return {
            ...item,
            quantity: +item.quantity + +quantity,
            stock: +product.quantity,
            image,
          };
        }
        return item;
      });

      const productExists = products.some(
        (item) => item.product_name === product.productName
      );

      // console.log(productExists)

      if (!productExists) {
        const newProduct = {
          caliber_name: product.caliber,
          caliber: product.caliberPrice,
          price: product.itemPrice,
          product_name: product.productName,
          category: product.category,
          weight: product.weight,
          quantity: +quantity,
          stock: +product.quantity,
          id: products.length + 1,
          image,
        };

        updatedProducts.push(newProduct);
      }

      db.put("products", JSON.stringify(updatedProducts), function (err) {
        if (err) {
          toast.error("حدث خطأ");
        } else {
          setProducts(updatedProducts);
          message.success("تم اضافة المنتج قائمة المنتجات");
        }
      });

      const updatedProductsRecallsBills = [
        ...productRecallsBills,
        {
          ...product,
          quantity,
          documentDate: getCurrentDate(),
          total: quantity * product.itemPrice,
          id: productRecallsBills.length + 1,
          image,
        },
      ];
      db.put(
        "productRecallsBills",
        JSON.stringify(updatedProductsRecallsBills),
        function (err) {
          if (err) {
            // toast.error("حدث خطأ");
          } else {
            setProductRecallsBills(updatedProductsRecallsBills);
          }
        }
      );
    }
  };

  console.log(product);

  useEffect(() => {
    console.log(product);
  }, []);

  return (
    <div className="page-wrapper">
      <div className="content">
        <h3>سحب منتج من المخزن</h3>
        <div className="inputs">
          <div className="form-group full-width">
            <label htmlFor="">المنتج</label>
            <Select
              showSearch
              style={{ width: "100%" }}
              placeholder="اختر منتج"
              optionFilterProp="children"
              onChange={handleChange}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {stores?.map((store) => (
                <Option
                  key={store.id}
                  value={store.id}
                  style={{ height: "40px" }}
                >
                  {store.productName}
                </Option>
              ))}
            </Select>
          </div>
          <div className="form-group full-width">
            <label htmlFor="">الكميه المتاحه</label>
            <input
              style={{ width: "100%" }}
              type="text"
              value={product?.quantity}
              placeholder="الكميه المتاحه"
              disabled
            />
          </div>
          <div className="form-group full-width">
            <label htmlFor="">الفئه</label>
            <input
              style={{ width: "100%" }}
              type="text"
              value={product?.category}
              placeholder="الفئه"
              disabled
            />
          </div>
          <div className="form-group full-width">
            <label htmlFor="">العيار</label>
            <input
              style={{ width: "100%" }}
              type="text"
              placeholder="العيار"
              value={product?.caliber}
              disabled
            />
          </div>
          <div className="form-group full-width">
            <label htmlFor="">سعر الوحده</label>
            <input
              style={{ width: "100%" }}
              type="text"
              placeholder="سعر الوحده"
              value={product?.itemPrice}
              disabled
            />
          </div>
          <div className="form-group full-width">
            <label htmlFor="">وزن الوحده</label>
            <input
              style={{ width: "100%" }}
              type="text"
              placeholder="وزن الوحده"
              value={product?.weight}
              disabled
            />
          </div>
          <div className="form-group full-width">
            <label htmlFor="">الكميه المراد سحبها</label>
            <input
              style={{ width: "100%" }}
              type="number"
              placeholder="الكميه المسحوبه"
              onChange={handleQuantityChange}
            />
          </div>
          <button className="btn btn-submit me-2" onClick={handleUpdateStores}>
            سحب
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductRecalls;
