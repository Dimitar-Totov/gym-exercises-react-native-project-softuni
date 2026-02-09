import { Text, View, Image, StyleSheet } from 'react-native';

export default function ExcercisesHomepage(props) {
    return (
        <View style={{ width: '100%', alignItems: 'center' }}>
            {props.searchedText.length === 0
                ? <Text style={{ fontSize: 25, fontFamily: 'monospace', }}>No matches found</Text>
                : props.searchedText.map(e => (
                    <View key={e.title} style={styles.container}>
                        <Image style={{ resizeMode: 'cover', width: '80%', height: '100%' }} source={{ uri: e.imageUrl }} />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '83%', paddingBlock: 10, alignItems: 'center', }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 20, color: '#04b625' }}>{e.title}</Text>
                            <Text style={{ fontFamily: 'sans-serif-light', fontStyle: 'italic', fontSize: 15 }}>Learn more...</Text>
                        </View>
                    </View>
                ))}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 250,
        alignItems: 'center',
        marginBottom: 70,
    }
})