import Razorpay from "razorpay";

var instance = new Razorpay({
  key_id: "rzp_test_tPwszSO5p3sAdk",
  key_secret: "Hj0eitCUdnwQNjW0xCipducA",
});

export const GET = async () => {
    const order = await instance.orders.create({
      amount: 500 * 100,
      currency: "INR",
      receipt: "receipt#1",
      notes: {
        key1: "value3",
        key2: "value2",
      },
    });
  
    return new Response(JSON.stringify(order), { status: 200 });
  };
  
