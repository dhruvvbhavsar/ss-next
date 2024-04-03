import Razorpay from "razorpay";

var instance = new Razorpay({
  key_id: "rzp_live_iLX9jhEApOjzLr",
  key_secret: "w6lG8BfDdrFBIVf94tueMJhf",
});

export const GET = async () => {
    const order = await instance.orders.create({
      amount: 1 * 100,
      currency: "INR",
      receipt: "receipt#1",
      notes: {
        key1: "value3",
        key2: "value2",
      },
    });
  
    return new Response(JSON.stringify(order), { status: 200 });
  };
  
