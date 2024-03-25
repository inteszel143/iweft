export const messageChat = [
  {
    _id: 6,
    text: "Here I send a photo of the sofa",
    createdAt: new Date(),
    user: {
      _id: 1,
      name: "Me",
      avatar: "https://placeimg.com/140/140/any",
    },
  },
  {
    _id: 5,
    text: "Good, thanks Jenny...",
    createdAt: new Date(),
    user: {
      _id: 1,
      name: "Me",
      avatar: "https://placeimg.com/140/140/any",
    },
  },
  {
    _id: 4,
    text: "Yes, we have received your order. and will come on that date! 😁😁",
    createdAt: new Date(),
    user: {
      _id: 2,
      name: "Jenny",
      avatar: "https://placeimg.com/140/140/any",
    },
  },
  {
    _id: 3,
    text: "Hi, morning too Andrew!",
    createdAt: new Date(),
    user: {
      _id: 2,
      name: "Jenny",
      avatar: "https://placeimg.com/140/140/any",
    },
  },
  {
    _id: 2,
    text: "I have booked your sofa cover cleaning service for December 23 at 10 AM 😊",
    createdAt: new Date(),
    user: {
      _id: 1,
      name: "Me",
      avatar: "https://placeimg.com/140/140/any",
    },
  },
  {
    _id: 1,
    text: "Hi Jenny. good morning 😊",
    createdAt: new Date(),
    user: {
      _id: 1,
      name: "Me",
      avatar: "https://placeimg.com/140/140/any",
    },
  },
];

export const menuChat = [
  {
    label: "Info & Support",
    icon: require("@/assets/icons/chatinfo.jpg"),
    separator: true,
    color: "#000",
  },
  {
    label: "Chat Settings",
    icon: require("@/assets/icons/chatsetting.jpg"),
    separator: true,
    color: "#000",
  },
  {
    label: "Report User",
    icon: require("@/assets/icons/chatwarning.jpg"),
    separator: false,
    color: "#F75555",
  },
];
