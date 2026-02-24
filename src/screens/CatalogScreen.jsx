import { StyleSheet, View, ScrollView, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect } from "react";

import FilterButton from "../components/FilterButton";
import ExerciseCard from "../components/ExerciseCard";
import { useExercises } from "../contexts/exercises/useExercises";

export default function CatalogScreen() {
    const { getByExerciseType, getFullBodyExercises } = useExercises();
    const [exercises, setExercises] = useState([]);
    const [selected, setSelected] = useState("upper");

    useEffect(() => {
        async function load() {
            if (selected === "full") {
                const result = await getFullBodyExercises();
                setExercises(result);
            } else {
                const result = await getByExerciseType(selected);
                setExercises(result);
            }
        }
        load();
    }, [selected]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <View style={styles.selectOptions}>
                    <FilterButton label="Upper Body" value="upper" selected={selected} onPress={setSelected} />
                    <FilterButton label="Lower Body" value="lower" selected={selected} onPress={setSelected} />
                    <FilterButton label="Full Body" value="full" selected={selected} onPress={setSelected} />
                </View>
                {exercises.length === 0 ? <ActivityIndicator style={{ marginTop: 30 }} size={50} color="#21ef21" /> : ''}
                <ScrollView contentContainerStyle={{ width: '100%', alignItems: 'center', flexGrow: 1, paddingBottom: 10 }}>
                    <View style={styles.exercises}>
                        {exercises.map(exercise => <ExerciseCard key={exercise.id} exerciseData={exercise} />)}
                    </View>
                </ScrollView >
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        width: '100%',
        marginTop: 10,
        gap: 15,
    },
    selectOptions: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    selectOption: {
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

})