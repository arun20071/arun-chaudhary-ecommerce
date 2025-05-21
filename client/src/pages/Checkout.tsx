import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CreditCard, ShoppingBag, CheckCircle2 } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { formatCurrency } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";

const steps = ["Shipping", "Payment", "Review"];

export default function Checkout() {
  const [currentStep, setCurrentStep] = useState(0);
  const [, setLocation] = useLocation();
  const { cartItems, subtotal, clearCart } = useCart();
  const { toast } = useToast();
  
  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete order
      toast({
        title: "Order placed successfully!",
        description: "Thank you for your purchase. Your order will be shipped soon.",
      });
      clearCart();
      setLocation("/");
    }
  };
  
  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  if (cartItems.length === 0) {
    return (
      <>
        <Helmet>
          <title>Checkout - Arun Chaudhary</title>
          <meta name="description" content="Complete your purchase - secure checkout process" />
        </Helmet>
        
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="max-w-md mx-auto">
            <ShoppingBag className="h-16 w-16 mx-auto mb-6 text-gray-400 dark:text-gray-600" />
            <h1 className="text-2xl font-bold mb-4">Your Cart is Empty</h1>
            <p className="mb-6 text-gray-600 dark:text-gray-300">You need to add items to your cart before checkout.</p>
            <Link href="/">
              <Button size="lg" className="bg-primary hover:bg-blue-600 text-white">
                Browse Products
              </Button>
            </Link>
          </div>
        </div>
      </>
    );
  }
  
  return (
    <>
      <Helmet>
        <title>Checkout - Arun Chaudhary</title>
        <meta name="description" content="Complete your purchase safely and securely with our streamlined checkout process." />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-8 text-center">Checkout</h1>
        
        {/* Checkout Steps */}
        <div className="flex justify-center mb-10">
          <div className="flex items-center max-w-3xl w-full">
            {steps.map((step, index) => (
              <div key={step} className="flex-1 relative">
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center z-10 border-2 ${
                    index < currentStep ? 'bg-primary border-primary text-white' :
                    index === currentStep ? 'border-primary text-primary' :
                    'border-gray-300 dark:border-gray-600 text-gray-300 dark:text-gray-600'
                  }`}>
                    {index < currentStep ? (
                      <CheckCircle2 className="h-5 w-5" />
                    ) : (
                      index + 1
                    )}
                  </div>
                  <span className={`mt-2 text-sm ${
                    index <= currentStep ? 'text-gray-900 dark:text-gray-100' : 'text-gray-400 dark:text-gray-500'
                  }`}>
                    {step}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`absolute top-5 left-1/2 w-full h-0.5 ${
                    index < currentStep ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              {currentStep === 0 && (
                <ShippingForm />
              )}
              
              {currentStep === 1 && (
                <PaymentForm />
              )}
              
              {currentStep === 2 && (
                <OrderReview cartItems={cartItems} subtotal={subtotal} />
              )}
              
              <div className="flex justify-between mt-8">
                {currentStep > 0 ? (
                  <Button variant="outline" onClick={handlePreviousStep}>
                    Previous
                  </Button>
                ) : (
                  <Link href="/cart">
                    <Button variant="outline">
                      Back to Cart
                    </Button>
                  </Link>
                )}
                <Button onClick={handleNextStep} className="bg-primary hover:bg-blue-600 text-white">
                  {currentStep === steps.length - 1 ? "Place Order" : "Continue"}
                </Button>
              </div>
            </div>
          </div>
          
          <div>
            <OrderSummary cartItems={cartItems} subtotal={subtotal} />
          </div>
        </div>
      </div>
    </>
  );
}

function ShippingForm() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-xl font-semibold mb-6">Shipping Information</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <Label htmlFor="firstName">First Name</Label>
          <Input id="firstName" placeholder="John" />
        </div>
        <div>
          <Label htmlFor="lastName">Last Name</Label>
          <Input id="lastName" placeholder="Doe" />
        </div>
      </div>
      
      <div className="mb-4">
        <Label htmlFor="email">Email Address</Label>
        <Input id="email" type="email" placeholder="john.doe@example.com" />
      </div>
      
      <div className="mb-4">
        <Label htmlFor="address">Street Address</Label>
        <Input id="address" placeholder="123 Main St" />
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <Label htmlFor="city">City</Label>
          <Input id="city" placeholder="New York" />
        </div>
        <div>
          <Label htmlFor="state">State/Province</Label>
          <Input id="state" placeholder="NY" />
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <Label htmlFor="postalCode">Postal Code</Label>
          <Input id="postalCode" placeholder="10001" />
        </div>
        <div>
          <Label htmlFor="country">Country</Label>
          <Input id="country" placeholder="United States" />
        </div>
      </div>
      
      <div className="mb-4">
        <Label htmlFor="phone">Phone Number</Label>
        <Input id="phone" placeholder="(123) 456-7890" />
      </div>
    </motion.div>
  );
}

function PaymentForm() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-xl font-semibold mb-6">Payment Method</h2>
      
      <RadioGroup defaultValue="credit-card" className="mb-6">
        <div className="flex items-center space-x-2 mb-4 p-4 border rounded-lg dark:border-gray-700">
          <RadioGroupItem value="credit-card" id="credit-card" />
          <Label htmlFor="credit-card" className="flex items-center">
            <CreditCard className="mr-2 h-5 w-5" />
            Credit/Debit Card
          </Label>
        </div>
        
        <div className="flex items-center space-x-2 p-4 border rounded-lg dark:border-gray-700">
          <RadioGroupItem value="paypal" id="paypal" />
          <Label htmlFor="paypal" className="flex items-center">
            <span className="font-semibold text-blue-600 mr-2">Pay</span>
            <span className="font-semibold text-blue-800">Pal</span>
          </Label>
        </div>
      </RadioGroup>
      
      <div className="mb-4">
        <Label htmlFor="cardName">Name on Card</Label>
        <Input id="cardName" placeholder="John Doe" />
      </div>
      
      <div className="mb-4">
        <Label htmlFor="cardNumber">Card Number</Label>
        <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <Label htmlFor="expiration">Expiration (MM/YY)</Label>
          <Input id="expiration" placeholder="MM/YY" />
        </div>
        <div>
          <Label htmlFor="cvv">CVV</Label>
          <Input id="cvv" placeholder="123" />
        </div>
      </div>
    </motion.div>
  );
}

