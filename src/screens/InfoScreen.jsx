import { StyleSheet, Text, View, Image, ScrollView, Dimensions, Platform, TouchableOpacity } from "react-native";

import { Smartphone, Mail, MapPin } from 'lucide-react-native';
import MapView, { Marker } from "react-native-maps";

const { width } = Dimensions.get("window");

export default function InfoScreen({ navigation }) {

    const aboutPressHandler = () => {
        navigation.navigate('About Us')
    }
    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.content}>
                    <View style={styles.welcomeImageContainer}>
                        <Image style={styles.welcomeImage} source={require('../../assets/info.jpg')} />
                    </View>
                    <View style={[styles.phone, styles.infoContainers]}>
                        <View>
                            < Smartphone size={30} style={{ color: '#30e418' }} />
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.primaryText}>Give us a call</Text>
                            <Text style={styles.secondaryText}>+359 123 440 621</Text>
                        </View>
                    </View>
                    <View style={[styles.mail, styles.infoContainers]}>
                        <View>
                            < Mail size={30} style={{ color: '#30e418' }} />
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.primaryText}>Send us a message</Text>
                            <Text style={styles.secondaryText}>example@gmail.com</Text>
                        </View>
                    </View>
                    <View style={[styles.location, styles.infoContainers]}>
                        <View>
                            < MapPin size={30} style={{ color: '#30e418' }} />
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.primaryText}>Visit our location</Text>
                            <Text style={styles.secondaryText}>Example, Bulgaria</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.aboutUsContainer}>
                    <TouchableOpacity onPress={aboutPressHandler} style={{ width: '100%', alignItems: 'center' }}>
                        <View style={styles.aboutUs}>
                            <Text style={{ fontSize: 30, fontWeight: 'bold', fontFamily: 'serif', color: '#fff' }}>Learn more</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: 42.6977,
                        longitude: 23.3219,
                        latitudeDelta: 0.05,
                        longitudeDelta: 0.05,
                    }}
                >
                    <Marker
                        coordinate={{
                            latitude: 42.6977,
                            longitude: 23.3219,
                        }}
                        title="Our Location"
                        description="Sofia, Bulgaria"
                    />
                </MapView>
            </View>
        </ScrollView >
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1
    },
    content: {
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
    },
    map: {
        width: width,
        height: width
    }
})