import { Link } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
type Props = {
    id: number;
    title: string;
    image: string;
    price: number;
    category: string;
};
const ProductCard = ({ id, title, image, price, category }: Props) => {
    return (
        <Link href={{ pathname: "/products/[id]", params: { id } }}>
            <View style={styles.box}>
                <Image
                    resizeMode="contain"
                    source={{ uri: image }}
                    style={styles.image}
                />
                <View style={styles.rightSide}>
                    <Text style={styles.title}>{title} </Text>
                    <Text style={styles.category}>{category} </Text>
                    <Text style={styles.price}>{price} $</Text>
                </View>
            </View>
        </Link>
    );
};

export default ProductCard;

const styles = StyleSheet.create({
    box: {
        flex: 1,
        flexDirection: "row",
        gap: 10,
        padding: 10,
        backgroundColor: "#fff",
    },
    image: {
        height: 150,
        width: 150,
        borderRadius: 10,
        borderTopLeftRadius: 0,
        objectFit: "fill",
    },
    rightSide: {
        flex: 1,
        flexDirection: "column",
        gap: 5,
        width: "auto",
    },
    title: { fontSize: 15 },
    price: { fontSize: 20 },
    category: { fontSize: 15 },
});
