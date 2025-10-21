import ChatBubble from "@/components/chat-panel/chat-bubble";
import ChatInput from "@/components/chat-panel/chat-input";

function ClientChatPage() {
    return (
        <div className="flex flex-col h-screen py-12">
            <div className="flex-1 overflow-y-auto px-4 py-6" id="chat-container">
                <ul className={"max-w-3xl mx-auto list-none space-y-8"}>
                    <li>
                        <ChatBubble isSender={true}>What is the actual tuition fee for business admin students. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium, itaque.</ChatBubble>
                    </li>
                    <li>
                        <ChatBubble isSender={false}>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab cumque deserunt dicta dignissimos eius fugit inventore ipsum modi officia placeat quaerat, qui similique veniam. Ea.
                        </ChatBubble>
                    </li>
                </ul>
            </div>
            <div className="p-4">
                <ChatInput hasLabel={false}/>
            </div>
        </div>
    )
}

export default ClientChatPage;