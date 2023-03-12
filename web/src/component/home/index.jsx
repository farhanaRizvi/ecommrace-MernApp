import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { GlobalContexts } from "../reducer/context";
import "./index.css";

const Home = () => {
  let { state, dispatch } = useContext(GlobalContexts);
  const [getproduct, setgetproduct] = useState([]);
  const [togllReload, settogllReload] = useState(true)
  console.log(state.cart);

  useEffect(() => {
    let getproduct = async () => {
      let response = await axios.get(`server-production-4f8d.up.railway.app/product`, {
        withCredentials: true,
      });

      setgetproduct(response.data.data.reverse());
    };
    getproduct();
  }, [togllReload]);

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
      // sessionStorage.setItem("cartItem", JSON.stringify(cartItem))
      // console.log(item._id);
    }
  };

  return (
    <div className="all_item_main">
      {getproduct.map((eachgetproduct) => (
        <div className="second_main" key={eachgetproduct._id}>
          <div className="image">
            <img src={eachgetproduct.file} alt="" className="image-main" />
          </div>

          <div className="name-discri-contanier">
            <div>{eachgetproduct.name}</div>
            <div> {eachgetproduct.discription}</div>
          </div>
          <div className="price-qty-contanier">
            <div>Rs : {eachgetproduct.price}</div>
            <div>Qty : {eachgetproduct.quantity}</div>
          </div>
          <div className="_btn">
            {state?.cart.some((p) => p._id === eachgetproduct._id) ? (
              <button
                className="btn_removeToCart"
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
                className="btn_addToCart"
                onClick={() => addToCard(eachgetproduct)}
              >
                Add to cart
              </button>
            )}

            <button className="Checkout">Checkout</button>
            {state.user.role === "admin" && (
              <button className='btn_style_del'
              type='submit' onClick={async () => {
                  try {
                      let deleted = await axios.delete(`${state.baseUrl}/product/${eachgetproduct?._id}`, {
                          withCredentials: true,
                      })

                      console.log("deleted: ", deleted.data);
                      settogllReload(!togllReload)
                  } catch (e) {
                      console.log("error in api call")
                      settogllReload(!togllReload)
                  }

              }} >Delete</button>
            )}
          </div>
        
        </div>
      ))}
    </div>
  );
};

export default Home;
