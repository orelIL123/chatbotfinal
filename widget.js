/**
 * GPT-Chat Widget
 * A customizable chat widget for websites that connects to a GPT-powered backend
 * 
 * Usage:
 * 1. Include this script in your HTML
 * 2. Initialize with GPTChatWidget.init({options})
 */

(function() {
  'use strict';

  // Widget default configuration
  const DEFAULT_CONFIG = {
    apiUrl: '/api/chat',
    clientId: 'default',
    primaryColor: '#0078ff',
    secondaryColor: '#f0f4f8',
    position: 'bottom-right',
    headerText: 'שאל/י אותנו',
    welcomeMessage: 'שלום! במה אוכל לעזור לך היום?',
    placeholderText: 'הקלד/י הודעה...',
    autoOpen: false,
    zIndex: 9999
  };

  // Widget state
  let config = { ...DEFAULT_CONFIG };
  let widgetElement = null;
  let chatBodyElement = null;
  let isOpen = false;
  let isInitialized = false;

  // Main widget object
  window.GPTChatWidget = {
    /**
     * Initialize the chat widget
     * @param {Object} options - Configuration options
     */
    init: function(options = {}) {
      if (isInitialized) {
        console.warn('GPT-Chat Widget is already initialized');
        return;
      }

      // Merge default config with user options
      config = { ...DEFAULT_CONFIG, ...options };
      
      // Create and append widget HTML
      createWidgetHTML();
      
      // Add event listeners
      addEventListeners();
      
      // Mark as initialized
      isInitialized = true;
      
      // Auto open if configured
      if (config.autoOpen) {
        this.open();
      }
      
      console.log('GPT-Chat Widget initialized successfully');
    },
    
    /**
     * Open the chat widget
     */
    open: function() {
      if (!isInitialized) {
        console.error('GPT-Chat Widget is not initialized');
        return;
      }
      
      widgetElement.classList.add('open');
      isOpen = true;
      
      // Add welcome message if chat is empty
      if (chatBodyElement.children.length === 0) {
        addBotMessage(config.welcomeMessage);
      }
      
      // Focus input field
      setTimeout(() => {
        const inputField = widgetElement.querySelector('.gpt-chat-input');
        if (inputField) {
          inputField.focus();
        }
      }, 300);
    },
    
    /**
     * Close the chat widget
     */
    close: function() {
      if (!isInitialized) {
        console.error('GPT-Chat Widget is not initialized');
        return;
      }
      
      widgetElement.classList.remove('open');
      isOpen = false;
    },
    
    /**
     * Toggle the chat widget open/closed state
     */
    toggle: function() {
      if (isOpen) {
        this.close();
      } else {
        this.open();
      }
    },
    
    /**
     * Send a message programmatically
     * @param {string} message - Message text to send
     */
    sendMessage: function(message) {
      if (!isInitialized) {
        console.error('GPT-Chat Widget is not initialized');
        return;
      }
      
      handleSendMessage(message);
    }
  };

  /**
   * Create the widget HTML structure and append to document
   */
  function createWidgetHTML() {
    // Create main widget container
    widgetElement = document.createElement('div');
    widgetElement.className = 'gpt-chat-widget';
    widgetElement.style.zIndex = config.zIndex;
    
    // Set position
    widgetElement.classList.add(config.position);
    
    // Create widget HTML structure
    widgetElement.innerHTML = `
      <div class="gpt-chat-button" style="background-color: ${config.primaryColor}">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
      </div>
      
      <div class="gpt-chat-container">
        <div class="gpt-chat-header" style="background-color: ${config.primaryColor}">
          <div class="gpt-chat-header-text">${config.headerText}</div>
          <div class="gpt-chat-close">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </div>
        </div>
        
        <div class="gpt-chat-body"></div>
        
        <div class="gpt-chat-footer">
          <input type="text" class="gpt-chat-input" placeholder="${config.placeholderText}" />
          <button class="gpt-chat-send" style="background-color: ${config.primaryColor}">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </div>
      </div>
    `;
    
    // Add styles
    addStyles();
    
    // Append to document
    document.body.appendChild(widgetElement);
    
    // Store reference to chat body
    chatBodyElement = widgetElement.querySelector('.gpt-chat-body');
  }

  /**
   * Add event listeners to widget elements
   */
  function addEventListeners() {
    // Toggle widget on button click
    const chatButton = widgetElement.querySelector('.gpt-chat-button');
    chatButton.addEventListener('click', () => {
      window.GPTChatWidget.open();
    });
    
    // Close widget on close button click
    const closeButton = widgetElement.querySelector('.gpt-chat-close');
    closeButton.addEventListener('click', (e) => {
      e.stopPropagation();
      window.GPTChatWidget.close();
    });
    
    // Send message on button click
    const sendButton = widgetElement.querySelector('.gpt-chat-send');
    sendButton.addEventListener('click', () => {
      const inputField = widgetElement.querySelector('.gpt-chat-input');
      const message = inputField.value.trim();
      
      if (message) {
        handleSendMessage(message);
        inputField.value = '';
      }
    });
    
    // Send message on Enter key
    const inputField = widgetElement.querySelector('.gpt-chat-input');
    inputField.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        const message = inputField.value.trim();
        
        if (message) {
          handleSendMessage(message);
          inputField.value = '';
        }
      }
    });
  }

  /**
   * Handle sending a message
   * @param {string} message - Message text to send
   */
  function handleSendMessage(message) {
    // Add user message to chat
    addUserMessage(message);
    
    // Show typing indicator
    addTypingIndicator();
    
    // Send message to API
    fetch(config.apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: message,
        clientId: config.clientId
      })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      // Remove typing indicator
      removeTypingIndicator();
      
      // Add bot response to chat
      if (data.reply) {
        addBotMessage(data.reply);
      } else {
        addBotMessage('מצטער, לא הצלחתי לקבל תשובה. אנא נסה שוב מאוחר יותר.');
      }
      
      // Scroll to bottom
      scrollToBottom();
    })
    .catch(error => {
      console.error('Error sending message:', error);
      
      // Remove typing indicator
      removeTypingIndicator();
      
      // Add error message
      addBotMessage('מצטער, אירעה שגיאה בעת שליחת ההודעה. אנא נסה שוב מאוחר יותר.');
      
      // Scroll to bottom
      scrollToBottom();
    });
  }

  /**
   * Add a user message to the chat
   * @param {string} message - Message text
   */
  function addUserMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.className = 'gpt-chat-message user-message';
    messageElement.innerHTML = `
      <div class="message-content">${escapeHTML(message)}</div>
    `;
    
    chatBodyElement.appendChild(messageElement);
    scrollToBottom();
  }

  /**
   * Add a bot message to the chat
   * @param {string} message - Message text
   */
  function addBotMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.className = 'gpt-chat-message bot-message';
    messageElement.innerHTML = `
      <div class="message-content">${escapeHTML(message)}</div>
    `;
    
    chatBodyElement.appendChild(messageElement);
    scrollToBottom();
  }

  /**
   * Add typing indicator to the chat
   */
  function addTypingIndicator() {
    // Remove existing indicator if any
    removeTypingIndicator();
    
    const indicatorElement = document.createElement('div');
    indicatorElement.className = 'gpt-chat-message bot-message typing-indicator';
    indicatorElement.innerHTML = `
      <div class="message-content">
        <div class="typing-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    `;
    
    chatBodyElement.appendChild(indicatorElement);
    scrollToBottom();
  }

  /**
   * Remove typing indicator from the chat
   */
  function removeTypingIndicator() {
    const indicator = chatBodyElement.querySelector('.typing-indicator');
    if (indicator) {
      chatBodyElement.removeChild(indicator);
    }
  }

  /**
   * Scroll chat to the bottom
   */
  function scrollToBottom() {
    chatBodyElement.scrollTop = chatBodyElement.scrollHeight;
  }

  /**
   * Escape HTML special characters to prevent XSS
   * @param {string} text - Text to escape
   * @returns {string} Escaped text
   */
  function escapeHTML(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML
      .replace(/\n/g, '<br>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>');
  }

  /**
   * Add widget styles to document
   */
  function addStyles() {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      /* GPT-Chat Widget Styles */
      .gpt-chat-widget {
        font-family: 'Assistant', sans-serif;
        direction: rtl;
        position: fixed;
        z-index: ${config.zIndex};
      }
      
      /* Positioning */
      .gpt-chat-widget.bottom-right {
        bottom: 20px;
        right: 20px;
      }
      
      .gpt-chat-widget.bottom-left {
        bottom: 20px;
        left: 20px;
      }
      
      /* Chat Button */
      .gpt-chat-button {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background-color: ${config.primaryColor};
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        transition: transform 0.3s ease;
      }
      
      .gpt-chat-button:hover {
        transform: scale(1.05);
      }
      
      /* Chat Container */
      .gpt-chat-container {
        position: absolute;
        bottom: 80px;
        right: 0;
        width: 350px;
        height: 500px;
        background-color: white;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        display: flex;
        flex-direction: column;
        overflow: hidden;
        opacity: 0;
        transform: translateY(20px) scale(0.9);
        pointer-events: none;
        transition: opacity 0.3s ease, transform 0.3s ease;
      }
      
      .gpt-chat-widget.bottom-left .gpt-chat-container {
        right: auto;
        left: 0;
      }
      
      .gpt-chat-widget.open .gpt-chat-container {
        opacity: 1;
        transform: translateY(0) scale(1);
        pointer-events: all;
      }
      
      /* Chat Header */
      .gpt-chat-header {
        padding: 15px;
        background-color: ${config.primaryColor};
        color: white;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      
      .gpt-chat-header-text {
        font-weight: bold;
        font-size: 16px;
      }
      
      .gpt-chat-close {
        cursor: pointer;
      }
      
      /* Chat Body */
      .gpt-chat-body {
        flex: 1;
        padding: 15px;
        overflow-y: auto;
        background-color: #f8f9fa;
      }
      
      /* Chat Messages */
      .gpt-chat-message {
        margin-bottom: 15px;
        max-width: 80%;
        clear: both;
      }
      
      .user-message {
        float: left;
      }
      
      .bot-message {
        float: right;
      }
      
      .message-content {
        padding: 10px 15px;
        border-radius: 18px;
        display: inline-block;
        word-break: break-word;
      }
      
      .user-message .message-content {
        background-color: ${config.primaryColor};
        color: white;
        border-bottom-left-radius: 5px;
      }
      
      .bot-message .message-content {
        background-color: ${config.secondaryColor};
        color: #333;
        border-bottom-right-radius: 5px;
      }
      
      /* Typing Indicator */
      .typing-dots {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 20px;
      }
      
      .typing-dots span {
        display: inline-block;
        width: 8px;
        height: 8px;
        margin: 0 2px;
        background-color: #888;
        border-radius: 50%;
        opacity: 0.6;
        animation: typing-dot 1.4s infinite ease-in-out both;
      }
      
      .typing-dots span:nth-child(1) {
        animation-delay: 0s;
      }
      
      .typing-dots span:nth-child(2) {
        animation-delay: 0.2s;
      }
      
      .typing-dots span:nth-child(3) {
        animation-delay: 0.4s;
      }
      
      @keyframes typing-dot {
        0%, 80%, 100% {
          transform: scale(0.8);
        }
        40% {
          transform: scale(1.2);
        }
      }
      
      /* Chat Footer */
      .gpt-chat-footer {
        padding: 15px;
        background-color: white;
        display: flex;
        border-top: 1px solid #e9ecef;
      }
      
      .gpt-chat-input {
        flex: 1;
        padding: 10px 15px;
        border: 1px solid #ced4da;
        border-radius: 20px;
        outline: none;
        font-family: inherit;
      }
      
      .gpt-chat-input:focus {
        border-color: ${config.primaryColor};
      }
      
      .gpt-chat-send {
        width: 40px;
        height: 40px;
        margin-right: 10px;
        background-color: ${config.primaryColor};
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background-color 0.3s ease;
      }
      
      .gpt-chat-send:hover {
        background-color: ${adjustColor(config.primaryColor, -20)};
      }
      
      .gpt-chat-send svg {
        width: 18px;
        height: 18px;
      }
      
      /* Responsive Styles */
      @media (max-width: 480px) {
        .gpt-chat-container {
          width: calc(100vw - 40px);
          height: 60vh;
          bottom: 70px;
        }
      }
    `;
    
    document.head.appendChild(styleElement);
  }

  /**
   * Adjust color brightness
   * @param {string} color - Hex color code
   * @param {number} amount - Amount to adjust (-255 to 255)
   * @returns {string} Adjusted color
   */
  function adjustColor(color, amount) {
    return '#' + color.replace(/^#/, '').replace(/../g, color => {
      const num = Math.min(Math.max(0, parseInt(color, 16) + amount), 255);
      return num.toString(16).padStart(2, '0');
    });
  }
})();
