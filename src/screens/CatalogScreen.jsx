import { StyleSheet, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useMemo, useState } from "react";

import * as data from '../data/data.json'
import FilterButton from "../components/FilterButton";
import ExerciseCard from "../components/ExerciseCard";

export default function CatalogScreen() {
    const [selected, setSelected] = useState("upper");
    const filteredData = useMemo(() => {
        if (selected === "full")
            return data.exercises.map(item => item.title);

        return data.exercises
            .filter(item => item.type === selected)
            .map(item => item.title);
    }, [selected]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <View style={styles.selectOptions}>
                    <FilterButton label="Upper Body" value="upper" selected={selected} onPress={setSelected} />
                    <FilterButton label="Lower Body" value="lower" selected={selected} onPress={setSelected} />
                    <FilterButton label="Full Body" value="full" selected={selected} onPress={setSelected} />
                </View>
                <ScrollView contentContainerStyle={{ width: '100%', alignItems: 'center',flexGrow: 1, paddingBottom: 10}}>
                    <View style={styles.exercises}>
                        {filteredData.map(title => <ExerciseCard key={title} title={title} />)}
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