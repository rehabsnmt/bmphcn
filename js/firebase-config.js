// File: js/firebase-config.js

// 1. Cấu hình Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDVT4akTw65Uj6KHymwWtQ9xyHVyfTlXIY",
    authDomain: "bmphcn-aa9c6.firebaseapp.com",
    projectId: "bmphcn-aa9c6",
    storageBucket: "bmphcn-aa9c6.firebasestorage.app",
    messagingSenderId: "749494392719",
    appId: "1:749494392719:web:f220c751ff541620045dfa",
    measurementId: "G-LBLG62PTDK"
};

// 2. Khởi tạo Firebase (Sử dụng bản Compat)
firebase.initializeApp(firebaseConfig);

// 3. Khởi tạo các dịch vụ để dùng chung toàn web
const auth = firebase.auth();
const db = firebase.firestore();
