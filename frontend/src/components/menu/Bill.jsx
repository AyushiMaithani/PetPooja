import { useState } from "react";
import { getTotalPrice } from "../../redux/slices/cartSlice";
import { useSelector } from "react-redux";
import { createOrderRazorpay,verifyPaymentRazorpay} from "../../https";
import { enqueueSnackbar } from "notistack";


function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}


const Bill = () => {

  const customerData = useSelector((state) => state.customer);
  const cartData = useSelector((state) => state.cart);
  const total=useSelector(getTotalPrice);
  const taxRate=5.25;
  const tax=(total*taxRate)/100;
  const totalPriceWithTax=total+tax;

  const [paymentMethod, setPaymentMethod] = useState();
  
  const handlePlaceOrder = async () => {
    if (!paymentMethod) {
      enqueueSnackbar("Please select your payment method!", {
        variant: "warning",
      });
      return;
    }

    
    try {
      //load razorpay script
      const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
      );

      if (!res) {
        enqueueSnackbar("Razorpay SDK failed to load. Are you online?", {
          variant: "warning",
        });
        return;
      }

      //create order
      const reqData = {
        amount: totalPriceWithTax.toFixed(2),
        currency: "INR",
      };

      const { data } = await createOrderRazorpay(reqData);


      const options = {
        key: `${import.meta.env.VITE_RAZORPAY_KEY_ID}`,
        amount: data.order.amount,
        currency: data.order.currency,
        name: "PETPOOJA",
        description: "Secure Payment for Your Meal",
        order_id: data.order.id,
        handler: async function (response) {
          const verification = await verifyPaymentRazorpay(response);
          console.log(verification);
          enqueueSnackbar(verification.data.message, { variant: "success" });
        },
        prefill: {
          name:customerData.customerName,
          email:customerData.customerEmail,
          contact:+91+customerData.customerPhone,
        },
        theme: { color: "#025cca" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.log(error);
      enqueueSnackbar("Payment Failed!", { variant: "error" });
    }
  };


  return (
    <>
      <div className="flex items-center justify-between px-5 mt-2">
        <p className="text-xs text-[#ababab] font-medium mt-2">Items ({cartData.length})</p>
        <h1 className="text-[#f5f5f5] text-md font-bold">₹{total}</h1>
      </div>
      <div className="flex items-center justify-between px-5 mt-2">
        <p className="text-xs text-[#ababab] font-medium mt-2">Tax({taxRate})%</p>
        <h1 className="text-[#f5f5f5] text-md font-bold">{tax}</h1>
      </div>
      <div className="flex items-center justify-between px-5 mt-2">
        <p className="text-xs text-[#ababab] font-medium mt-2">Total With Tax</p>
        <h1 className="text-[#f5f5f5] text-md font-bold">{totalPriceWithTax}</h1>
      </div>
      <div className="flex gap-3 px-5 mt-4">
        <button 
        onClick={()=>setPaymentMethod("Cash")} 
        className={`bg-[#1f1f1f] px-4 py-3 w-full rounded-lg text-[#ababab] font-semibold cursor-pointer
          ${ paymentMethod === "Cash" ? "bg-[#383737]" : ""}`
          }>
          Cash
        </button>
        <button 
        onClick={()=>setPaymentMethod("Online")}    
        className={`bg-[#1f1f1f] px-4 py-3 w-full rounded-lg text-[#ababab] font-semibold cursor-pointer
        ${ paymentMethod === "Online" ? "bg-[#383737]" : ""}`
        }>
          Online
        </button>
      </div>
      <div className="flex items-center gap-3 px-5 mt-4">
        <button className="bg-[#025cca] px-4 py-3 w-full rounded-lg text-[#f5f5f5] font-semibold text-lg">
          Print Receipt
        </button>
        <button
          onClick={handlePlaceOrder}
         className="bg-[#f6b100] px-4 py-3 w-full rounded-lg text-[#1f1f1f] font-semibold text-lg cursor-pointer">
          Place Order
        </button>
      </div>
    </>
  );
};

export default Bill;
