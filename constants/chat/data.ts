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

export const customerSupport = [
  {
    _id: 5,
    text: "Yes Sandra, I’m on the most recent version of the app, are there any other possible causes?",
    createdAt: new Date(),
    user: {
      _id: 1,
      name: "Me",
      avatar: "https://placeimg.com/140/140/any",
    },
  },
  {
    _id: 4,
    text: "Do you have the latest version of the iweft app? There may be an update waiting for you on the app store. - Sandra, Customer Assistant",
    createdAt: new Date(),
    user: {
      _id: 2,
      name: "Jenny",
      avatar: "https://placeimg.com/140/140/any",
    },
  },
  {
    _id: 3,
    text: "Hello, we’re sorry to hear that you’re having trouble with your app! Lets get this fixed right away! - Sandra, Customer Assistant",
    createdAt: new Date(),
    user: {
      _id: 2,
      name: "Jenny",
      avatar: "https://placeimg.com/140/140/any",
    },
  },
  {
    _id: 2,
    text: "I cannot see my upcoming bookings in my app.",
    createdAt: new Date(),
    user: {
      _id: 1,
      name: "Me",
      avatar: "https://placeimg.com/140/140/any",
    },
  },
  {
    _id: 1,
    text: "Hi, I’m having an issue...",
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

export const chatListing = [
  {
    id: 1,
    img: require("@/assets/temp/chaticons/person1.jpg"),
    name: "Jenny Wilson",
    message: "I have booked your house ...",
    unread: 2,
    time: "13:29",
  },
  {
    id: 2,
    img: require("@/assets/temp/chaticons/person2.jpg"),
    name: "Alfonzo Schuessler",
    message: "I just finished it 😂😂",
    unread: 3,
    time: "10:48",
  },
  {
    id: 3,
    img: require("@/assets/temp/chaticons/person3.jpg"),
    name: "Benny Spanbauer",
    message: "omg, this is amazing 🔥🔥🔥",
    unread: 0,
    time: "09:25",
  },
  {
    id: 4,
    img: require("@/assets/temp/chaticons/person4.jpg"),
    name: "Marci Senter",
    message: "Wow, this is really epic 😎",
    unread: 2,
    time: "Yesterday",
  },
  {
    id: 5,
    img: require("@/assets/temp/chaticons/person5.jpg"),
    name: "Kylee Danford",
    message: "just ideas for next time 😆",
    unread: 0,
    time: "Dec 20, 2024",
  },
  {
    id: 6,
    img: require("@/assets/temp/chaticons/person6.jpg"),
    name: "Merrill Kervin",
    message: "How are you? 😄😄",
    unread: 0,
    time: "Dec 20, 2024",
  },
  {
    id: 7,
    img: require("@/assets/temp/chaticons/person7.jpg"),
    name: "Pedro Huard",
    message: "perfect! 💯💯💯",
    unread: 0,
    time: "Dec 18, 2024",
  },
  {
    id: 8,
    img: require("@/assets/temp/chaticons/person8.jpg"),
    name: "Edgar Torrey",
    message: "Nice Job! 💯💯💯",
    unread: 0,
    time: "Dec 20, 2023",
  },
  {
    id: 9,
    img: require("@/assets/temp/chaticons/person9.jpg"),
    name: "Stephen Bishop",
    message: "Thankyou! 😄😄",
    unread: 0,
    time: "Dec 20, 2022",
  },
];

export const callListing = [
  {
    id: 1,
    img: require("@/assets/temp/chaticons/person9.jpg"),
    name: "Lauralee Quintero",
    status: "Incoming",
    statusicon: require("@/assets/temp/chaticons/incoming.jpg"),
    date: "Dec 19, 2024",
  },
  {
    id: 2,
    img: require("@/assets/temp/chaticons/person8.jpg"),
    name: "Tanner Stafford",
    status: "Outgoing",
    statusicon: require("@/assets/temp/chaticons/outgoing.jpg"),
    date: "Dec 17, 2024",
  },
  {
    id: 3,
    img: require("@/assets/temp/chaticons/person7.jpg"),
    name: "Augustina Midgett",
    status: "Missed",
    statusicon: require("@/assets/temp/chaticons/missed.jpg"),
    date: "Nov 28, 2024",
  },
  {
    id: 4,
    img: require("@/assets/temp/chaticons/person6.jpg"),
    name: "Geoffrey Mott",
    status: "Outgoing",
    statusicon: require("@/assets/temp/chaticons/outgoing.jpg"),
    date: "Nov 24, 2024",
  },
  {
    id: 5,
    img: require("@/assets/temp/chaticons/person5.jpg"),
    name: "Roselle Ehrman",
    status: "Incoming",
    statusicon: require("@/assets/temp/chaticons/incoming.jpg"),
    date: "Nov 14, 2024",
  },
  {
    id: 6,
    img: require("@/assets/temp/chaticons/person4.jpg"),
    name: "Roselle Ehrman",
    status: "Incoming",
    statusicon: require("@/assets/temp/chaticons/incoming.jpg"),
    date: "Nov 14, 2024",
  },
  {
    id: 7,
    img: require("@/assets/temp/chaticons/person3.jpg"),
    name: "Thad Eddings",
    status: "Outgoing",
    statusicon: require("@/assets/temp/chaticons/outgoing.jpg"),
    date: "Oct 30, 2024",
  },
  {
    id: 8,
    img: require("@/assets/temp/chaticons/person2.jpg"),
    name: "Daryl Nehls",
    status: "Incoming",
    statusicon: require("@/assets/temp/chaticons/incoming.jpg"),
    date: "Oct 29, 2024",
  },
  {
    id: 9,
    img: require("@/assets/temp/chaticons/person1.jpg"),
    name: "Francene Vandyne",
    status: "Missed",
    statusicon: require("@/assets/temp/chaticons/missed.jpg"),
    date: "Oct 25, 2024",
  },
];
