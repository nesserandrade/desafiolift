import { React, useState, useEffect, useContext } from "react";
import "../App.css";
import OrderItem from "../components/OrderItem";
import OrderItemContext from "../contexts/OrdemItemContext";
import OrderInfo from "../components/OrderInfo";

const Home = () => {
  async function handleGetData() {
    const result = await fetch("https://sistemalift1.com/lift_ps/api/Pedidos/");
    const pedidos = await result.json();

    const pedidosWithItens = pedidos.map(async (item) => {
      const items = await fetch(
        `https://sistemalift1.com/lift_ps/api/ItensPedido/${item.id}`
      );
      const jsonItems = await items.json();

      const produtosPedido = jsonItems.map(async (item) => {
        const produto = await fetch(
          `https://sistemalift1.com/lift_ps/api/Produtos/${item.produto}`
        );
        const jsonProduct = await produto.json();

        return {
          ...item,
          produto: jsonProduct,
        };
      });

      const cliente = await fetch(
        `https://sistemalift1.com/lift_ps/api/Clientes/${item.cliente}`
      );
      const jsonClient = await cliente.json();

      return {
        ...item,
        items: await Promise.all(produtosPedido),
        cliente: jsonClient,
      };
    });

    setData(await Promise.all(pedidosWithItens));
  }

  const [data, setData] = useState([]);
  const { orderItem } = useContext(OrderItemContext);

  console.log(data);

  useEffect(() => {
    handleGetData();
  }, []);

  useEffect(() => {
    console.log(orderItem);
  }, [orderItem]);

  const handleCalcValue = (items) => {
    const total = items.reduce((acc, currentElement) => {
      return acc + currentElement.produto.valor * currentElement.quantidade;
    }, 0);

    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(total);
  };

  return (
    <>
      <div className="table-container">
      <table className="table-list">
        <thead>
          <tr>
            <td colSpan={4} className="list-title">Lista de pedidos</td>
          </tr>
          <tr>
            <th>Pedido</th>
            <th>Cliente</th>
            <th>Data</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <OrderItem
              key={item.id}
              order={item.id}
              client={item.cliente.nome}
              date={item.data}
              orderprice={handleCalcValue(item.items)}
              cpf={item.cliente.cpf}
              email={item.cliente.email}
              orderitems={item.items}
            />
          ))}
        </tbody>
      </table>
      {Object.keys(orderItem).length !== 0 && <OrderInfo />}
      </div>
    </>
  );
};

export default Home;
