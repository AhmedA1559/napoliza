import menu from "../public/menu.json"


export function calculatePrice(order) {
    if (order.length < 1) {
        return 0;
    }

    let totalAmount = 0;

    order.forEach(
        (item) => {
            let itemAmount = 0;
            itemAmount += menu.menu.pizza.items[item.key].price[item.size]

            item.toppings?.forEach((topping) => {
                itemAmount += menu.menu.pizza.toppings[topping].price
            });

            totalAmount += itemAmount * item.quantity
        }
    )

    return totalAmount;
}