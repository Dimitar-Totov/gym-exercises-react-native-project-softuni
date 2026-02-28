import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
    Text,
    View,
    Image,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';

export default function ExcercisesHomepage({ searching }) {
    const navigation = useNavigation();

    const [showNoMatches, setShowNoMatches] = useState(false);

    useEffect(() => {
        if (searching?.length === 0) {
            const timer = setTimeout(() => setShowNoMatches(true), 1000);
            return () => clearTimeout(timer);
        } else {
            setShowNoMatches(false);
        }
    }, [searching]);

    return (
        <View style={{ width: '100%', alignItems: 'center' }}>
            {searching?.length === 0 && showNoMatches
                ? <Text style={{ fontSize: 25, fontFamily: 'monospace', }}>No matches found</Text>
                : searching?.map(e => (
                    <View key={e.id} style={styles.container}>
                        <Image style={{ resizeMode: 'cover', width: '80%', height: '100%' }} source={{ uri: e?.image }} />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '83%', paddingBlock: 10, alignItems: 'center', }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 20, color: '#04b625' }}>{e.name}</Text>
                            <TouchableOpacity onPress={() => navigation.navigate('Details Page', { exerciseId: e.id })}>
                                <Text style={{ fontFamily: 'sans-serif-light', fontStyle: 'italic', fontSize: 15 }}>Learn more...</Text>
                            </TouchableOpacity>
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
    },
})