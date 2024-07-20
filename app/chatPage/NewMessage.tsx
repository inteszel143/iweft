import { StyleSheet, Text, TouchableOpacity, View, Image, Platform, ActivityIndicator } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Avatar, Bubble, GiftedChat, IMessage, InputToolbar, Send, SystemMessage } from 'react-native-gifted-chat'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { postSendMessage, useGetMessage } from '@/query/message';
import { getMessages, postMessage } from '@/apis/message';
import ChatImageModal from '@/components/modal/ChatImageModal';
import { useQueryClient } from '@tanstack/react-query';
import LottieView from 'lottie-react-native';
export default function NewMessage() {
    const queryClient = useQueryClient();
    const [imageModal, setImageModal] = useState(false);
    const [messages, setMessages] = useState<IMessage[]>([]);
    const insets = useSafeAreaInsets();
    const [text, setText] = useState('');
    const { mutate: sentMessage } = postSendMessage({});

    const onSend = useCallback(async (messages = []) => {
        sentMessage({ text: messages[0]?.text });
        setMessages(previousMessages =>
            GiftedChat.append(previousMessages, messages),
        )
    }, []);



    const renderEmptyChat = () => {
        return (
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: wp(6),
            }}>
                <Text style={{
                    fontFamily: "UrbanistMedium",
                    fontSize: hp(1.8),
                    color: '#555',
                    textAlign: 'center',
                    marginBottom: 10,
                    transform: [{ rotate: '180deg' }, { scaleX: -1 }],
                }}>
                    Send a message to start a conversation.
                </Text>
            </View>
        );
    };



    return (
        <View style={[styles.container, { paddingBottom: Platform.OS === 'ios' ? hp(6) : 0 }]}>

            {imageModal && <ChatImageModal modalVisible={imageModal} setModalVisible={setImageModal} />}

            <GiftedChat
                messages={messages}
                onSend={(messages: any) => onSend(messages)}
                user={{ _id: 1 }}
                textInputProps={styles.composer}
                onInputTextChanged={setText}
                bottomOffset={insets.bottom}
                renderAvatar={null}
                maxComposerHeight={100}
                renderChatEmpty={() => renderEmptyChat()}
                renderSystemMessage={(props) => <SystemMessage {...props} />}
                // renderAvatar={(props) => <Avatar {...props} imageStyle={{
                //     left: {
                //         width: wp(7)
                //     }
                // }} />}
                renderBubble={(props) => {
                    return (
                        <Bubble {...props}
                            textStyle={{
                                right: {
                                    color: '#FFFFFF',
                                    fontFamily: 'UrbanistRegular',
                                    fontSize: hp(2)
                                },
                                left: {
                                    fontFamily: 'UrbanistRegular',
                                    fontSize: hp(2)
                                }
                            }}
                            wrapperStyle={{
                                left: {
                                    backgroundColor: '#F5F5F5',
                                    marginBottom: hp(1),
                                    paddingVertical: hp(1),
                                    paddingHorizontal: wp(2),
                                },
                                right: {
                                    backgroundColor: '#4986BE',
                                    marginBottom: hp(1),
                                    paddingVertical: hp(1),
                                    paddingHorizontal: wp(2),
                                },
                            }}
                        />
                    );
                }}
                renderSend={(props) => (
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: 44,
                        gap: wp(5),
                        paddingHorizontal: wp(4)
                    }}>
                        {text.length > 0 && (
                            <Send{...props} containerStyle={{ justifyContent: 'center' }}>
                                <View
                                    style={{
                                        width: wp(10),
                                        height: wp(10),
                                        backgroundColor: "#0A5CA8",
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderRadius: wp(5),
                                    }}
                                >
                                    <FontAwesome name='send' size={hp(2)} color={'#fff'} />
                                </View>


                            </Send>
                        )}
                        {text.length === 0 && (
                            <>
                                <TouchableOpacity
                                    onPress={() => setImageModal(true)}
                                >
                                    <Ionicons name='image-outline' size={hp(3)} color={'#9E9E9E'} />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{
                                        width: wp(10),
                                        height: wp(10),
                                        backgroundColor: "#0A5CA8",
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderRadius: wp(5),
                                    }}
                                >
                                    <Ionicons name='mic-sharp' size={hp(3)} color={'#fff'} />
                                </TouchableOpacity>
                            </>
                        )}
                    </View>
                )}
                renderInputToolbar={(props) => (
                    <InputToolbar {...props} containerStyle={{ backgroundColor: 'white', }}

                        renderActions={() => (
                            <View style={{ height: 44, justifyContent: 'center', alignItems: 'center', left: 4 }}>

                            </View>
                        )}
                    />

                )}
            />


        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    composer: {
        backgroundColor: '#F5F5F5',
        borderRadius: wp(2),
        minHeight: 44,
        maxHeight: hp(13),
        paddingHorizontal: wp(4),
        fontSize: 16,
        marginVertical: 4,
        marginTop: hp(1),
        fontFamily: 'UrbanistRegular',
        paddingTop: Platform.OS === 'ios' ? hp(1.5) : 0,
    }
})