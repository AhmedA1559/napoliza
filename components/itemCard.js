import React, {Suspense, useState} from 'react'
import {Modal, Button, Checkbox, Label, Radio} from 'flowbite-react';
import {cartAdd} from "../store/cart/action";
import {useDispatch} from "react-redux";

export default function ItemCard(props) {
    let [state, setState] = useState({open: false, quantity: 1, size: 'medium'});
    let dispatch = useDispatch();

    const { name, price } = props.item;
    
    let image = `/pizza/${props.id}.jpg`;

    return (
        <>
            <button type="button" className="hover:shadow-lg" onClick={() => setState({...state, open: true})}>
                <div className="max-w-md rounded-xl shadow-md overflow-hidden md:max-w-2xl text-left">
                    <div className="md:flex">
                        <div className="md:shrink-0">
                            <img className="h-48 w-full md:h-full md:w-48 object-cover" src={image}/>
                        </div>
                        <div className="p-8">
                            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">SAR {price.medium}</div>
                            <div className="mt-1 text-lg leading-tight font-medium text-black hover:underline">{name}</div>
                            <p className="mt-2 text-slate-500">{"test"}</p>
                        </div>
                    </div>
                </div>
            </button>
            <Suspense fallback={<div></div>}>
                <Modal show={state.open} onClose={() => setState({...state, open: false})} size={'2xl'}>
                    <Modal.Header>{name}</Modal.Header>
                    <Modal.Body>
                        <div className="space-y-6 flex flex-col">
                            <div className="self-center">
                                <img className="h-48 w-full object-cover" src={image}/>
                            </div>
                            <div className="space-y-3">
                                <h1>Size</h1>
                                <div className='rounded-xl border-gray-200 bg-slate-100 p-3'>
                                    <fieldset id="radio-size" className='flex flex-col space-y-3' onChange={(e) => setState({...state, size: e.target.value})}>
                                        <ul className='flex flex-col space-y-3'>
                                            <li key='medium'>
                                                <Radio id='medium' name='sizes' value='medium' class='h-6 w-6 mr-3' defaultChecked={true}/>
                                                <Label forHtml='medium'>Medium</Label>
                                            </li>
                                            <li key='large'>
                                                <Radio id='large' name='sizes' value='large' class='h-6 w-6 mr-3'/>
                                                <Label forHtml='large'>Large <span className={'text-gray-300 text-sm'}>{(price.large-price.medium).toFixed(2)} SAR</span></Label>
                                            </li>
                                        </ul>
                                    </fieldset>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <h1>Toppings</h1>
                                <div className='rounded-xl border-gray-200 bg-slate-100 p-3'>
                                    <ul className='flex flex-col space-y-3'>
                                        {
                                            Object.entries(props.toppings).map(([key, topping]) =>
                                                <li key={key}>
                                                    <Checkbox id='checkbox' class='h-6 w-6 rounded mr-3'/>
                                                    <Label forHtml='checkbox'>{topping.name}</Label>
                                                </li>)
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={
                            () => {
                                dispatch(cartAdd({name: name, quantity: state.quantity, key: name, size: state.size}))
                            }
                        }>Add to cart <span className='ml-3 rounded bg-slate-200 text-black p-1'>SAR {(state.size === 'large' ? price.large : price.medium)*state.quantity}</span></Button>
                        <div className='text-black justify-center flex space-x-2 float-right'>
                            <Button className='' onClick={(_) => setState({...state, quantity: state.quantity+1})}>+</Button>
                            <div className='text-center m-auto px-3 w-10'>{state.quantity}</div>
                            <Button className='' onClick={(_) => { if(state.quantity > 1) {setState({...state, quantity: state.quantity-1})}}}>-</Button>
                        </div>
                    </Modal.Footer>
                </Modal>
            </Suspense>
        </>
    );
}
/**
const mapDispatchToProps = (dispatch) => {
    return cartAdd(dispatch);
}*/
/**
const mapDispatchToProps = (dispatch) => {
    return {
        cartAdd: bindActionCreators(cartAdd, dispatch),
    }
}

export default connect(null, mapDispatchToProps)(ItemCard)**/