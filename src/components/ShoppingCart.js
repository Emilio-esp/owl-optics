import React from 'react';

import Cart from '../images/cart.svg'

const ShoppingCart = () => {
    return (
      <div className="flex items-center absolute top-14 sm:top-20 md:top-8 md:right-14 text-gray-900 font-medium text-sm tracking-widest">
        <img
          height="15"
          width="25"
          className="p-1"
          src={Cart}
          alt="shopping-cart"
        />
        My Bag (<span className="p-1 main-font text-gray-900">0</span>)
      </div>
    );
}

export default ShoppingCart
