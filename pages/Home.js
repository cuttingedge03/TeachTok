// UserComponent.js
import React, { useState, useEffect } from 'react';
import { FlatList, Image, StyleSheet, View, Dimensions, TouchableOpacity, Text, SafeAreaView } from 'react-native';
import * as service from '../network/service';
import QuestionComponent from './QuestionComponent';
import MCQComponent from './MCQComponent';
import { Platform } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const Home = () => {
    const [pages, setPages] = useState([0]);
    const [dynamicImages, setDynamicImages] = useState([]);
    const [selectedButton, setSelectedButton] = useState(0);
    const [followingResponse, setFollowingResponse] = useState(null);
    const [forYouResponse, setForYouResponse] = useState(null);
    const screenHeight = Platform.OS === 'ios' ? Dimensions.get('window').height - 80 : Dimensions.get('window').height - 104;

    const addPage = () => {
        setPages(prev => [...prev, 1]);
    };

    const addDynamicImage = (newImage) => {
        setDynamicImages(prevImages => [...prevImages, newImage]);
    };

    const [timer, setTimer] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTimer((prevTimer) => prevTimer + 1);
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        fetchData()
    }, [selectedButton, pages]);

    const fetchData = () => {
        selectedButton === 0 ?
            service.getFollowing()
                .then(response => {
                    setFollowingResponse(response)
                })
                .catch(error => console.error(error)) :
            service.getForYou()
                .then(response => {
                    setForYouResponse(response)
                    addDynamicImage(response.image)

                    console.log("length is " + dynamicImages.length)
                    if(dynamicImages.length === 0){
                        console.log("fetched again");
                        service.getForYou()
                        .then(response => {
                            addDynamicImage(response.image)
                        })
                        .catch(error => console.error(error));
                    }   
                })
                .catch(error => console.error(error));
    }

    const formatTime = (seconds) => {
        if (seconds < 60) return `${seconds}s`;
        if (seconds < 3600) return `${Math.floor(seconds / 60)}m`;
        return `${Math.floor(seconds / 3600)}h`;
    };

    const getDescription = () => {
        if (selectedButton === 0) {
            if (followingResponse === null)
                return '';
            else
                return followingResponse.description;
        } else {
            if (forYouResponse === null)
                return '';
            else
                return forYouResponse.description;
        }
    };

    const getName = () => {
        if (selectedButton === 0) {
            if (followingResponse === null)
                return '';
            else
                return followingResponse.user.name;
        } else {
            if (forYouResponse === null)
                return '';
            else
                return forYouResponse.user.name;
        }
    };

    const getPlaylistName = () => {
        if (selectedButton === 0) {
            if (followingResponse === null)
                return '';
            else
                return followingResponse.playlist;
        } else {
            if (forYouResponse === null)
                return '';
            else
                return forYouResponse.playlist;
        }
    };
    return (
        <View style={styles.outer}>
            <SafeAreaView style={styles.fullScreenOverlay}>
                <View >
                    <Image source={require('../images/search.png')} style={styles.topRightIcon} />

                    <View style={styles.timerContainer}>
                        <Image source={require('../images/timer.png')} style={styles.topleftIcon} />
                        <Text style={styles.timerText}>{formatTime(timer)}</Text>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={() => setSelectedButton(0)} style={selectedButton === 0 ? styles.selectedButton : styles.button}>
                            <Text style={selectedButton === 0 ? styles.selectedButtonText : styles.buttonText}>Following</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setSelectedButton(1)} style={selectedButton === 1 ? styles.selectedButton : styles.button}>
                            <Text style={selectedButton === 1 ? styles.selectedButtonText : styles.buttonText}>For You</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
            <FlatList
                data={selectedButton === 0 ? pages : dynamicImages}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <LinearGradient
                        colors={['#001D28', '#00425A']}
                        start={{ x: 0.5, y: 0 }}
                        end={{ x: 0.5, y: 1 }}
                        style={styles.container}
                    >
                        <View style={{ ...styles.container, height: screenHeight }}>
                            {selectedButton === 1 && <Image
                                source={forYouResponse === null ? '' : { uri: item }}
                                style={{ ...styles.image, height: screenHeight }}
                            />}
                            {selectedButton === 0 ? <QuestionComponent response={followingResponse} /> :
                                forYouResponse !== null && <MCQComponent questionData={forYouResponse} />}

                            <Image source={selectedButton === 0 ? require('../images/action_bar2.png') : require('../images/action_bar.png')} style={styles.icon} />
                            <View style={styles.nameContainer}>
                                <Text style={styles.nameText}>{getName()}</Text>
                                <Text style={styles.descText}>{getDescription()}</Text>
                            </View>
                            <View style={styles.playlistContainer}>
                                <Image source={require('../images/arrow.png')} style={styles.playlistRightImage} />
                                <View style={styles.playlistTextContainer}>
                                    <Image
                                        source={require('../images/video.png')}
                                        style={styles.playlistLeftImage}
                                    />
                                    <Text style={styles.playlistText}>Playlist · Unit 5: {getPlaylistName()}</Text>
                                </View>
                            </View>
                        </View>
                    </LinearGradient>
                )}
                pagingEnabled
                vertical
                showsVerticalScrollIndicator={false}
                onEndReached={selectedButton === 0 ? addPage : fetchData} // Call the API again when user scrolls to the end
                onEndReachedThreshold={0.1} // Adjust this value based on when you want to trigger the API call
            />
        </View>
    );
};

