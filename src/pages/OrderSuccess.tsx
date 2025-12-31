import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate, useLocation } from "react-router-dom";
import { CheckCircle2, Package, Truck, Home } from "lucide-react";
import { useCart } from "@/hooks/useCart";

const OrderSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { totalItems } = useCart();
  const orderId = (location.state as { orderId: string })?.orderId;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <Navbar cartItemsCount={totalItems} />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <Card className="text-center overflow-hidden">
            {/* Success Animation */}
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 py-8">
              <div className="w-24 h-24 mx-auto bg-white rounded-full flex items-center justify-center animate-bounce-in">
                <CheckCircle2 className="w-16 h-16 text-green-500" />
              </div>
            </div>

            <CardContent className="pt-8 pb-8 space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  Order Placed Successfully!
                </h1>
                <p className="text-muted-foreground">
                  Thank you for shopping with us
                </p>
              </div>

              {orderId && (
                <div className="bg-secondary/50 rounded-lg p-4 inline-block">
                  <p className="text-sm text-muted-foreground">Order ID</p>
                  <p className="font-mono font-bold text-lg">#{orderId.slice(0, 8).toUpperCase()}</p>
                </div>
              )}

              {/* Order Timeline */}
              <div className="flex justify-center items-center gap-2 py-6">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  </div>
                  <span className="text-xs text-muted-foreground">Confirmed</span>
                </div>
                <div className="w-12 h-0.5 bg-muted" />
                <div className="flex flex-col items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                    <Package className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <span className="text-xs text-muted-foreground">Processing</span>
                </div>
                <div className="w-12 h-0.5 bg-muted" />
                <div className="flex flex-col items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                    <Truck className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <span className="text-xs text-muted-foreground">Shipped</span>
                </div>
                <div className="w-12 h-0.5 bg-muted" />
                <div className="flex flex-col items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                    <Home className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <span className="text-xs text-muted-foreground">Delivered</span>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  We've sent a confirmation email with order details.
                </p>
                <p className="text-sm text-muted-foreground">
                  Expected delivery: <span className="font-semibold text-foreground">3-5 Business Days</span>
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
                <Button
                  variant="outline"
                  onClick={() => navigate("/admin/orders")}
                  className="gap-2"
                >
                  <Package className="w-4 h-4" />
                  View Orders
                </Button>
                <Button
                  onClick={() => navigate("/products")}
                  className="bg-gradient-to-r from-primary to-primary-glow gap-2"
                >
                  Continue Shopping
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
