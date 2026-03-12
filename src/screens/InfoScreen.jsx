import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Linking
} from "react-native";

import { Smartphone, Mail, MapPin } from 'lucide-react-native';

export default function InfoScreen({ navigation }) {

    const aboutPressHandler = () => {
        navigation.navigate('About Us')
    }

    const phonePressHandler = () => {
        Linking.openURL(`tel:+359123440621`);
    };

    const emailPressHandler = () => {
        Linking.openURL(`mailto:example@gmail.com`);
    };

    const locationPressHandler = () => {
        const address = encodeURIComponent("Sofia, Bulgaria");
        Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${address}`);
    };

    return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <TouchableOpacity onPress={phonePressHandler} style={[styles.phone, styles.infoContainers]}>
                        <View>
                            < Smartphone size={30} style={{ color: '#30e418' }} />
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.primaryText}>Give us a call</Text>
                            <Text style={styles.secondaryText}>+359 123 440 621</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={emailPressHandler} style={[styles.infoContainers]}>
                        <View>
                            < Mail size={30} style={{ color: '#30e418' }} />
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.primaryText}>Send us a message</Text>
                            <Text style={styles.secondaryText}>example@gmail.com</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={locationPressHandler} style={[styles.location, styles.infoContainers]}>
                        <View>
                            < MapPin size={30} style={{ color: '#30e418' }} />
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.primaryText}>Visit our location</Text>
                            <Text style={styles.secondaryText}>Example, Bulgaria</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.aboutUsContainer}>
                    <TouchableOpacity onPress={aboutPressHandler} style={{ width: '100%', alignItems: 'center' }}>
                        <View style={styles.aboutUs}>
                            <Text style={{ fontSize: 30, fontWeight: 'bold', fontFamily: 'serif', color: '#fff' }}>Learn more</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    content: {
        alignItems: 'center',
    },
    infoContainers: {
        flexDirection: 'row',
        gap: 20,
        width: 300,
        marginLeft: 30,
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
        alignItems: 'center',
    },
    aboutUs: {
        backgroundColor: '#2ec61a',
        width: '97%',
        alignItems: 'center',
        paddingBlock: 10,
    },
})