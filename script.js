// // Chatbot window controls and functionality

// let isMinimized = false;
// let isMaximized = false;
// let chatWindow;

// // Initialize when DOM is loaded
// document.addEventListener('DOMContentLoaded', function() {
//     chatWindow = document.querySelector('.chat-window');
    
//     // If chat window doesn't exist, try alternate selector
//     if (!chatWindow) {
//         chatWindow = document.querySelector('.w-\\[380px\\]') || 
//                     document.querySelector('[class*="380px"]') ||
//                     document.querySelector('.rounded-3xl');
//     }
// });

// function minimizeWindow() {
//     if (!chatWindow) return;
    
//     if (!isMinimized) {
//         chatWindow.classList.add('window-minimized');
//         isMinimized = true;
        
//         // Show a small restore button
//         setTimeout(() => {
//             const restoreBtn = document.createElement('button');
//             restoreBtn.innerHTML = '📱 Chat';
//             restoreBtn.className = 'fixed bottom-4 left-4 bg-purple-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-purple-700 btn-transition';
//             restoreBtn.onclick = restoreWindow;
//             restoreBtn.id = 'restore-btn';
//             document.body.appendChild(restoreBtn);
//         }, 300);
//     }
// }

// function restoreWindow() {
//     if (!chatWindow) return;
    
//     chatWindow.classList.remove('window-minimized');
//     isMinimized = false;
//     isMaximized = false;
    
//     // Remove restore button
//     const restoreBtn = document.getElementById('restore-btn');
//     if (restoreBtn) restoreBtn.remove();
// }

// function maximizeWindow() {
//     if (!chatWindow) return;
    
//     if (!isMaximized) {
//         chatWindow.classList.remove('w-[380px]');
//         chatWindow.classList.add('w-full', 'h-full', 'max-w-4xl', 'max-h-screen');
//         isMaximized = true;
//     } else {
//         chatWindow.classList.add('w-[380px]');
//         chatWindow.classList.remove('w-full', 'h-full', 'max-w-4xl', 'max-h-screen');
//         isMaximized = false;
//     }
// }

// function closeWindow() {
//     if (confirm('Are you sure you want to close the chat window?')) {
//         if (chatWindow) {
//             chatWindow.style.display = 'none';
//         }
//     }
// }

// // Auto-scroll to bottom when new messages are added
// function scrollToBottom() {
//     const chatArea = document.querySelector('.chat-area');
//     if (chatArea) {
//         chatArea.scrollTop = chatArea.scrollHeight;
//     }
// }

// // Add message function (for future use)
// function addMessage(message, isUser = false) {
//     const chatArea = document.querySelector('.chat-area');
//     if (!chatArea) return;
    
//     const messageDiv = document.createElement('div');
//     messageDiv.className = `flex items-start gap-2 ${isUser ? 'justify-end' : ''}`;
    
//     if (isUser) {
//         messageDiv.innerHTML = `
//             <div>
//                 <div class="bg-purple-600 text-white p-3 rounded-xl shadow text-sm">
//                     ${message}
//                 </div>
//                 <p class="text-xs text-gray-400 pt-1">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} ✓</p>
//             </div>
//             <img src="https://i.pravatar.cc/40?img=1" class="w-8 h-8 rounded-full">
//         `;
//     } else {
//         messageDiv.innerHTML = `
//             <div class="w-8 h-8 flex items-center justify-center rounded-full bg-purple-700">
//                 <svg width="22" height="22" viewBox="0 0 100 100">
//                     <circle cx="50" cy="50" r="48" fill="#6800A4"/>
//                     <path d="M20 40 Q50 15 80 40 Q50 65 20 40" fill="white"/>
//                     <rect x="38" y="38" width="24" height="10" rx="5" fill="#1A0A33"/>
//                     <circle cx="45" cy="43" r="3" fill="#22E6FF"/>
//                     <circle cx="55" cy="43" r="3" fill="#22E6FF"/>
//                 </svg>
//             </div>
//             <div>
//                 <div class="bg-white p-3 rounded-xl shadow text-gray-700 text-sm">
//                     ${message}
//                 </div>
//                 <p class="text-xs text-gray-400 pt-1">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} ✓</p>
//             </div>
//         `;
//     }
    
//     chatArea.appendChild(messageDiv);
//     scrollToBottom();
// }

// // Handle form submission
// document.addEventListener('DOMContentLoaded', function() {
//     const input = document.querySelector('input[placeholder*="message"]');
//     const sendButton = document.querySelector('button[class*="bg-purple-600"]');
    
//     if (input && sendButton) {
//         sendButton.addEventListener('click', function() {
//             const message = input.value.trim();
//             if (message) {
//                 addMessage(message, true);
//                 input.value = '';
                
//                 // Simulate bot response after a delay
//                 setTimeout(() => {
//                     addMessage("Thanks for your message! This is a demo response.", false);
//                 }, 1000);
//             }
//         });
        
//         input.addEventListener('keypress', function(e) {
//             if (e.key === 'Enter') {
//                 sendButton.click();
//             }
//         });
//     }
// });
