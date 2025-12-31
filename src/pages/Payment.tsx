import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { useNavigate, useLocation } from "react-router-dom";
import { Loader2, CreditCard, Smartphone, Wallet, Building2, Shield, Lock, CheckCircle2 } from "lucide-react";
import { saveOrder, Order } from "@/data/store";

const Payment = () => {
  const { cart, totalItems, totalPrice, clearCart } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const customerInfo = location.state as { name: string; email: string } | null;

  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardDetails, setCardDetails] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  });
  const [upiId, setUpiId] = useState("");
  const [selectedWallet, setSelectedWallet] = useState("");
  const [selectedBank, setSelectedBank] = useState("");

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.length ? parts.join(" ") : value;
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4);
    }
    return v;
  };

  const handlePayment = async () => {
    if (!customerInfo) {
      navigate("/checkout");
      return;
    }

    setLoading(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2500));

    try {
      const order: Order = {
        id: crypto.randomUUID(),
        customerName: customerInfo.name,
        customerEmail: customerInfo.email,
        total: totalPrice,
        status: "confirmed",
        createdAt: new Date(),
        items: cart.map((item) => ({
          productId: item.id,
          productName: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
      };

      saveOrder(order);

      toast({
        title: "Payment Successful! 🎉",
        description: `Order #${order.id.slice(0, 8)} confirmed. Thank you for shopping!`,
      });

      clearCart();
      navigate("/order-success", { state: { orderId: order.id } });
    } catch (error) {
      toast({
        title: "Payment Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!customerInfo || cart.length === 0) {
    navigate("/checkout");
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <Navbar cartItemsCount={totalItems} />
      <div className="container mx-auto px-4 py-8">
        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center gap-2 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              <span className="text-muted-foreground">Cart</span>
            </div>
            <div className="w-8 h-px bg-green-500" />
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              <span className="text-muted-foreground">Address</span>
            </div>
            <div className="w-8 h-px bg-primary" />
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold">3</div>
              <span className="font-semibold text-foreground">Payment</span>
            </div>
          </div>
        </div>

        <h1 className="text-3xl font-bold mb-6 text-center">Payment Options</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* Payment Methods */}
          <div className="lg:col-span-2 space-y-4">
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
              {/* Credit/Debit Card */}
              <Card className={`cursor-pointer transition-all ${paymentMethod === "card" ? "ring-2 ring-primary" : ""}`}>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer flex-1">
                      <CreditCard className="w-5 h-5 text-primary" />
                      <span className="font-semibold">Credit / Debit Card</span>
                    </Label>
                    <div className="flex gap-2">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/100px-Visa_Inc._logo.svg.png" alt="Visa" className="h-5 object-contain" />
                      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/100px-Mastercard-logo.svg.png" alt="Mastercard" className="h-5 object-contain" />
                    </div>
                  </div>
                </CardHeader>
                {paymentMethod === "card" && (
                  <CardContent className="pt-0 space-y-4">
                    <div>
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={cardDetails.number}
                        onChange={(e) => setCardDetails({ ...cardDetails, number: formatCardNumber(e.target.value) })}
                        maxLength={19}
                      />
                    </div>
                    <div>
                      <Label htmlFor="cardName">Name on Card</Label>
                      <Input
                        id="cardName"
                        placeholder="John Doe"
                        value={cardDetails.name}
                        onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input
                          id="expiry"
                          placeholder="MM/YY"
                          value={cardDetails.expiry}
                          onChange={(e) => setCardDetails({ ...cardDetails, expiry: formatExpiry(e.target.value) })}
                          maxLength={5}
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          type="password"
                          placeholder="***"
                          value={cardDetails.cvv}
                          onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value.replace(/\D/g, "") })}
                          maxLength={4}
                        />
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>

              {/* UPI */}
              <Card className={`cursor-pointer transition-all ${paymentMethod === "upi" ? "ring-2 ring-primary" : ""}`}>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="upi" id="upi" />
                    <Label htmlFor="upi" className="flex items-center gap-2 cursor-pointer flex-1">
                      <Smartphone className="w-5 h-5 text-primary" />
                      <span className="font-semibold">UPI</span>
                    </Label>
                    <div className="flex gap-2 text-xs text-muted-foreground">
                      GPay • PhonePe • Paytm
                    </div>
                  </div>
                </CardHeader>
                {paymentMethod === "upi" && (
                  <CardContent className="pt-0">
                    <Label htmlFor="upiId">Enter UPI ID</Label>
                    <Input
                      id="upiId"
                      placeholder="yourname@upi"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground mt-2">
                      You will receive a payment request on your UPI app
                    </p>
                  </CardContent>
                )}
              </Card>

              {/* Wallets */}
              <Card className={`cursor-pointer transition-all ${paymentMethod === "wallet" ? "ring-2 ring-primary" : ""}`}>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="wallet" id="wallet" />
                    <Label htmlFor="wallet" className="flex items-center gap-2 cursor-pointer">
                      <Wallet className="w-5 h-5 text-primary" />
                      <span className="font-semibold">Wallets</span>
                    </Label>
                  </div>
                </CardHeader>
                {paymentMethod === "wallet" && (
                  <CardContent className="pt-0">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {["Paytm", "PhonePe", "Amazon Pay", "Mobikwik"].map((wallet) => (
                        <Button
                          key={wallet}
                          variant={selectedWallet === wallet ? "default" : "outline"}
                          className="h-auto py-3 flex flex-col gap-1"
                          onClick={() => setSelectedWallet(wallet)}
                        >
                          <Wallet className="w-5 h-5" />
                          <span className="text-xs">{wallet}</span>
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                )}
              </Card>

              {/* Net Banking */}
              <Card className={`cursor-pointer transition-all ${paymentMethod === "netbanking" ? "ring-2 ring-primary" : ""}`}>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="netbanking" id="netbanking" />
                    <Label htmlFor="netbanking" className="flex items-center gap-2 cursor-pointer">
                      <Building2 className="w-5 h-5 text-primary" />
                      <span className="font-semibold">Net Banking</span>
                    </Label>
                  </div>
                </CardHeader>
                {paymentMethod === "netbanking" && (
                  <CardContent className="pt-0">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {["HDFC", "ICICI", "SBI", "Axis", "Kotak", "Yes Bank", "PNB", "BOB"].map((bank) => (
                        <Button
                          key={bank}
                          variant={selectedBank === bank ? "default" : "outline"}
                          className="h-auto py-3"
                          onClick={() => setSelectedBank(bank)}
                        >
                          <span className="text-xs">{bank}</span>
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                )}
              </Card>

              {/* Cash on Delivery */}
              <Card className={`cursor-pointer transition-all ${paymentMethod === "cod" ? "ring-2 ring-primary" : ""}`}>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="cod" id="cod" />
                    <Label htmlFor="cod" className="flex items-center gap-2 cursor-pointer">
                      <span className="text-xl">💵</span>
                      <span className="font-semibold">Cash on Delivery</span>
                    </Label>
                  </div>
                </CardHeader>
                {paymentMethod === "cod" && (
                  <CardContent className="pt-0">
                    <p className="text-sm text-muted-foreground">
                      Pay with cash when your order is delivered. An additional ₹40 fee applies.
                    </p>
                  </CardContent>
                )}
              </Card>
            </RadioGroup>
          </div>

          {/* Order Summary */}
          <div className="space-y-4">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-lg">Price Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Price ({totalItems} items)</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Delivery Charges</span>
                  <span className="text-green-500">FREE</span>
                </div>
                {paymentMethod === "cod" && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">COD Fee</span>
                    <span>$0.50</span>
                  </div>
                )}
                <div className="border-t pt-3">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total Amount</span>
                    <span className="text-primary">
                      ${(totalPrice + (paymentMethod === "cod" ? 0.5 : 0)).toFixed(2)}
                    </span>
                  </div>
                </div>

                <Button
                  className="w-full bg-gradient-to-r from-primary to-primary-glow mt-4"
                  size="lg"
                  onClick={handlePayment}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing Payment...
                    </>
                  ) : (
                    `Pay $${(totalPrice + (paymentMethod === "cod" ? 0.5 : 0)).toFixed(2)}`
                  )}
                </Button>

                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground mt-4">
                  <Lock className="w-3 h-3" />
                  <span>Secure Payment</span>
                  <Shield className="w-3 h-3 ml-2" />
                  <span>100% Safe</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-4">
                <p className="text-xs text-muted-foreground text-center">
                  By placing your order, you agree to our Terms of Use and Privacy Policy.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
