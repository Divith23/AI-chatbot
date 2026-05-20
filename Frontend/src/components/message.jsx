
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

function Message(props){
    const isUser = props.sender === "User";


    return (
        <div
          style={{
            display: "flex",
            justifyContent: isUser ? "flex-end" : "flex-start", marginBottom: "10px",
          }}>
            <div style={{
                backgroundColor: isUser ? "#1b2127" : "#e5e5ea",
                color: isUser ? "white" : "black",
                padding: "10px",
                borderRadius: "10px",
                maxWidth: "60%",
            }}>
                <ReactMarkdown components={{
                  code({ inline, className, children, ...props}){
                    const match = /language-(\\w+)/.exec(className || "");

                    return !inline && match ? (<SyntaxHighlighter language={match[1]} PreTag="div" {...props}>{
                      String(children).replace(/\\n$/,"")}</SyntaxHighlighter>):(
                        <code className = {className} {...props}>{children}</code>
                      );
                  },
                }}>{props.text}</ReactMarkdown>
            </div>
          </div>
    );
}

export default Message;