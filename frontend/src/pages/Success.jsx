import { Button, Result } from "antd";
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartProvider";

const Success = () => {
  const { setCartItems } = useContext(CartContext);

  useEffect(() => {
    setCartItems([]);
  }, [setCartItems]);

  return (
    <div className="success-page">
      <div className="container">
        <Result
          status="success"
          title="Payment is Success!"
          subTitle="Sifarisiniz tamamlandi"
          extra={[
            <Link to={"/"} key="home">
              <Button type="primary">Home</Button>
            </Link>,
            <a href="/cart" key={"order"}>
              <Button key="buy">Cart</Button>
            </a>,
          ]}
        />
      </div>
    </div>
  );
};

export default Success;