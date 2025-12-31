import { Navbar } from "@/components/Navbar";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, Sparkles, Zap, Shield, Truck } from "lucide-react";
import { Link } from "react-router-dom";
import heroBgImg from "@/assets/hero-bg.jpg";
import { getProducts, Product } from "@/data/store";

const Index = () => {
  const featuredProducts = getProducts().slice(0, 3);
  const { addToCart, totalItems } = useCart();
  const { toast } = useToast();

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
    });
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart`,
    });
  };

  const features = [
    { icon: Zap, title: "Fast Delivery", desc: "Same day shipping" },
    { icon: Shield, title: "Secure Payment", desc: "100% protected" },
    { icon: Truck, title: "Free Returns", desc: "30-day guarantee" },
  ];

  return (
    <div className="min-h-screen">
      <Navbar cartItemsCount={totalItems} />

      {/* Hero Section */}
      <section
        className="relative min-h-[700px] flex items-center justify-center text-center overflow-hidden"
        style={{
          backgroundImage: `url(${heroBgImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-primary/85 to-primary-glow/80" />
        
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-accent/20 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-glow/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-3xl animate-pulse" />
        </div>

        <div className="relative z-10 container mx-auto px-4">
          <div className="animate-fade-in-up">
            <div className="inline-flex items-center gap-2 bg-background/10 backdrop-blur-sm px-4 py-2 rounded-full mb-8 border border-primary-foreground/20">
              <Sparkles className="h-4 w-4 text-accent" />
              <span className="text-primary-foreground/90 text-sm font-medium">Premium Collection 2025</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-primary-foreground font-display tracking-tight">
              Welcome to{" "}
              <span className="relative">
                <span className="animate-neon">LuxeStore</span>
                <span className="absolute -inset-1 bg-gradient-to-r from-accent to-primary-glow blur-xl opacity-30" />
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-10 text-primary-foreground/85 max-w-2xl mx-auto leading-relaxed">
              Discover premium products that elevate your lifestyle with cutting-edge design and uncompromising quality
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/products">
                <Button size="lg" className="text-lg px-8 py-6 bg-background text-foreground hover:bg-background/90 hover:shadow-elegant transition-all duration-300 font-semibold">
                  Shop Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/products">
                <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 transition-all">
                  View Collection
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-soft">
          <div className="w-6 h-10 border-2 border-primary-foreground/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-primary-foreground/50 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Features Strip */}
      <section className="py-8 glass border-y border-border/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <div 
                key={feature.title} 
                className="flex items-center justify-center gap-4 p-4 animate-fade-in"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-primary-glow/10 border border-primary/20">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4 py-24">
        <div className="text-center mb-16 animate-fade-in">
          <span className="inline-flex items-center gap-2 text-accent font-semibold text-sm uppercase tracking-wider mb-4">
            <Sparkles className="h-4 w-4" />
            Curated Selection
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-display">
            <span className="gradient-text">Featured Products</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Hand-picked selection of our best items, designed for those who appreciate quality
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredProducts.map((product, i) => (
            <div key={product.id} style={{ animationDelay: `${i * 0.15}s` }}>
              <ProductCard
                id={product.id}
                name={product.name}
                price={product.price}
                imageUrl={product.imageUrl}
                category={product.category}
                onAddToCart={() => handleAddToCart(product)}
              />
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <Link to="/products">
            <Button size="lg" variant="outline" className="border-primary/30 hover:border-primary hover:bg-primary/5 transition-all duration-300 font-semibold">
              View All Products
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-glow opacity-90" />
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='3'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-primary-foreground font-display">
            Ready to Experience Luxury?
          </h2>
          <p className="text-xl text-primary-foreground/85 mb-10 max-w-xl mx-auto">
            Join thousands of satisfied customers who trust LuxeStore for premium products
          </p>
          <Link to="/products">
            <Button size="lg" className="bg-background text-foreground hover:bg-background/90 text-lg px-10 py-6 hover:shadow-elegant transition-all duration-300 font-semibold">
              Start Shopping
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border/30 glass">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">
            © 2025 LuxeStore. All rights reserved. Crafted with ❤️
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;