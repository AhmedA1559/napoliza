//import Footer from './footer'

import Navbar from "./navbar";

export default function Layout({ children }) {
    return (
        <>
            <Navbar />
            <main className='grid gap-8 md:grid-cols-2 p-20'>{children}</main>
        </>
    )
}