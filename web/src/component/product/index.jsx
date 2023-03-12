import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { GlobalContexts } from "../reducer/context";
import { FcPlus } from "react-icons/fc";
import "./index.css";

const Addproduct = () => {
  let { state, dispatch } = useContext(GlobalContexts);
  const [getproduct, setgetproduct] = useState([]);
  const [editProduct, seteditProduct] = useState(null);
  const [addProduct, setaddProduct] = useState(null);
  const [togllReload, settogllReload] = useState(true);
  const [setLoading] = useState(true);

  // use effact for product randring

  useEffect(() => {
    let getproduct = async () => {
      let response = await axios.get(`${state.baseUrl}/product`, {
        withCredentials: true,
      });

      setgetproduct(response.data.data.reverse());
    };
    getproduct();
  }, [togllReload]);

  // product updatetion handler
  let updateHandler = async (e) => {
    e.preventDefault();

    try {
      let updated = await axios.put(
        `${state.baseUrl}/product/${editProduct?._id}`,

        {
          name: editProduct.name,
          price: editProduct.price,
          quantity: editProduct.quantity,
          // file: editProduct.file,
          discription: editProduct.discription,
        },
        {
          withCredentials: true,
        }
      );
      console.log("updated: ", updated.data);
      setLoading(false);
      settogllReload(!togllReload);
      seteditProduct(null);
    } catch (e) {
      console.log("Error in api call: ", e);
      setLoading(false);
    }
  };

  const addToCard = (item) => {
    item.count = 1;
    if (state.cart.some((a) => a._id === item._id)) {
      return;
    } else {
      const cartItem = [...state?.cart, item];
      dispatch({
        type: "addToCart",
        payload: cartItem,
      });
      localStorage.setItem("cartItem", JSON.stringify(cartItem));
      console.log(item._id);
    }
  };
  //formik validation
  const formik = useFormik({
    initialValues: {
      name: "",
      discription: "",
      price: "",
      photo: "",
      quantity: "",
      file: "",
    },
    validationSchema: yup.object({
      name: yup
        .string("enter your product name")
        .min(3, "product name is too short")
        .required("product name is required"),
      discription: yup.string("Enter your description"),
      price: yup
        .number("Enter a number")
        .moreThan(0, "price can not be zero")
        .required("price is required"),
      quantity: yup
        .string("quantity must be a string")
        .required("quantity is required"),
    }),

    //

    // add product code
    onSubmit: async (values) => {
      console.log(values);

      var file = document.getElementById("file");

      console.log("file : ", file.files[0]);

      let fromData = new FormData();
      fromData.append("name", formik.values.name); // this is how you add some text data along with file
      fromData.append("discription", formik.values.discription); // this is how you add some text data along with file
      fromData.append("price", formik.values.price); // this is how you add some text data along with file
      fromData.append("quantity", formik.values.quantity);
      fromData.append("createdBy", state?.user?._id); // this is how you add some text data along with file
      fromData.append("profilePicture", file.files[0]); //file input className='input-type' is for browser on

      axios({
        method: "post",
        url: `${state.baseUrl}/product`,
        data: fromData,
        headers: { "Content-Type": "multipart/from-data" },
        withCredentials: true,
      })
        .then((res) => {
          console.log(`upload success` + res.data);
          settogllReload(!togllReload);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });

  return (
    <>
      <button
        className="addmain"
        onClick={() => {
          setaddProduct(true);
        }}
      >
        <FcPlus className="addicon" />
      </button>
      {addProduct !== null ? (
        <div className="addp-main">
          <form onSubmit={formik.handleSubmit}>
            <label>Name</label>
            <br />
            <input
              className="input-type"
              id="name"
              name="name"
              placeholder="name"
              value={formik.values.name}
              onChange={formik.handleChange}
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="errorMessage">{formik.errors.name}</div>
            ) : null}

            <br />

            <label>Discription</label>
            <br />
            <input
              className="input-type"
              id="discription"
              name="discription"
              placeholder="Description"
              type="text"
              value={formik.values.discription}
              onChange={formik.handleChange}
            />
            {formik.touched.discription && formik.errors.discription ? (
              <div className="errorMessage">{formik.errors.discription}</div>
            ) : null}
            <br />

            <label>Price</label>
            <br />
            <input
              className="input-type"
              id="price"
              name="price"
              placeholder="Price"
              type="number"
              value={formik.values.price}
              onChange={formik.handleChange}
            />
            {formik.touched.price && formik.errors.price ? (
              <div className="errorMessage">{formik.errors.price}</div>
            ) : null}
            <br />

            <label>Quantity</label>
            <br />
            <input
              className="input-type"
              id="quantity"
              name="quantity"
              placeholder="Quantity"
              type="number"
              value={formik.values.quantity}
              onChange={formik.handleChange}
            />
            {formik.touched.quantity && formik.errors.quantity ? (
              <div className="errorMessage">{formik.errors.quantity}</div>
            ) : null}
            <br />

            <label>Product Picture</label>
            <br />
            <input
              className="input-type"
              id="file"
              name="file"
              placeholder="file"
              required
              accept="image/*"
              type="file"
              value={formik.values.file}
              onChange={formik.handleChange}
            />
            {formik.touched.file && formik.errors.file ? (
              <div className="errorMessage">{formik.errors.file}</div>
            ) : null}
            <br />
            <button type="submit">Submit</button>
          </form>
        </div>
      ) : null}

      <br />

      {editProduct !== null ? (
        <div>
          <h1>Edit product</h1>
          <form onSubmit={updateHandler}>
            Name:{" "}
            <input
              className="input-type"
              type="text"
              value={editProduct.name}
              onChange={(e) => {
                seteditProduct({ ...editProduct, name: e.target.value });
              }}
            />
            <br />
            <input
              className="input-type"
              type="text"
              value={editProduct.discription}
              onChange={(e) => {
                seteditProduct({ ...editProduct, discription: e.target.value });
              }}
            />
            <br />
            <input
              className="input-type"
              type="text"
              value={editProduct.price}
              onChange={(e) => {
                seteditProduct({ ...editProduct, price: e.target.value });
              }}
            />
            <br />
            <input
              className="input-type"
              type="text"
              value={editProduct.quantity}
              onChange={(e) => {
                seteditProduct({ ...editProduct, quantity: e.target.value });
              }}
            />
            <br />
            <button type="submit"> Proced Update</button>
          </form>

          <hr />
        </div>
      ) : null}

      <div className="all_item_main">
        {getproduct.map((eachgetproduct) => (
          <div className="second_main" key={eachgetproduct._id}>
            <div className="image">
              <img src={eachgetproduct.file} alt="" className="image-main" />
            </div>
            <div className="name-discri-contanier">
              <div>{eachgetproduct.name}</div>
              <div>{eachgetproduct.discription}</div>
            </div>
            <div className="price-qty-contanier">
              <div>Price: {eachgetproduct.price} </div>
              <div>qty: {eachgetproduct.quantity}</div>
            </div>

            {state?.user?._id === eachgetproduct.createdBy ? (
              <>
                <div className="_btn">
                  <button
                    className="btn_style_edi"
                    onClick={async () => {
                      seteditProduct({
                        _id: eachgetproduct._id,
                        name: eachgetproduct.name,
                        price: eachgetproduct.price,
                        quantity: eachgetproduct.quantity,
                        image: (
                          <img width={100} src={eachgetproduct.file} alt="" />
                        ),
                        discription: eachgetproduct.discription,
                      });
                    }}
                  >
                    Edit
                  </button>

                  <button
                    className="btn_style_del"
                    type="submit"
                    onClick={async () => {
                      try {
                        let deleted = await axios.delete(
                          `${state.baseUrl}/product/${eachgetproduct?._id}`,
                          {
                            withCredentials: true,
                          }
                        );

                        console.log("deleted: ", deleted.data);
                        settogllReload(!togllReload);
                      } catch (e) {
                        console.log("error in api call");
                        settogllReload(!togllReload);
                      }
                    }}
                  >
                    Delete
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="_btn">
                  {state?.cart.some((p) => p._id === eachgetproduct._id) ? (
                    <button
                      className="btn_style_del"
                      onClick={() => {
                        dispatch({
                          type: "removeToCart",
                          payload: eachgetproduct,
                        });
                      }}
                    >
                      Remove to cart
                    </button>
                  ) : (
                    <button
                      className="btn_style_edi"
                      onClick={() => addToCard(eachgetproduct)}
                    >
                      Add to cart
                    </button>
                  )}
                  <button
                    className="Checkout"
                    onClick={() => addToCard(eachgetproduct)}
                  >
                    Checkout
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default Addproduct;
