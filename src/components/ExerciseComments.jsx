import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
    TextInput,
    KeyboardAvoidingView,
    Platform
} from "react-native";

import { X, SendHorizonal } from "lucide-react-native";
import { useState, useEffect } from "react";
import { useAuth } from "../contexts/auth/useAuth";
import { useExercises } from "../contexts/exercises/useExercises";

export default function ExerciseComments({ onClose, exerciseId, commentsData }) {

    const { authState } = useAuth();
    const { deleteExerciseCommentById, postExerciseCommentById } = useExercises();

    const [loadingMore, setLoadingMore] = useState(false);
    const [commentInput, setCommentInput] = useState('');
    const [error, setError] = useState('');

    const PAGE_SIZE = 3;

    const [page, setPage] = useState(1);
    const [visibleComments, setVisibleComments] = useState(
        commentsData.slice(0, PAGE_SIZE)
    );

    useEffect(() => {
        setVisibleComments(commentsData.slice(0, PAGE_SIZE));
        setPage(1);
    }, [commentsData]);

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
        if (!timestamp) return "Just now";
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

    const postCommentHandler = async () => {
        if (commentInput.length === 0) return;
        try {
            await postExerciseCommentById(exerciseId, authState.user.id, commentInput, authState.user.username);
            setCommentInput('')
        } catch (error) {
            setError(error.message);
        }
    }
    return (
        <View style={styles.commentsContainer}>
            <View style={styles.welcomeHeaderSection}>
                <Text style={styles.welcomeHeaderText}>Comments</Text>
                <TouchableOpacity onPress={onClose}><X size={30} /></TouchableOpacity>
                {error && <Text style={styles.errorMessage}>{error}</Text>}
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
            {authState.user &&
                <View style={styles.writeCommentSection}>
                    <TextInput
                        style={styles.writeCommentInput}
                        onChangeText={setCommentInput}
                        value={commentInput}
                        placeholder="Share your thoughts about this exercise..."
                    />
                    <TouchableOpacity onPress={postCommentHandler}>
                        <SendHorizonal />
                    </TouchableOpacity>
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    commentsContainer: {
        position: 'absolute',
        position: 'absolute',
        bottom: 0,
        backgroundColor: '#fff',
        height: '50%',
        width: '100%',
        justifyContent: 'space-between',
        padding: 10,
        borderTopWidth: 2,
        borderTopColor: '#464444'
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
        marginBottom: 10,
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
        position: 'absolute',
        fontStyle: 'italic',
        top: '50%',
        right: '40%'
    },
    deleteCommentSection: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
        paddingLeft: 6,
        marginTop: 2
    },
    writeCommentSection: {
        width: "100%",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 18,
        backgroundColor: "#f7f7f7",
        borderRadius: 14,
        fontSize: 16,
        borderWidth: 1,
        borderColor: "#e0e0e0",
        color: "#333",
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 2,
    },
    writeCommentInput: {
        width: '90%'
    },
    errorMessage: {
        position: 'absolute',
        bottom: -30,
        fontSize: 15
    }
})