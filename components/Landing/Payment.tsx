"use client";
import { Button } from "@/components/ui/button";

// Interface for the global Window object to include Razorpay
declare global {
  interface Window {
    Razorpay: any;
  }
}

interface RazorpayOptions {
  key: string;
  amount: string;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  callback_url: string;
  prefill?: {
    name: string;
    email: string;
    contact: string;
  };
  theme: {
    color: string;
  };
}

// Function to load a script from a given URL
const loadScript = (src: string): Promise<boolean> => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

// Function to handle Razorpay payment process
const handleRazorpayPayment = async (
  name: string,
  mobile: string,
  email: string
) => {
  const scriptLoaded = await loadScript(
    "https://checkout.razorpay.com/v1/checkout.js"
  );

  if (!scriptLoaded) {
    console.error("Razorpay SDK failed to load. Are you online?");
    return;
  }

  try {
    // Create a new order
    const response = await fetch("/api/payment/order");

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const result = await response.json();

    // Extract order details
    const { amount, id: order_id, currency } = result;

    // Set up Razorpay options
    const options: RazorpayOptions = {
      key: "rzp_live_DZANp3hV1W7DPq",
      amount: amount.toString(),
      currency,
      name: "Shubh Sambandh",
      description: "Shubh Sambandh Premium Plan",
      order_id,
      callback_url: "/api/payment/success",
      theme: {
        color: "#7f1d1d",
      },
    };

    // Initialize Razorpay and open the payment form
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  } catch (error) {
    console.error("An error occurred during the payment process:", error);
  }
};

// QR component with a button to trigger the payment process
export const QR = ({
  name,
  mobile,
  email,
}: {
  name: string;
  mobile: string;
  email: string;
}) => {
  return (
    <Button onClick={() => handleRazorpayPayment(name, email, mobile)}>
      Pay
    </Button>
  );
};
