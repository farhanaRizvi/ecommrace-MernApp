import React from 'react'
import { Link } from "react-router-dom";
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { useContext } from 'react';
import { GlobalContexts } from '../reducer/context';
import { GrAddCircle } from 'react-icons/gr'
import { BiMinusCircle } from 'react-icons/bi'
import { MdDelete } from 'react-icons/md'
import './index.css'



const Cart = () => {
  let { state, dispatch } = useContext(GlobalContexts);

  const total = state.cart.reduce((acc, curr) => acc + Number(curr.price) * curr.count, 0);
  const increment = (item) => {
    console.log("item", item)

    const updateValue = state.cart.map(obj => {
      if (obj._id === item._id) {
        return { ...obj, count: obj.count + 1 }
      }
      return obj

    })
    dispatch({
      type: "addToCart",
      payload: updateValue,
    });
    console.log(updateValue, 'updateValue');
  };

  const Decrement = (item) => {

    if (item.count === 1) {
      return;
    }
    const updateValues = state.cart.map(obj => {
      if (obj._id === item._id) {
        return { ...obj, count: obj.count - 1 }

      }
      console.log(obj, 'obj');

      return obj

    })
    dispatch({
      type: "addToCart",
      payload: updateValues,
    });
  }



  return (
    <>

      <div className='main-div'>
        <header className='header' >
          <Link to="/"><AiOutlineArrowLeft size={45} /></Link>
          <h1>Continue Shopping</h1>
        </header>
        <div className='main-contanier'>
          <div >

            {state?.cart?.map((prod) => (

              <div key={prod._id}  >
                <div className='main-contanier1'>
                  <div><img width={200} src={prod.file} alt='' className='image-main' /></div>
                  <div>
                    <div className='name-discri-contanier'>
                      <div>Name : {prod.name}</div>
                      <div>Discription : {prod.discription}</div>
                    </div>
                    <div className='price-qty-contanier'>
                      <div>Rs : {prod.price}</div>
                    </div>
                  </div>
                  <div className='btn-update'>
                    <button className='btn-updatemain' onClick={() => increment(prod)}><GrAddCircle /></button>
                    <input className='count' type="text" value={prod.count}/>
                    <button className='btn-updatemain' onClick={() => Decrement(prod)}><BiMinusCircle /></button>
                  </div>

                  <div> <button className='del-btn'

                    onClick={() => {
                      dispatch({
                        type: "removeToCart",
                        payload: prod
                      })
                    }}><MdDelete width={100} /></button></div>
                </div>
              </div>

            )

            )}
          </div>
          <div className='amount'>
            <div >Sub Total{total}</div>
            <br />
            <div>Total {total}</div>
            <br />

{(state.isLogin === true) ?  <Link to="/PaymentForm">
              <button disabled={state.cart.length === 0} className='chackout-btn'>Checkout</button>
            </Link> :
             <Link to="/Login">
             <button disabled={state.cart.length === 0} className='chackout-btn'>Checkout</button>
           </Link>}

           
          </div>
         
        </div >


      </div>

    </>
  )
}

export default Cart





