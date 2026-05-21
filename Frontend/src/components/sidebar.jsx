function Sidebar({
    conversationList, createConversation, loadConversationMessages, deleteConversation, loadMoreConversations, logout}) {
        return (
            <div style={{
                width: "260px",
                minWidth: "260px",
                height: "100vh",
                backgroundColor: "#202123",
                color: "white",
                padding: "15px",
                overflowY: "hidden",
                display: "flex",
                flexDirection: "column",
                boxSizing: "border-box",
            }}>
            
            <button onClick={logout}
             style={{
                padding:"12px",
                marginBottom:"10px",
                border:"none",
                cursor:"pointer",
                borderRadius:"8px",
                backgroundColor: "#3b3b3b",
                color: "white",
            }}>Log out</button>

            <button onClick={createConversation}
            style={{
                padding:"12px",
                marginBottom:"15px",
                cursor:"pointer",
                borderRadius:"5px",
                border:"none",
                backgroundColor: "#3b3b3b",
                color: "white",
            }}> + New Chat </button>

            

            <div style={{ flex: 1, overflowY: "auto", overflowX: "hidden" }}>
            {
                conversationList.map((conversation) => (
                    <div key={conversation.id}
                    onClick={() => 
                        loadConversationMessages(
                            conversation.id
                        )
                    }

                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems:"center",
                        padding: "12px",
                        marginBottom: "10px",
                        backgroundColor: "#343541",
                        cursor: "pointer",
                        borderRadius: "8px",
                    }}>
                        <span style={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            maxWidth: "180px",
                        }}>
                        {conversation.title}</span>

            

                <button onClick={(event) => {
                event.stopPropagation();

                deleteConversation(conversation.id);
            }}
            style={{
                backgroundColor: "transparent",
                color: "white",
                border: "none",
                fontWeight: "bold",
                cursor: "pointer",
            }}>X</button>
                    </div>
                ))
            }
            </div>

            <button onClick={loadMoreConversations}
            style={{
                padding:"12px",
                marginTop:"15px",
                cursor:"pointer",
                borderRadius: "8px",
                border: "none",
                backgroundColor: "#3b3b3b",
                color: "white",
            }}>Load More</button>
            </div>
        );
    }

    export default Sidebar;