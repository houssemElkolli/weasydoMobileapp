import React from "react";
import { FlatList } from "react-native";
import ProductCard from "./ProductCard";
type ProductsType = Product[];

type Product = {
    id: number;
    title: string;
    image: string;
    price: number;
    category: string;
};
const ProductsContainer = ({ products }: { products: ProductsType }) => {
    return (
        <FlatList
            keyExtractor={(product: Product) => String(product.id)}
            data={products}
            renderItem={(product) => (
                <ProductCard
                    id={product.item.id}
                    title={product.item.title}
                    image={product.item.image}
                    price={product.item.price}
                    category={product.item.category}
                />
            )}
        />
    );
};

export default ProductsContainer;
