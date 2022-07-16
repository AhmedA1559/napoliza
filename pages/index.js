import Layout from "../components/layout";
import ItemCard from "../components/itemCard";

function Home(menu) {
    return (
        <>
            <div className="">
                <Layout>
                    {
                        Object.entries(menu.pizza.items).map(
                            ([id, details]) =>
                                <ItemCard toppings={menu.pizza.toppings} item={details} key={id} id={id}/>
                        )
                    }
                </Layout>
            </div>
        </>
    );
}

export async function getStaticProps() {
    const menu = (await import(`../public/menu.json`)).menu;

    return { props: menu }
}

export default Home;