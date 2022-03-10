import { useContext, React } from "react";
import PropTypes from "prop-types";
import "../App.css";
import OrderItemContext from "../contexts/OrdemItemContext";

const OrderItem = ({
  order,
  client,
  date,
  orderprice,
  cpf,
  email,
  orderitems,
}) => {

  const { orderItem, setOrderItem } = useContext(OrderItemContext);

  const openOrder = () => {
    setOrderItem(
      {order: order,
      client: client,
      date: date,
      orderprice: orderprice,
      cpf: cpf,
      email: email,
      orderitems: orderitems}
    )
  };

  return (
    <>
            <tr className="tr-hover" onClick={openOrder}>
              <td>{order}</td>
              <td>{client}</td>
              <td>{date}</td>
              <td>{orderprice}</td>
            </tr>
    </>
  );
};

OrderItem.propTypes = {
  order: PropTypes.number.isRequired,
  client: PropTypes.string.isRequired,
  date: PropTypes.string,
  orderprice: PropTypes.string.isRequired,
};

export default OrderItem;
