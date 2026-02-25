import { Text, View, Image, StyleSheet } from 'react-native';

export default function ExcercisesHomepage({ searching }) {
    return (
        <View style={{ width: '100%', alignItems: 'center' }}>
            {searching?.length === 0
                ? <Text style={{ fontSize: 25, fontFamily: 'monospace', }}>No matches found</Text>
                : searching?.map(e => (
                    <View key={e.id} style={styles.container}>
                        <Image style={{ resizeMode: 'cover', width: '80%', height: '100%' }} source={{ uri: e?.image }} />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '83%', paddingBlock: 10, alignItems: 'center', }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 20, color: '#04b625' }}>{e.name}</Text>
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