import { StyleSheet, Text, View, Image, ScrollView, Dimensions, Platform, TouchableOpacity } from "react-native";

import { Smartphone, Mail, MapPin } from 'lucide-react-native';

const { width } = Dimensions.get("window");

export default function InfoScreen({ navigation }) {

    const aboutPressHandler = () => {
        navigation.navigate('About Us')
    }
    return (
        <ScrollView>
            <View style={style.container}>
                <View style={style.content}>
                    <View style={style.welcomeImageContainer}>
                        <Image style={style.welcomeImage} source={require('../../assets/info.jpg')} />
                    </View>
                    <View style={[style.phone, style.infoContainers]}>
                        <View>
                            < Smartphone size={30} style={{ color: '#30e418' }} />
                        </View>
                        <View style={style.textContainer}>
                            <Text style={style.primaryText}>Give us a call</Text>
                            <Text style={style.secondaryText}>+359 123 440 621</Text>
                        </View>
                    </View>
                    <View style={[style.mail, style.infoContainers]}>
                        <View>
                            < Mail size={30} style={{ color: '#30e418' }} />
                        </View>
                        <View style={style.textContainer}>
                            <Text style={style.primaryText}>Send us a message</Text>
                            <Text style={style.secondaryText}>example@gmail.com</Text>
                        </View>
                    </View>
                    <View style={[style.location, style.infoContainers]}>
                        <View>
                            < MapPin size={30} style={{ color: '#30e418' }} />
                        </View>
                        <View style={style.textContainer}>
                            <Text style={style.primaryText}>Visit our location</Text>
                            <Text style={style.secondaryText}>Example, Bulgaria</Text>
                        </View>
                    </View>
                </View>
                <View style={style.aboutUsContainer}>
                    <TouchableOpacity onPress={aboutPressHandler} style={{ width: '100%', alignItems: 'center' }}>
                        <View style={style.aboutUs}>
                            <Text style={{ fontSize: 30, fontWeight: 'bold', fontFamily: 'serif', color: '#fff' }}>Learn more</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView >
    )
}

const style = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1
    },
    content: {
        // marginTop: 170,
        backgroundColor: '#faf2f2',
        alignItems: 'center'
    },
    welcomeImageContainer: {
        width: width,
        height: width,
        marginBottom: 30
    },
    welcomeImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    infoContainers: {
        flexDirection: 'row',
        gap: 20,
        width: 300,
        marginLeft: 30
    },
    textContainer: {
        gap: 2
    },
    primaryText: {
        fontWeight: 'bold',
        fontSize: 20
    },
    secondaryText: {
        borderBottomWidth: 3,
        borderBottomColor: '#f2ae5b',
        marginBottom: 5,
        paddingBottom: 5,
        color: '#716e6e'
    },
    aboutUsContainer: {
        backgroundColor: '#fff',
        paddingTop: 5,
        paddingBottom: 5,
        alignItems: 'center',
    },
    aboutUs: {
        backgroundColor: '#2ec61a',
        width: '97%',
        alignItems: 'center',
        paddingBlock: 10,
    }
})