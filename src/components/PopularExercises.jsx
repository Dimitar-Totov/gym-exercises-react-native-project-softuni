import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native';

export default function PopularExercises({ navigation, mostLiked, errorMessage }) {

    const viewAllPressHandler = () => navigation.navigate('Exercises');

    return (
        <View style={{ justifyContent: 'center', marginTop: 25 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginBottom: 20, alignItems: 'center' }}>
                <Text style={{ fontSize: 30 }}>Popular Exercises</Text>
                <TouchableOpacity onPress={viewAllPressHandler} style={{ backgroundColor: '#65da5a', paddingInline: 15, paddingBlock: 10, borderRadius: 5 }}>
                    <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 18 }}>View All</Text>
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'columns', justifyContent: 'center' }}>
                {errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}
                <View style={styles.popularExerciseCardContainer}>
                    {mostLiked.map((e) =>
                        <View key={e.id} style={styles.card}>
                            <Image style={styles.popularExercisesImage} source={{ uri: e?.['image-url'] }} />
                            <View style={{ flexDirection: 'row', width: '83%', justifyContent: 'space-between' }}>
                                <Text style={styles.popularExercisesText}>{e.name}</Text>
                                <TouchableOpacity onPress={() => navigation.navigate('Details Page', { exerciseId: e.id })}><Text style={styles.button}>Learn more...</Text></TouchableOpacity>
                            </View>
                        </View>
                    )}
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    popularExerciseCardContainer: {
        width: '100%',
        marginBottom: 30,
    },
    card: {
        alignItems: 'center',
        marginBottom: 20,
    },
    popularExercisesText: {
        fontSize: 17,
        fontWeight: 'bold'
    },
    popularExercisesImage: {
        width: 350,
        height: 350,
        resizeMode: 'cover',
        borderRadius: 10,
        marginBottom: 10
    },
    button: {
        fontFamily: 'sans-serif-light',
        fontStyle: 'italic'
    },
    errorMessage: {
        position: 'absolute',
        top: 0,
        left: '45%',
        fontSize: 20
    }
})