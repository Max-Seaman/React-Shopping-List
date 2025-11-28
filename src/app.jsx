import { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { Main } from "./components/Main";
import { Footer } from "./components/Footer";
import { Container } from "./components/Container";

export function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sort, setSort] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [filters, setFilters] = useState({ categoryFilter: [], inStock: false });
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  useEffect(() => {
    setLoadingProducts(true);
    // simulate API fetch delay
    const id = setTimeout(() => {
      import("./products").then((mod) => {
        setProducts(mod.products || []);
        setLoadingProducts(false);
      });
    }, 800);

    return () => clearTimeout(id);
  }, []);

  function updateFilters(key, value) {
    setFilters((oldFilters) => {
      // Copy the old filters
      const updated = { ...oldFilters };
      // add or update the specified filter
      updated[key] = value;
      // Return the new filters
      return updated;
    });
  }

  return (
    <Container>
      <Header 
        searchQuery={searchQuery} setSearchQuery={setSearchQuery} 
        sort={sort} setSort={setSort} 
      />
      <Main 
        searchQuery={searchQuery} 
        sort={sort} setSort={setSort}
        priceRange={priceRange} setPriceRange={setPriceRange} 
        filters={filters} updateFilters={updateFilters}
        products={products} loading={loadingProducts}
      />
      <Footer />
    </Container>
  );
}