function OrderReview({ cartItems, subtotal }: { cartItems: any[], subtotal: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-xl font-semibold mb-6">Review Your Order</h2>
      
      <div className="mb-6">
        <h3 className="font-medium mb-3">Shipping Address</h3>
        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <p>John Doe</p>
          <p>123 Main St</p>
          <p>New York, NY 10001</p>
          <p>United States</p>
          <p>john.doe@example.com</p>
          <p>(123) 456-7890</p>
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="font-medium mb-3">Payment Method</h3>
        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg flex items-center">
          <CreditCard className="mr-2 h-5 w-5" />
          <span>Credit Card ending in 3456</span>
        </div>
      </div>
      
      <div>
        <h3 className="font-medium mb-3">Order Items</h3>
        {cartItems.map((item) => (
          <div key={item.id} className="flex items-center justify-between py-3 border-b dark:border-gray-700 last:border-0">
            <div className="flex items-center">
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-12 h-12 rounded object-cover mr-3" 
              />
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Qty: {item.quantity}</p>
              </div>
            </div>
            <span>{formatCurrency(item.price * item.quantity)}</span>
          </div>
        ))}
        
        <div className="mt-4">
          <div className="flex justify-between py-2">
            <span>Subtotal</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>
          <div className="flex justify-between py-2">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className="flex justify-between py-2">
            <span>Tax</span>
            <span>{formatCurrency(subtotal * 0.08)}</span>
          </div>
          <Separator className="my-2" />
          <div className="flex justify-between py-2 font-bold">
            <span>Total</span>
            <span>{formatCurrency(subtotal * 1.08)}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function OrderSummary({ cartItems, subtotal }: { cartItems: any[], subtotal: number }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 sticky top-20">
      <h2 className="text-xl font-bold mb-4">Order Summary</h2>
      
      <div className="max-h-80 overflow-y-auto mb-4">
        {cartItems.map((item) => (
          <div key={item.id} className="flex items-center justify-between py-3 border-b dark:border-gray-700 last:border-0">
            <div className="flex items-center">
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-10 h-10 rounded object-cover mr-3" 
              />
              <div>
                <p className="font-medium text-sm">{item.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Qty: {item.quantity}</p>
              </div>
            </div>
            <span className="text-sm">{formatCurrency(item.price * item.quantity)}</span>
          </div>
        ))}
      </div>
      
      <div className="space-y-2 mb-4">
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-300">Subtotal</span>
          <span className="font-medium">{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-300">Shipping</span>
          <span className="font-medium">Free</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-300">Tax</span>
          <span className="font-medium">{formatCurrency(subtotal * 0.08)}</span>
        </div>
        
        <Separator />
        
        <div className="flex justify-between">
          <span className="font-bold">Total</span>
          <span className="font-bold text-xl">{formatCurrency(subtotal * 1.08)}</span>
        </div>
      </div>
      
      <div className="text-center text-sm text-gray-500 dark:text-gray-400">
        <p>We accept:</p>
        <div className="flex justify-center space-x-2 mt-2">
          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">Visa</span>
          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">Mastercard</span>
          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">PayPal</span>
        </div>
      </div>
    </div>
  );
}
