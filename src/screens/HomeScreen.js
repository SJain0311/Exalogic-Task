import { View, Text, Dimensions, StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from "@react-native-async-storage/async-storage";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function HomeScreen() {
    const [userData, setUserData] = useState({});

    const getUserInfo = async () => {
        const userObject = await AsyncStorage.getItem("UserObject");
        setUserData(userObject);
        // console.log("\n\n userObject: ", userObject.first_name);
    }

    useEffect(() => {
        getUserInfo();
    }, [])

    console.log("\n\n 11111111111111111111111111111111");

    return (
        <View style={{ width: windowWidth, height: windowHeight, backgroundColor: "#fff" }}>
            <StatusBar backgroundColor="pink" barStyle="dark-content" />
            <View style={{ width: "100%", height: 50, backgroundColor: "pink", justifyContent: "center", paddingHorizontal: 22 }}>
                <Text style={{ fontSize: 18, color: "#000", fontWeight: "700" }}>Home Screen</Text>
            </View>
            <View style={{ padding: 20 }}>
                <View style={{ width: "100%", borderWidth: 1, borderColor: "#999", borderRadius: 7, padding: 9 }}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Text style={{ fontSize: 12, color: "#999", fontWeight: "700" }}>First Name:</Text>
                        <Text style={{ fontSize: 12, color: "#000", marginLeft: 8 }}>{userData?.first_name}</Text>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", marginTop: 4 }}>
                        <Text style={{ fontSize: 12, color: "#999", fontWeight: "700" }}>Last Name:</Text>
                        <Text style={{ fontSize: 12, color: "#000", marginLeft: 8 }}>{userData?.last_name}</Text>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", marginTop: 4 }}>
                        <Text style={{ fontSize: 12, color: "#999", fontWeight: "700" }}>Gender:</Text>
                        <Text style={{ fontSize: 12, color: "#000", marginLeft: 8 }}>{userData?.gender}</Text>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", marginTop: 4 }}>
                        <Text style={{ fontSize: 12, color: "#999", fontWeight: "700" }}>Nationality:</Text>
                        <Text style={{ fontSize: 12, color: "#000", marginLeft: 8 }}>{userData?.nationality}</Text>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", marginTop: 4 }}>
                        <Text style={{ fontSize: 12, color: "#999", fontWeight: "700" }}>Terms & Conditions:</Text>
                        <Text style={{ fontSize: 12, color: "#000", marginLeft: 8 }}>{userData?.terms_conditions}</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}