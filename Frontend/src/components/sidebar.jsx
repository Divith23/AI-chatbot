function Sidebar({
    conversationList, createConversation, loadConversationMessages, deleteConversation, loadMoreConversations, logout}) {
        return (
            <div style={{
                width: "250px",
                backgroundColor: "#202123",
                color: "white",
                padding: "10px",
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
            }}>
            
            <button onClick={logout}
             style={{
                width:"250px",
                padding:"10px",
                marginBottom:"10px",
                cursor:"pointer",
                borderRadius:"5px",
                border:"none",
            }}>Log out</button>

            <button onClick={createConversation}
            style={{
                width:"250px",
                padding:"10px",
                marginBottom:"10px",
                cursor:"pointer",
                borderRadius:"5px",
                border:"none",
            }}> + New Chat </button>

            

            <div style={{ flex: 1 }}>
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
                        padding: "10px",
                        marginBottom: "5px",
                        backgroundColor: "#343541",
                        cursor: "pointer",
                        borderRadius: "5px",
                    }}>
                        {conversation.title}

            

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
                width:"100%",
                padding:"10px",
                marginTop:"10px",
                cursor:"pointer",
                borderRadius: "5px",
                border: "none",
            }}>Load More</button>
            </div>
        );
    }

    export default Sidebar;