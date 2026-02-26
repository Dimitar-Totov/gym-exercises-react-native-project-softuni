import { StyleSheet, View, Text, TouchableOpacity, FlatList, ActivityIndicator } from "react-native";

import { X } from "lucide-react-native";
import { useState } from "react";
import { useAuth } from "../contexts/auth/useAuth";
import { useExercises } from "../contexts/exercises/useExercises";

export default function ExerciseComments({ commentsData, onClose, exerciseId }) {

    const PAGE_SIZE = 3;

    const { authState } = useAuth();
    const { deleteExerciseCommentById } = useExercises();
    const [page, setPage] = useState(1);
    const [visibleComments, setVisibleComments] = useState(
        commentsData.slice(0, PAGE_SIZE)
    );
    const [loadingMore, setLoadingMore] = useState(false);

    const loadMore = () => {
        if (loadingMore) return;

        const start = page * PAGE_SIZE;
        const end = start + PAGE_SIZE;

        const nextItems = commentsData.slice(start, end);

        if (nextItems.length === 0) return;

        setLoadingMore(true);

        setTimeout(() => {
            setVisibleComments(prev => [...prev, ...nextItems]);
            setPage(prev => prev + 1);
            setLoadingMore(false);
        }, 300);
    };

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

    async function deleteHandler(exerciseId, commentId) {
        try {
            await deleteExerciseCommentById(exerciseId, commentId);
        } catch (err) {
            console.log(err.message);
        }
    }
    const renderItem = ({ item }) => (
        <View style={styles.profileSection}>
            <View style={styles.comment}>
                <Text style={styles.author}>{item.username}</Text>
                <Text>{item.comment}</Text>
            </View>
            <View style={styles.deleteCommentSection}>
                <Text>
                    {timeAgo(item.createdAt)}
                </Text>
                {authState.user?.id === item.userId && <TouchableOpacity onPress={() => deleteHandler(exerciseId, item.id)}><Text>Delete</Text></TouchableOpacity>}
            </View>
        </View>
    );

    return (
        <View style={styles.commentsContainer}>
            <View style={styles.welcomeHeaderSection}>
                <Text style={styles.welcomeHeaderText}>Comments</Text>
                <TouchableOpacity onPress={onClose}><X size={30} /></TouchableOpacity>
            </View>
            {commentsData.length === 0
                ? <Text style={styles.noComments}>No comments yet</Text>
                : (
                    <FlatList
                        data={visibleComments}
                        keyExtractor={(item) => item.id}
                        renderItem={renderItem}
                        contentContainerStyle={{ paddingBottom: 20 }}
                        showsVerticalScrollIndicator={false}
                        onEndReached={loadMore}
                        ListFooterComponent={
                            loadingMore ? <ActivityIndicator style={{ marginVertical: 15 }} /> : null
                        }
                    />
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
        justifyContent: 'space-between',
        marginBottom: 15,
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
    },
    deleteCommentSection: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
        paddingLeft: 6,
        marginTop: 2
    }
})