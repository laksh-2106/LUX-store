import { ShoppingCart, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  category?: string;
  onAddToCart: () => void;
}

export const ProductCard = ({
  id,
  name,
  price,
  imageUrl,
  category,
  onAddToCart,
}: ProductCardProps) => {
  return (
    <Card className="group overflow-hidden glass-card hover:shadow-elegant transition-all duration-500 border-border/30 animate-fade-in hover:-translate-y-2">
      <Link to={`/product/${id}`}>
        <div className="aspect-square overflow-hidden bg-secondary/50 relative">
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
            <span className="inline-flex items-center gap-1 text-sm font-medium text-primary bg-background/90 backdrop-blur px-3 py-1 rounded-full">
              <Zap className="h-3 w-3" />
              Quick View
            </span>
          </div>
        </div>
      </Link>
      <CardContent className="p-5">
        {category && (
          <p className="text-xs text-accent font-semibold uppercase tracking-wider mb-2">
            {category}
          </p>
        )}
        <Link to={`/product/${id}`}>
          <h3 className="font-display font-semibold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-1">
            {name}
          </h3>
        </Link>
        <p className="text-2xl font-bold gradient-text">
          ${price.toFixed(2)}
        </p>
      </CardContent>
      <CardFooter className="p-5 pt-0">
        <Button
          onClick={onAddToCart}
          className="w-full bg-gradient-to-r from-primary to-primary-glow hover:shadow-neon transition-all duration-300 font-semibold"
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};