import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
type Product = {
    id: number;
    title: string;
    description: string;
    image: string;
    price: number;
    category: string;
    rating: { rate: number; count: number };
};
const product = () => {
    const params = useLocalSearchParams();

    const [loading, setLoading] = useState<boolean>(true);
    const [product, setProduct] = useState<Product>({
        id: NaN,
        title: "",
        description: "",
        image: "",
        price: NaN,
        category: "",
        rating: { rate: 0, count: 0 },
    });
    let data: Product = {
        id: 0,
        title: "",
        description: "",
        image: "",
        price: 0,
        category: "",
        rating: { rate: 0, count: 0 },
    };
    useEffect(() => {
        getProduct();
    }, [params.id]);

    const roundRate = Math.round(Number(product.rating.rate));
    const diffrence = 5 - Math.round(Number(product.rating.rate));
    const Comments: { [index: string]: string } = {
        1: "Ok",
        2: "Ok",
        3: "good",
        4: "Great",
        5: "Excellent",
    };

    const getProduct = async () => {
        try {
            const res = await fetch(
                "https://fakestoreapi.com/products/" + params.id,
                {
                    method: "GET",
                }
            );
            if (res.ok) {
                data = await res.json();
                setProduct(data);
                setLoading(false);
                console.log(data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <SafeAreaView style={styles.safeContainer}>
            <ScrollView>
                {!loading && (
                    <View style={styles.box}>
                        <Image
                            resizeMode="contain"
                            source={{ uri: product.image }}
                            style={styles.image}
                        />
                        <View style={styles.bottomSide}>
                            <Text style={styles.title}>{product.title}</Text>
                            <Text style={styles.description}>
                                {product.description}
                            </Text>
                            <Text style={styles.category}>
                                {product.category}
                            </Text>
                            <Text style={styles.price}>{product.price}</Text>
                            <View style={{ flex: 1, flexDirection: "row" }}>
                                {product.rating.rate != 0 &&
                                    Array(roundRate)
                                        .fill(0)
                                        .map((item, index) => (
                                            <Image
                                                key={index}
                                                source={require("../../../assets/images/ratingStar.png")}
                                                style={{
                                                    width: 20,
                                                    height: 20,
                                                }}
                                            />
                                        ))}
                                {product.rating.rate != 0 &&
                                    Array(diffrence)
                                        .fill(0)
                                        .map((item, index) => (
                                            <Image
                                                key={index}
                                                source={require("../../../assets/images/ratingStar.png")}
                                                style={{
                                                    width: 20,
                                                    height: 20,
                                                    opacity: 0.7,
                                                }}
                                            />
                                        ))}
                            </View>
                            <View
                                style={{
                                    flex: 1,
                                    flexDirection: "row",
                                    justifyContent: "center",
                                    alignItems : "center"
                                }}
                            >
                                <Text style={{ fontSize: 25 }}>
                                    {String(product.rating.count)}{" "}
                                </Text>
                                <Text style={{ textAlign: "center" }}>
                                    People Find this Product{" "}
                                </Text>
                                <Text style={{ fontSize: 25, color: "yellow" }}>
                                    {Comments[roundRate]}
                                </Text>
                            </View>
                        </View>
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

export default product;

const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
        backgroundColor: "#fff",
    },
    box: {
        paddingVertical: 30,
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
        padding: 10,
        backgroundColor: "#fff",
    },
    image: {
        height: 300,
        width: 300,
        borderRadius: 10,
        borderTopLeftRadius: 0,
        objectFit: "fill",
    },
    bottomSide: {
        flex: 1,
        flexDirection: "column",
        gap: 5,
        width: "auto",
    },
    title: { fontSize: 20 },
    price: { fontSize: 25 },
    description: { fontSize: 15 },
    category: { fontSize: 20 },
});
