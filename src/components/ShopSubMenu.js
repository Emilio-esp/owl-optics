import React from "react";
import SubMenu from "./SubMenu";

const subMenuRoutes = [
  {
    route: "Zwei",
    path: "/shop/zwei?color=midnight&type=sunglasses",
  },
  {
    route: "Vier",
    path: "/shop/vier?color=midnight&type=sunglasses",
  },
  {
    route: "Drei",
    path: "/shop/drei?color=midnight&type=sunglasses",
  },
  {
    route: "Funf",
    path: "/shop/funf?color=midnight&type=sunglasses",
  },
  {
    route: "Eins",
    path: "/shop/eins?color=midnight&type=sunglasses",
  },
];
const ShopSubMenu = () => {
    return (
        <SubMenu subMenuRoutes={subMenuRoutes} />
    )
}

export default ShopSubMenu
