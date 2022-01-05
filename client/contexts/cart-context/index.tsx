import * as React from "react";

type Action = { type: "SET_CART"; payload: any };
type Dispatch = (action: Action) => void;
type State = {
  cart: any | undefined; // TODO fix type any after cart implementation
};
type CartProviderProps = { children: React.ReactNode };

const CartStateContext = React.createContext<{ state: State; dispatch: Dispatch } | undefined>(
  undefined
);

function cartReducer(state: State, action: Action) {
  switch (action.type) {
    case "SET_CART": {
      return { cart: action.payload };
    }

    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function CartProvider({ children }: CartProviderProps) {
  const [state, dispatch] = React.useReducer(cartReducer, { cart: undefined });

  // try to get initial cart internally
  // after that, we will use the cart from the server when available
  //   React.useEffect(() => {
  //     (async () => {
  //       if (state.cart === undefined) {
  //         const res = await captain.get(`${environment.apiUrl}/api/cart`);
  //         if (res.ok && res.data) {
  //           dispatch({ type: "SET_CART", payload: res.data });
  //         }
  //       }
  //     })();
  //   }, []);

  const value = { state, dispatch };

  return <CartStateContext.Provider value={value}>{children}</CartStateContext.Provider>;
}

function useCart() {
  const context = React.useContext(CartStateContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  const {
    state: { cart },
    dispatch,
  } = context;
  return { cart, dispatch };
}

export { CartProvider, useCart };
