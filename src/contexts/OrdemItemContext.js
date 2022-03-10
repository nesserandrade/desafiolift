import { createContext, useState } from "react";

const OrderItemContext = createContext({});

export default OrderItemContext;

export const OrderItemProvider = ({ children }) => {
  const [orderItem, setOrderItem] = useState({});

  return (
    <OrderItemContext.Provider value={{ orderItem, setOrderItem }}>
      {children}
    </OrderItemContext.Provider>
  );
};
