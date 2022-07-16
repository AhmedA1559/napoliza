import {calculatePrice} from "../../utils/util";

export default async function handler(req, res) {
    // process Checkout.com frames payment from Client request with token
    // https://docs.checkout.com/docs/frames-api-reference

    // get token from request
    let buildReq = {
        source: {
            type: 'token',
            token: req.query.token
        },
        currency: 'SAR',
        amount: calculatePrice(req.query.order).toFixed(2)*100
    };

    // post payment
    try {
        const response = await fetch(
            process.env.NODE_ENV === 'production' ? 'https://api.checkout.com/payments' :
                'https://api.sandbox.checkout.com/payments',
            {
                method: 'POST',
                body: JSON.stringify(buildReq),
            }
        );

        if (response.status === 402) {
            throw new Error('Payment failed');
        } else if (response.status === 201) {
            const payment = await response.json();

            res.status(200).json({'accepted': payment.approved ?? false });
        }
    } catch (e) {
        res.status(500)
    }

}