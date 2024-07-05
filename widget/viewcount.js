// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBPoDYIUNaKFo0ydWHsZL8HQStpEar2rqg",
  authDomain: "abengkriscom-1716903358301.firebaseapp.com",
  databaseURL: "https://abengkriscom-1716903358301-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "abengkriscom-1716903358301",
  storageBucket: "abengkriscom-1716903358301.appspot.com",
  messagingSenderId: "427645431962",
  appId: "1:427645431962:web:d0a44267e826deeb98af23",
  measurementId: "G-KKGPQCXKGK"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Function to update view count
function updateViewCount() {
  var postId = document.querySelector('.wendy-view-post').getAttribute('data-view');
  var pageRef = firebase.database().ref(postId);
  pageRef.transaction(function(currentViews) {
    return (currentViews || 0) + 1;
  });
}

// Function to display view count
function displayViewCount() {
  var postId = document.querySelector('.wendy-view-post').getAttribute('data-view');
  var pageRef = firebase.database().ref(postId);
  pageRef.on('value', function(snapshot) {
    var viewCount = snapshot.val() || 0;
    var viewCountElements = document.querySelectorAll('.wendy-view-post');
    viewCountElements.forEach(function(element) {
      element.classList.remove('hidden');
      element.textContent = viewCount + ' views';
    });
  });
}

// Load view count on page load
window.onload = function() {
  updateViewCount();
  displayViewCount();
};