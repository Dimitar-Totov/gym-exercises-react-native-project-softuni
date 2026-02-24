import { Text, StyleSheet, TouchableOpacity } from "react-native"
import { useNavigation } from '@react-navigation/native';

import { ArrowRight } from 'lucide-react-native';

export default function ExerciseCard({ exerciseData }) {
    const navigation = useNavigation();

    return (
        <TouchableOpacity style={styles.exercise} onPress={() => navigation.navigate('Details Page', { exerciseData })}>
            <Text style={{ fontWeight: '600', fontSize: 18, }}>{exerciseData.name}</Text>
            <ArrowRight />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
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