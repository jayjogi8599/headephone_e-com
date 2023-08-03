import { createContext, useState, useEffect } from "react";

export const Context = createContext();

const AppContext = ({ children }) => {
  const [categories, setCategories] = useState();
  const [products, setProducts] = useState();
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartSubTotal, setCartSubTotal] = useState(0);

  useEffect(() => {
    let subTotal = 0;
    cartItems.map((item) => (subTotal += item.price * item.quantity));
    setCartSubTotal(subTotal);
  }, [cartItems]);

 const handleAddToCart = (product, quantity) => {
  setCartItems((prevCartItems) => {
    const updatedCartItems = [...prevCartItems];
    const existingProductIndex = updatedCartItems.findIndex((p) => p.id === product.id);

    if (existingProductIndex !== -1) {
      updatedCartItems[existingProductIndex].quantity += quantity;
      updatedCartItems[existingProductIndex].totalPrice =
        updatedCartItems[existingProductIndex].price * updatedCartItems[existingProductIndex].quantity;
    } else {
      const newProduct = {
        ...product,
        quantity: quantity,
        totalPrice: product.price * quantity,
      };
      updatedCartItems.push(newProduct);
    }

    return updatedCartItems;
  });
};

  
  const handleRemoveFromCart = (product) => {
    let items = [...cartItems];
    items = items?.filter((p) => p.id !== product?.id);
    setCartItems(items);
  };
  const handleCartProductQuantity = (type, product) => {
    let items = [...cartItems];
    let index = items?.findIndex((p) => p.id === product?.id);
    if (type === "inc") {
      items[index].quantity += 1;
    } else if (type === "dec") {
      if (items[index].quantity === 1) return;
      items[index].quantity -= 1;
    }
    setCartItems(items);
  };
  return (
    <Context.Provider
      value={{
        products,
        setProducts,
        categories,
        setCategories,
        cartItems,
        setCartItems,
        handleAddToCart,
        cartCount,
        handleRemoveFromCart,
        showCart,
        setShowCart,
        handleCartProductQuantity,
        cartSubTotal,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default AppContext;