const styles = StyleSheet.create({
    outer: {
        flex: 1,
    },
    container: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    fullScreenOverlay: {
        position: 'absolute',
        width: '100%',
        height: '20%',
        zIndex: 1,
    },
    image: {
        width: '100%',
        height: '100%',
        position: 'absolute', // Position the image in the background
        resizeMode: 'cover', // Cover the whole screen
    },
    button: {
        backgroundColor: 'blue',
        padding: 10,
        margin: 5,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
    },
    icon: {
        position: 'absolute',
        maxHeight: '50%',
        bottom: 85,
        right: -15,
        resizeMode: 'contain',
    },
    topRightIcon: {
        position: 'absolute',
        width: 16,
        height: 16,
        top: 24,
        right: 20,
        zIndex: 1,
    },
    topleftIcon: {
        width: 16,
        height: 16,
        zIndex: 1,
    },
    buttonContainer: {
        position: 'absolute',
        top: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        zIndex: 1,
    },
    button: {
        paddingHorizontal: 10,
        paddingBottom: 5,
    },
    selectedButton: {
        paddingHorizontal: 10,
        borderBottomWidth: 4,
        paddingBottom: 5,
        borderColor: 'white',
    },
    buttonText: {
        color: 'white',
        fontSize: 14,
    },
    selectedButtonText: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
    },
    timerContainer: {
        position: 'absolute',
        top: 24,
        left: 20,
        height: 16,
        flexDirection: 'row',
        alignItems: 'center',
    },
    timerText: {
        marginLeft: 5,
        fontSize: 14,
        color: 'white',
    },
    playlistTextContainer: {
        backgroundColor: 'black',
        width: Dimensions.get('window').width, // Takes the full width
        flexDirection: 'row', // Align items horizontally
        alignItems: 'center', // Center vertically
    },
    playlistLeftImage: {
        width: 16,
        height: 16,
        marginHorizontal: 5,
    },
    playlistRightImage: {
        width: 16,
        height: 16,
        position: 'absolute',
        right: 10,
        zIndex: 1,
        top: 10,
    },
    playlistText: {
        color: 'white',
        fontSize: 12,
        padding: 10,
    },

    nameText: {
        color: 'white',
        fontSize: 15,
        fontWeight: '600',
        textAlign: 'left',
    },
    descText: {
        color: 'white',
        fontSize: 12,
        textAlign: 'left',
    },
    playlistContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#161616',
    },

    nameContainer: {
        width: '100%',
        padding: 8,
        position: 'absolute',
        bottom: 50,
    },

});

export default Home;

