import {HiOutlineShoppingCart, HiOutlineTrash} from "react-icons/hi";
import {Button, Modal} from "flowbite-react";
import React, { Suspense, useState } from "react";
import { cartRemove, cartItem } from "../store/cart/action";
import {connect, useDispatch} from "react-redux";
import {calculatePrice} from "../utils/util";

function CheckoutModal({cart}) {
    const [open, setOpen] = useState(false)
    let dispatch = useDispatch();

    return (
        <>
            <Button onClick={() => setOpen(true)}>
                <HiOutlineShoppingCart className='mr-3'/>
                Buy now
            </Button>
            <Suspense fallback={<div></div>}>
                <Modal show={open} onClose={() => setOpen(false)}>
                    <Modal.Header>
                        Checkout
                    </Modal.Header>
                    <Modal.Body>
                        <ul className={'flex flex-col content-center bg-gray-200 p-5 space-y-10 rounded'}>
                            {cart.cart.map((item, index) => (
                            <li className={'flex md:flex-row flex-col md:items-center'} key={item.name}>
                                <img className="h-24 md:w-24 w-full object-cover rounded" src={`/pizza/${item.key}.jpg`} alt={item.name}/>
                                <div className={'md:pl-10 py-5 md:py-0'}>
                                    <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">SAR {calculatePrice([item]).toFixed(2)}</div>
                                    <div className="mt-1 text-lg leading-tight font-medium text-black">{item.key}</div>
                                    <div className="mt-1 text-sm leading-tight text-black md:w-20">
                                        {/*<ul>
                                            {
                                                ['Mozzarella', 'Chicken - دجاج', 'Olives - دجاج', 'Buffalo - بافلو', 'Potatoes Wedges - هالبينو', 'Jalapeno - هالبينو', 'Onion', 'Yellow Pepper']
                                                .map((topping, _) =>(
                                                    <li key={topping}>{topping}</li>
                                                ))}
                                        </ul>*/}
                                    </div>
                                </div>
                                {
                                <div className='flex-row flex mx-auto md:ml-auto'>
                                    <Button className='' onClick={(_) => dispatch(cartItem(index, {...item, quantity: item.quantity+1}))}>+</Button>
                                    <div className='text-center m-auto px-3 w-10'>{item.quantity}</div>
                                    <Button className='' onClick={(_) => { if (item.quantity > 1) dispatch(cartItem(index, {...item, quantity: item.quantity-1}))}}>-</Button>
                                </div>
                                }
                                <button onClick={(e) => dispatch(cartRemove(index))}>
                                    <HiOutlineTrash className={'ml-auto h-5 w-5'}/>
                                </button>
                            </li>))}
                        </ul>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => {console.log(cart);}}>Purchase <span className='ml-3 rounded bg-slate-200 text-black p-1'>SAR {calculatePrice(cart.cart).toFixed(2)}</span></Button>
                        <span className={'text-gray-300 text-sm'}>
                            VAT included
                        </span>
                    </Modal.Footer>
                </Modal>
            </Suspense>
        </>
    );
}


const mapStateToProps = (state) => ({
    cart: state,
})

export default connect(mapStateToProps, null)(CheckoutModal)