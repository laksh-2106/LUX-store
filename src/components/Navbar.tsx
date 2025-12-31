import { ShoppingCart, Store, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

interface NavbarProps {
  cartItemsCount?: number;
}

export const Navbar = ({ cartItemsCount = 0 }: NavbarProps) => {
  return (
    <nav className="glass sticky top-0 z-50 border-b border-border/30">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl group">
          <div className="relative">
            <Store className="h-6 w-6 text-primary transition-transform group-hover:scale-110" />
            <Sparkles className="h-3 w-3 text-accent absolute -top-1 -right-1 animate-bounce-soft" />
          </div>
          <span className="gradient-text font-display tracking-tight">
            LuxeStore
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <Link to="/products">
            <Button variant="ghost" className="font-medium hover:bg-primary/10 hover:text-primary transition-all">
              Products
            </Button>
          </Link>
          <Link to="/admin">
            <Button variant="ghost" className="text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all">
              Admin
            </Button>
          </Link>
          <Link to="/cart">
            <Button 
              variant="outline" 
              size="icon" 
              className="relative border-primary/30 hover:border-primary hover:bg-primary/10 transition-all hover:shadow-glow"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-gradient-to-r from-accent to-primary text-accent-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold animate-scale-in">
                  {cartItemsCount}
                </span>
              )}
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};