import Ionicons from "@expo/vector-icons/Ionicons";
import {
    StyleSheet,
    Image,
    Platform,
    Text,
    SafeAreaView,
    View,
    FlatList,
} from "react-native";

import { Collapsible } from "@/components/Collapsible";
import { ExternalLink } from "@/components/ExternalLink";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import { useLocalSearchParams } from "expo-router";
import ProductsContainer from "@/components/ProductsContainer";
import { Picker } from "@react-native-picker/picker";

type ProductsType = Product[];
type Product = {
    id: number;
    title: string;
    image: string;
    price: number;
    category: string;
};

export default function products() {
    const [products, setProducts] = useState<ProductsType>([
        {
            id: NaN,
            title: "",
            image: "",
            price: NaN,
            category: "",
        },
    ]);
    const [category, setCategory] = useState("");
    const [categories, setCategories] = useState<string[]>([]);
    const [sort, setSort] = useState("");
    const [limit, setLimit] = useState("");

    let data: ProductsType = [];
    let result: string[] = [];
    useEffect(() => {
        getProducts();
        getCategories();
    }, [category, sort, limit]);
    const getCategories = async () => {
        try {
            const res = await fetch(
                "https://fakestoreapi.com/products/categories",
                {
                    method: "GET",
                }
            );
            if (res.ok) {
                result = await res.json();
                setCategories(result);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getProducts = async () => {
        try {
            const res = await fetch(
                "https://fakestoreapi.com/products" +
                    (category !== ""
                        ? "/category/" +
                          category +
                          "?" +
                          "sort=" +
                          sort +
                          "&" +
                          limit
                        : "?" + "sort=" + sort + "&" + "limit=" + limit),
                {
                    method: "GET",
                }
            );
            if (res.ok) {
                data = await res.json();
                setProducts(data);
                console.log(data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <SafeAreaView style={styles.safeContainer}>
            <View style={styles.filterBox}>
                <Picker
                    selectedValue={category}
                    onValueChange={(itemValue, itemIndex) =>
                        setCategory(itemValue)
                    }
                    style={styles.pciker}
                >
                    {categories.map((category) => (
                        <Picker.Item
                            key={category}
                            label={category}
                            value={category}
                        />
                    ))}
                    <Picker.Item label={"All"} value={""} />
                </Picker>
                <Picker
                    selectedValue={sort}
                    onValueChange={(itemValue, itemIndex) => setSort(itemValue)}
                    style={styles.pciker}
                >
                    <Picker.Item label={"Asc"} value={"asc"} />
                    <Picker.Item label={"Desc"} value={"desc"} />
                </Picker>
                {category === "" && (
                    <Picker
                        selectedValue={limit}
                        onValueChange={(itemValue, itemIndex) =>
                            setLimit(itemValue)
                        }
                        style={styles.pciker}
                    >
                        <Picker.Item label={"2"} value={"2"} />
                        <Picker.Item label={"5"} value={"5"} />
                        <Picker.Item label={"All"} value={""} />
                    </Picker>
                )}
            </View>
            <View style={styles.container}>
                {!Number.isNaN(products[0].id) && (
                    <ProductsContainer products={products} />
                )}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
        backgroundColor: "#fff",
    },
    container: {
        flex: 1,
        paddingVertical: 30,
    },
    filterBox: { margin: 10 },
    pciker: {
        margin: 5,
    },

    box: {},
});
