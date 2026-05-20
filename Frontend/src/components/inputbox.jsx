import { useState } from "react";

function InputBox(props) {
    const [message, setMessage] = useState("");

    function handleSend() {
        if(message.trim() === "") return;

        props.sendMessage(message);
        setMessage("");
    }

    function handleKeyDown(event){
        if(event.key==="Enter"){
            handleSend();
        }
    }
    return (
        <div style={{
            display: "flex",
            padding: "10px",
            borderTop: "1px solid #ccc",
            backgroundColor: "#fff",
        }}>
            <input 
            type="text" 
            placeholder="Type your message here..."
            value={ message }
            onChange={(event) => setMessage(event.target.value)}
            onKeyDown={handleKeyDown}
            style={{
                flex:1,
                padding: "10px",
                fontSize: "16px",
                borderRadius: "8px",
                border: "1px solid gray",
            }} />
            <button onClick={handleSend}
            
            style={{
                marginLeft: "10px",
                padding: "10px 20px",
                borderRadius: "8px",
                border: "none",
                backgroundColor: "#000000",
                color: "white",
                cursor: "pointer",
            }}>
                Send
                </button>
            
        </div>
    );
}

export default InputBox;