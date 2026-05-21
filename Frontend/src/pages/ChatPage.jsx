import { useEffect, useState } from "react";

import ChatWindow from "../components/chatwindow";
import InputBox from "../components/inputbox";
import Sidebar from "../components/sidebar";

const token = localStorage.getItem("token");
const authHeaders = {
  "Content-Type": "application/json",
  "Authorization": `Bearer ${token}`,
};

function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [conversationList, setConversationList] = useState([]);
  const [currentConversationId, setCurrentConversationId] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    loadConversations();
  }, []);

  useEffect(() => {
    if (conversationList.length > 0 && !currentConversationId) {
      setCurrentConversationId(conversationList[0].id);
      loadConversationMessages(conversationList[0].id);
    }
  }, [conversationList]);

  async function loadConversations(pageNumber = 1) {
    try {
      const response = await fetch(`https://ai-chatbot-6g4t.onrender.com/conversations?page=${pageNumber}&limit=10`, {
        headers: authHeaders,
      });
      const data = await response.json();
      if (pageNumber === 1) {
        setConversationList(data.conversations || []);
      } else {
        setConversationList((prev) => [...prev, ...(data.conversations || [])]);
      }
    } catch (error) {
      console.error(error);
    }
  }

  function loadMoreConversations() {
    const nextPage = page + 1;
    setPage(nextPage);
    loadConversations(nextPage);
  }

  async function loadConversationMessages(conversationId) {
    try {
      const response = await fetch(`https://ai-chatbot-6g4t.onrender.com/conversation/${conversationId}`, {
        headers: authHeaders,
      });
      const data = await response.json();
      setMessages(data.messages);
      setCurrentConversationId(conversationId);
    } catch (error) {
      console.error(error);
    }
  }

  async function createConversation() {
    try {
      const response = await fetch("https://ai-chatbot-6g4t.onrender.com/conversation", {
        method: "POST",
        headers: authHeaders,
      });
      const data = await response.json();
      setCurrentConversationId(data.conversation_id);
      setMessages([]);
      loadConversations();
    } catch (error) {
      console.error(error);
    }
  }

  async function sendMessage(text) {
    if (text.trim() === "") return;
    if (!currentConversationId) return;

    setMessages((prev) => [...prev, { sender: "User", text }]);
    setIsTyping(true);

    try {
      const response = await fetch(`https://ai-chatbot-6g4t.onrender.com/chat/${currentConversationId}`, {
        method: "POST",
        headers: authHeaders,
        body: JSON.stringify({ text }),
      });
      const data = await response.json();
      setMessages((prev) => [...prev, { sender: "Bot", text: data.reply }]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsTyping(false);
    }
  }

  async function deleteConversation(conversationId) {
    try {
      await fetch(`https://ai-chatbot-6g4t.onrender.com/conversation/${conversationId}`, {
        method: "DELETE",
        headers: authHeaders,
      });
      loadConversations();
      setMessages([]);
    } catch (error) {
      console.error(error);
    }
  }

  function logout() {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden", }}>
      <Sidebar
        conversationList={conversationList}
        createConversation={createConversation}
        loadConversationMessages={loadConversationMessages}
        deleteConversation={deleteConversation}
        loadMoreConversations={loadMoreConversations}
        logout={logout}
      />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", }}>
        <ChatWindow messages={messages} isTyping={isTyping} />
        <InputBox sendMessage={sendMessage} />
      </div>
    </div>
  );
}

export default ChatPage;
