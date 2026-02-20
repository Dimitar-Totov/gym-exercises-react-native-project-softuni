import { Text, View, Image, StyleSheet, Platform, ScrollView } from "react-native";

export default function AboutUs() {
    return (
        <ScrollView style={styles.container}>
            <Image style={styles.image} source={require('../../assets/about.jpg')} />
            <View style={styles.content}>
                <Text style={styles.welcomeText}>Hello everyone</Text>
                <View style={styles.firstSection}>
                    <Text style={styles.textParagraph}>
                        I am a motivated and passionate student currently learning React and modern web development technologies. I have a strong interest in building interactive and user-friendly web applications, and I enjoy turning design concepts into functional, responsive interfaces.
                    </Text>
                </View>
                <View style={styles.secondSection}>
                    <View>
                        <Image style={[styles.image,{marginBottom: 15}]} source={require(('../../assets/hiking.jpg'))} />
                        <Text style={[styles.textParagraph,{paddingInline: 20}]} >
                            Outside of coding, I am passionate about staying active — I love sports, hiking, and exploring nature.
                            Balancing study with outdoor activities helps me stay focused, energized, and inspired in both personal and professional growth.
                        </Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    image: {
        width: '100%',
        height: 350,
        resizeMode: 'cover'
    },
    content: {
        paddingBlock: 20,
        alignItems: 'center'
    },
    welcomeText: {
        fontSize: 35,
        fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
        color: '#3a9052',
        marginBottom: 10
    },
    firstSection: {
        paddingInline: 30,
        marginBottom: 30
    },
    textParagraph: {
        fontSize: 18,
        color: '#585757',
        textAlign: 'center'
    },
    secondSection: {

    }
})