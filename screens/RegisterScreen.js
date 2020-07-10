import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons'
import Fire from '../Fire'
import UserPermissions from '../utilities/UserPermissions';
import * as ImagePicker from "expo-image-picker";

export default class LoginScreen extends React.Component {
    static navigationOptions = {
        header: null
    };
    state = {
        user: {
            name: "",
            email: "",
            password: "",
            avatar: null

        },
        errorMessage: null
    };

    handlePickAvater = async () => {
        UserPermissions.getCameraPermission()

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3]
        })

        if (!result.cancelled) {
            this.setState({ user: { ...this.state.user, avatar: result.uri } })
        }


    }

    // FIXME - TypeError: _Fire__WEBPACK_IMPORTED_MODULE_16__.default.shared.createUser is not a function
    handleSignUp = () => {
        Fire.shared.createUser(this.state.user);
    };

    render() {

        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content"></StatusBar>
                {/* PROBLEM: IMAGES DON'T SHOW UP */}
                <Image source={require("../assets/authHeader.jpg")}
                    style={styles.img1}></Image>
                <Image
                    source={require("../assets/favicon.png")} style={{ position: "absolute", bottom: 150 }}></Image>
                <Image
                    source={require("../assets/favicon.png")} style={{ marginTop: 290, alignSelf: "center" }}></Image>

                <TouchableOpacity style={styles.back} onPress={() => this.props.navigation.goBack()}>
                    <Ionicons name="ios-arrow-round-back" size={32} color="#FFF"></Ionicons>
                </TouchableOpacity>

                {/* <View style={{ position: "absolute", top: 64, alignItems: "center", width: "100%" }}>
                    <Text style={styles.greeting}> Hello. Sign up to get started.</Text>
                </View> */}
                <View>
                    <Text style={styles.greeting}> Hello. Sign up to get started.</Text>
                    <TouchableOpacity style={styles.avatarPlaceholder} onPress={this.handlePickAvater}>
                        <Image source={{ uri: this.state.user.avatar }} style={styles.avatar}></Image>
                        <Ionicons
                            name="ios-add"
                            size={40}
                            color="#FFF"
                            styles={{ marginTop: 6, marginLeft: 2 }}>
                        </Ionicons>
                    </TouchableOpacity>
                </View>

                <View style={styles.errorMessage}>
                    {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
                </View>

                <View style={styles.form}>
                    <View>
                        <Text style={styles.inputTitle}>Full Name</Text>
                        <TextInput
                            style={styles.input}
                            autoCapitalize="none"
                            onChangeText={name => this.setState({ user: { ...this.state.user, name } })}
                            value={this.state.user.name}></TextInput>
                    </View>

                    <View style={{ marginTop: 32 }}>
                        <Text style={styles.inputTitle}>Email Address</Text>
                        <TextInput
                            style={styles.input}
                            autoCapitalize="none"
                            onChangeText={email => this.setState({ user: { ...this.state.user, email } })}
                            value={this.state.user.email}></TextInput>
                    </View>

                    <View style={{ marginTop: 32 }}>
                        <Text style={styles.inputTitle}>Password</Text>
                        <TextInput
                            style={styles.input}
                            secureTextEntry
                            autoCapitalize="none"
                            onChangeText={password => this.setState({ user: { ...this.state.user, password } })}
                            value={this.state.user.password}></TextInput>
                    </View>
                </View>

                <TouchableOpacity style={styles.button} onPress={this.handleSignUp}>
                    <Text style={{ color: '#FFF', fontWeight: "500" }}>Sign up</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{ alignSelf: "center", marginTop: 32 }}
                    onPress={() => this.props.navigation.navigate("Login")}>
                    <Text style={{ color: '#414959', fontSize: 13 }}>
                        New to SAD? <Text style={{ fontWeight: "500", color: "#E9446A" }}>Login</Text>
                    </Text>
                </TouchableOpacity>
            </View >
        );
    }
}

// firebase
//             .auth()
//             .createUserWithEmailAndPassword(this.state.email, this.state.password)
//             .then(userCredentials => {
//                 return userCredentials.user.updateProfile({
//                     displayName: this.state.name
//                 })
//             })
//             .catch(error => this.setState({ errorMessage: error.message }));
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    greeting: {
        marginTop: 32,
        fontSize: 18,
        fontWeight: "400",
        textAlign: "center",
        color: "#FFF"
    },
    errorMessage: {
        height: 72,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 30
    },
    error: {
        color: "#E9446A",
        fontSize: 13,
        fontWeight: "400",
        textAlign: "center"
    },
    form: {
        marginBottom: 40,
        marginHorizontal: 30
    },
    inputTitle: {
        color: "#8A8F9E",
        fontSize: 10,
        textTransform: "uppercase"
    },
    input: {
        borderBottomColor: "#8A8F9E",
        borderBottomWidth: StyleSheet.hairlineWidth,
        height: 40,
        fontSize: 15,
        color: "#161F3D"
    },
    button: {
        marginHorizontal: 30,
        backgroundColor: "#E9446A",
        borderRadius: 4,
        height: 52,
        alignItems: "center",
        justifyContent: "center"
    },
    back: {
        // position: "absolute",
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: "#E1E2E6",
        marginTop: 48,
        marginLeft: 48,
        alignItems: "center",
        justifyContent: "center"
    },
    avatarPlaceholder: {
        width: 100,
        height: 100,
        backgroundColor: "#E1E2E6",
        borderRadius: 50,
        marginTop: 40,
        justifyContent: "center",
        alignItems: "center"
    },
    avatar: {
        position: "absolute",
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    img1: {
        width: 48,
        height: 48,
        marginLeft: 100
    }
});

