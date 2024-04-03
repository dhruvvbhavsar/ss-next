import Razorpay from "razorpay";

var instance = new Razorpay({
  key_id: "rzp_live_DZANp3hV1W7DPq",
  key_secret: "uRokxKm6kWRalapGK1h8fIQI",
});

export const GET = async () => {
    const order = await instance.orders.create({
      amount: 10 * 100,
      currency: "INR",
      receipt: "receipt#1",
      notes: {
        key1: "value3",
        key2: "value2",
      },
    });
  
    return new Response(JSON.stringify(order), { status: 200 });
  };
  
