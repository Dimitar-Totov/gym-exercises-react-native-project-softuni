import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

import { X } from "lucide-react-native";

export default function ExerciseComments({ commentsData, onClose }) {

    function timeAgo(timestamp) {
        const date = new Date(
            timestamp.seconds * 1000 + Math.floor(timestamp.nanoseconds / 1000000)
        );
        const now = new Date();
        const diff = now - date;

        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (seconds < 60) return 'Just now';
        if (minutes < 60) return `${minutes}m`;
        if (hours < 24) return `${hours}h`;
        if (days < 7) return `${days}d`;

        return date.toLocaleDateString('bg-BG', { day: 'numeric', month: 'long', year: 'numeric' });
    }
    //TODO Add flat list to comments
    return (
        <View style={styles.commentsContainer}>
            <View style={styles.welcomeHeaderSection}>
                <Text style={styles.welcomeHeaderText}>Comments</Text>
                <TouchableOpacity onPress={onClose}><X size={30} /></TouchableOpacity>
            </View>
            {commentsData.length === 0
                ? <Text style={styles.noComments}>No comments yet</Text>
                : commentsData.map(c =>
                (
                    <View key={c.id} style={styles.profileSection}>
                        <View style={styles.comment}>
                            <Text style={styles.author}>{c.username}</Text>
                            <Text>{c.comment}</Text>
                        </View>
                        <Text style={{paddingLeft: 6,marginTop: 2}}>{timeAgo(c.createdAt)}</Text>
                    </View>
                )
                )}
        </View>
    )
}

const styles = StyleSheet.create({
    commentsContainer: {
        flex: 1,
        paddingInline: 15,
        paddingTop: 10,
        borderTopWidth: 2,
        borderTopColor: '#ddd',
    },
    welcomeHeaderSection: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    welcomeHeaderText: {
        fontWeight: 'bold',
        fontSize: 25
    },
    profileSection: {
        marginBottom: 10
    },
    comment: {
        backgroundColor: '#eee',
        alignSelf: 'flex-start',
        maxWidth: '80%',
        padding: 10,
        borderRadius: 13,
    },
    author: {
        fontWeight: 'bold'
    },
    noComments: {
        marginTop: 10,
        fontStyle: 'italic'
    }
})