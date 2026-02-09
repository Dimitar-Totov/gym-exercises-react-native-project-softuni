import { View, Text, StyleSheet, TouchableOpacity } from "react-native"

const groups = ["Back", "Chest", "Arms", "Legs", "Abs", "Full-Body"]

export default function HomepageCards({ navigation }) {

    const handlePress = (muscleGroup) => {
        navigation.navigate('Muscle Groups', { muscleGroup })
    }

    return (
        <View style={{ flexDirection: 'row', width: '90%', flexWrap: 'wrap', gap: 30 }}>
            {groups.map(item => (
                <TouchableOpacity key={item} onPress={() => handlePress(item)}>
                    <View style={styles.card}>
                        <Text style={styles.cardText}>{item}</Text>
                    </View>
                </TouchableOpacity>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#7CFC00',
        width: 95,
        height: 90,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardText: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: '600',
        color: '#3a3838'
    }
})