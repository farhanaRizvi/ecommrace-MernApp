export const reducer = (state, action) => {
  switch (action.type) {
    case "addToCart": {
      return { ...state, cart: action.payload }
  }
    case "removeToCart": {
      return { ...state, cart:state.cart.filter((c)=>c._id !==action.payload._id)  };
      
    }
    case "changeCartQty": {
      return { ...state, cart:state.cart.filter(c=>c._id === action.payload._id?c.quantity=action.payload.quantity:c.quantity)  };
    }
    
    case "USER_LOGIN": {
      return { ...state, user: action.payload, isLogin: true };
    }
    case "USER_LOGOUT": {
      return { ...state, user: null, isLogin: false };
    }


    case "CHANGE_THEME": {
      return { ...state, darkTheme: !state.darkTheme };
    }




    
    default: {
      return state;
    }
  }
};
