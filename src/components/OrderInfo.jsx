import { useContext, React } from "react";
import "../App.css";
import OrderItemContext from "../contexts/OrdemItemContext";

const OrderInfo = () => {
  const { orderItem } = useContext(OrderItemContext);

  return (
    <>
      <table className="table-info">
        <thead>
          <tr className="info-title">
            <th colSpan={3}>Informações do pedido</th>
            <th>id pedido: {orderItem.order}</th>
          </tr>
          <tr>
            <th colSpan={4}>Dados do cliente</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Nome: {orderItem.client}</td>
            <td>CPF: {orderItem.cpf}</td>
            <td>Data do pedido: {orderItem.date}</td>
            <td>Email: {orderItem.email}</td>
          </tr>
          <tr className="info-title">
            <th colSpan={4}>Itens do pedido</th>
          </tr>
          <tr className="item-list">
            <th>Código</th>
            <th>Produto</th>
            <th>Quantidade</th>
            <th>Valor</th>
          </tr>
          {orderItem.orderitems.map((item) => (
            <tr>
            <td>{item.produto.id}</td>
            <td>{item.produto.nome}</td>
            <td>{item.quantidade}</td>
            <td>{new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(item.produto.valor * item.quantidade)}</td>
          </tr>
          ))}
        </tbody>
        <tfoot>
        <tr className="info-title">
            <th colSpan={3}>Total</th>
            <th>{orderItem.orderprice}</th>
          </tr>
        </tfoot>
      </table>
    </>
  );
};

export default OrderInfo;
