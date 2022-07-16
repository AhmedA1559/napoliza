import {Button, Navbar as FlowbiteNavbar} from 'flowbite-react';
import {HiOutlineGlobe} from 'react-icons/hi';
import CheckoutModal from "./checkoutModal";

export default function Navbar() {
    return (<FlowbiteNavbar fluid={true} rounded={true} className='mb-1'>
        <FlowbiteNavbar.Brand>
            <img
                src="/logo.png"
                className="mr-3 h-6 sm:h-9"
                alt="Napoliza"
            />
            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          </span>
        </FlowbiteNavbar.Brand>
        <div>
            <Button>
                <HiOutlineGlobe className="mr-3"/>
                {'Arabic'}
            </Button>
        </div>
        <div className="flex md:order-2">
            <CheckoutModal/>
            <FlowbiteNavbar.Toggle/>
        </div>
    </FlowbiteNavbar>);
}