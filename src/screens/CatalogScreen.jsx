import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ArrowRight } from 'lucide-react-native';

export default function CatalogScreen() {

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <View style={styles.selectOptions}>
                    <Text style={styles.selectOption}>Upper Body</Text>
                    <Text style={styles.selectOption}>Lower Body</Text>
                    <Text style={styles.selectOption}>Full Body</Text>
                </View>
                <View style={styles.exercises}>
                    <View style={styles.exercise}>
                        <Text>Bench Press</Text>
                        <ArrowRight />
                    </View>
                    <View style={styles.exercise}>
                        <Text>Incline Bench Press</Text>
                        <ArrowRight />
                    </View>
                    <View style={styles.exercise}>
                        <Text>Decline Bench Press</Text>
                        <ArrowRight />
                    </View>
                    <View style={styles.exercise}>
                        <Text>Dumbbell Bench Press</Text>
                        <ArrowRight />
                    </View>
                    <View style={styles.exercise}>
                        <Text>Chest Fly</Text>
                        <ArrowRight />
                    </View>
                    <View style={styles.exercise}>
                        <Text>Cable Fly</Text>
                        <ArrowRight />
                    </View>
                    <View style={styles.exercise}>
                        <Text>Push-Ups</Text>
                        <ArrowRight />
                    </View>
                    <View style={styles.exercise}>
                        <Text>Dips</Text>
                        <ArrowRight />
                    </View>
                    <View style={styles.exercise}>
                        <Text>Machine Chest Press</Text>
                        <ArrowRight />
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        width: '100%',
        marginTop: 10,
        alignItems: 'center',
        gap: 15
    },
    selectOptions:{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    selectOption:{
        backgroundColor: '#65da5a',
        paddingInline: 15,
        paddingBlock: 10,
        borderRadius: 15,
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 15
    },
    exercises: {
        width: '90%',
        gap: 10,
    },
    exercise: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
        elevation: 4,
    }
})