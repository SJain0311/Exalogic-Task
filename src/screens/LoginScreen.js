import { useState } from 'react';
import {
    Text,
    View,
    StyleSheet,
    ScrollView,
    Button,
    StatusBar,
    Image,
    TouchableHighlight,
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { Input } from 'react-native-elements';
import RadioForm from 'react-native-simple-radio-button';
import { fetchApiFailure, fetchApiRequest, fetchApiSuccess } from '../redux/action/apiAction';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from "@react-native-async-storage/async-storage";

const data = [
    { label: 'Afghanistan', value: '1' },
    { label: 'Austria', value: '2' },
    { label: 'Brazil', value: '3' },
    { label: 'India', value: '4' },
    { label: 'Japan', value: '5' },
];

export default function LoginScreen({ navigation }) {
    const { apiData } = useSelector(state => state.assignment);
    const dispatch = useDispatch();

    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');

    const [value, setValue] = useState({ dropVal: "", dropData: "" });
    const [isFocus, setIsFocus] = useState(false);
    const [agree, setAgree] = useState(false);
    const [gender, setGender] = useState('');

    const options = [
        { label: 'Female', value: 'Female' },
        { label: 'Male', value: 'Male' },
        { label: 'Other', value: 'Other' },
    ];

    const renderLabel = () => {
        if (value || isFocus) {
            return (
                <Text style={[styles.label, isFocus && { color: 'blue' }]}>
                    Dropdown label
                </Text>
            );
        }
        return null;
    };

    const handleSubmit = async () => {
        var userObject = {
            "first_name": name,
            "last_name": lastname,
            "gender": gender,
            "nationality": value,
            "terms_conditions": agree
        };
        dispatch(fetchApiRequest())
        try {
            const apiResponse = await fetch("http://api.engageapp.cloud/", {
                method: 'POST',
                headers: {
                    "Accept": 'application/json',
                    'Content-Type': 'multipart/form-data',
                },
                body: JSON.stringify(userObject),
            });

            const estateData = await apiResponse.json();
            dispatch(fetchApiSuccess(estateData))
            await AsyncStorage.setItem('UserObject', userObject.toString());
            navigation.navigate("HomeScreen");
        } catch (error) {
            dispatch(fetchApiFailure(error.message))
            console.log("\n\n error: ", error)
            navigation.navigate("HomeScreen");
        }
    }

    return (
        <ScrollView style={{ width: "100%", height: "100%", backgroundColor: "#fff" }}>
            <View style={{ marginTop: 80 }} />
            <StatusBar backgroundColor="#fff" barStyle="dark-content" />
            <View style={styles.container}>
                <Text style={styles.paragraph}>Registration</Text>
                <View style={{ marginTop: 50 }} />
                <Input
                    label="First Name"
                    name="FirstName"
                    value={name}
                    onChangeText={(text) => setName(text)}
                    placeholder="Enter First Name"
                    labelStyle={{ ...styles.labelStyle }}
                    style={{ fontSize: 14, color: "#999", padding: 0 }}
                />
                <Input
                    label="Last Name"
                    name="lastname"
                    value={lastname}
                    onChangeText={(text) => setLastname(text)}
                    placeholder="Enter Last Name"
                    labelStyle={{ ...styles.labelStyle }}
                    style={{ fontSize: 14, color: "#999", padding: 0 }}
                />

                <View style={{ paddingHorizontal: 8 }}>
                    <Text style={{ ...styles.labelStyle, marginBottom: 14 }}>Gender Select</Text>
                    <RadioForm
                        radio_props={options}
                        initial={0}
                        onPress={(value) => {
                            setGender(value);
                        }}
                    />
                </View>
                <Text />

                <View>
                    <Dropdown
                        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                        placeholderStyle={styles.placeholderStyle}
                        iconStyle={styles.iconStyle}
                        data={data}
                        maxHeight={200}
                        placeholder={!isFocus ? 'Select item' : '...'}
                        value={value.length !== 0 ? "" : value}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        renderItem={(item) => {
                            return (
                                <View style={{ width: "100%", height: 34, justifyContent: "center", alignItems: "center" }}>
                                    <Text style={{ fontSize: 14, color: "#555" }}>{item?.label}</Text>
                                </View>
                            );
                        }}
                        onChange={item => {
                            setValue({ dropVal: item?.value, dropData: item?.label });
                            setIsFocus(false);
                        }}
                    />
                    {value?.dropData?.length !== 0 ? <View style={{ position: "absolute", top: 14, left: 28 }}>
                        <Text style={{ fontSize: 14, fontWeight: "500", color: "#000" }}>{value?.dropData}</Text>
                    </View> : <></>}
                </View>

                {renderLabel()}
                <View style={styles.wrapper}>
                    <View style={{ ...styles.checkBoxWrapper }}>
                        <TouchableHighlight style={{ ...styles.checkBoxStyle }} underlayColor="#dcdcdc" onPress={() => {
                            setAgree(!agree)
                        }}>
                            {agree ? <Image
                                source={require('../../assets/tick.png')}
                                style={{ width: 14, height: 14 }}
                            /> : <></>}
                        </TouchableHighlight>
                        <Text style={{ fontSize: 15, color: "#000", width: "90%" }}>I have read and agreed with the terms and conditions</Text>
                    </View>
                </View>

                <Button title="Registration" disabled={!agree} onPress={() => { handleSubmit() }} />

            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, padding: 8,
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    genderTitle: {
        height: 50,
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 16,
        marginHorizontal: 10
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    paragraph: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        color: "#000"
    },
    checkBoxWrapper: {
        width: "100%",
        paddingHorizontal: 18,
        flexDirection: "row",
        alignItems: "flex-start",
        backgroundColor: "#f7f8f9",
        paddingVertical: 14,
        marginTop: 8
    },
    wrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'center',
        paddingVertical: 15,
        paddingHorizontal: 11
    },
    labelStyle: {
        fontSize: 14, color: "#999", fontWeight: "bold"
    },
    checkBoxStyle: {
        width: 20, height: 20,
        borderColor: "#999",
        borderWidth: 1,
        borderRadius: 4,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 15,
        marginTop: 6
    },
    placeholderStyle: {
        fontSize: 14,
        color: "#777"
    },
});
