import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { ProductCard } from "@/components/ProductCard";
import { products, categories } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  
  const activeCategory = searchParams.get("categoria") || "todos";

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        activeCategory === "todos" || product.categorySlug === activeCategory;
      const matchesSearch =
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const handleCategoryChange = (slug: string) => {
    if (slug === "todos") {
      searchParams.delete("categoria");
    } else {
      searchParams.set("categoria", slug);
    }
    setSearchParams(searchParams);
  };

  return (
    <main className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Nossos <span className="text-gradient">Produtos</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Soluções digitais prontas para impulsionar seu negócio
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-6">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
            <Input
              type="text"
              placeholder="Buscar produtos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 bg-card border-border"
            />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
            <Filter size={18} className="text-muted-foreground mr-2" />
            {categories.map((cat) => (
              <Button
                key={cat.slug}
                variant={activeCategory === cat.slug ? "default" : "outline"}
                size="sm"
                onClick={() => handleCategoryChange(cat.slug)}
              >
                {cat.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <p className="text-sm text-muted-foreground text-center mb-8">
          {filteredProducts.length} produto{filteredProducts.length !== 1 ? "s" : ""} encontrado{filteredProducts.length !== 1 ? "s" : ""}
        </p>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-lg text-muted-foreground mb-4">
              Nenhum produto encontrado para sua busca.
            </p>
            <Button variant="outline" onClick={() => {
              setSearchQuery("");
              handleCategoryChange("todos");
            }}>
              Limpar filtros
            </Button>
          </div>
        )}
      </div>
    </main>
  );
};

export default Products;
