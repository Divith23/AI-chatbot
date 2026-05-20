import { useEffect, useRef } from "react";

import Message from "./message";


function ChatWindow(props) {
    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({
            behavior: "smooth",
        });
    }, [props.messages]);

    return (
        <div
            style={{
                flex: 1,
                overflowY: "auto",
                padding: "10px",
                backgroundColor: "#f5f5f5",
            }}
            >
                {props.messages.map((msg, index) => (
                    <Message 
                    key={index}
                    sender={msg.sender}
                    text={msg.text}
                    /> 
                ))}

                {props.isTyping && (
                    <p>Bot is typing...</p>
                )}
                <div ref={bottomRef}></div>
                
        </div>
    );
}

export default ChatWindow;