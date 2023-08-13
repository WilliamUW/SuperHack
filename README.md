# 🦸 Super.ai - https://superhackai.netlify.app/

### Super.ai brings developer accessibility to SuperChain!

### Short description
Instant Q&A, live tech demos, and code generation for OP Stack, Base, Zora, and Mode dev support!

### 💡 Inspiration
When we first stumbled upon the OP Stack documentation, we were utterly overwhelmed and didn't know where to begin. We wanted to ask questions but were too embarrassed to take up a sponsor's time, and sometimes we didn't even know what questions to ask. We were close to giving up on this hackathon when we realized: "Hey, maybe this is a problem we can help solve!" Then we realized that this was a problem that wasn't specific to OP Stack, but also existed for other technologies.

This is where we got the inspiration for Super.ai: The easiest way to get started with development on OP Stack, Base, Zora, Mode, and WorldCoin.

### ❓ What it does
Super.ai is a platform-agnostic tool that uses an LLM-driven chatbot to lower the barrier of entry to developing on Optimism, Base, Zora, and Mode! Use it to learn about the SuperChain ecosystem and get code snippets to start building your own dapps!

### 🚧 How it's made
Check out the sponsors folder in our Github repo to see how things were implemented: https://github.com/WilliamUW/SuperHack/tree/main/sponsor
1. To enhance the contextual relevance and accuracy of sponsor documentation, we employ LangChain and ChromaDB for generating LLM vector embeddings for OP Stack, Base, and Zora. We deployed smart contracts on Optimism, Base, and Zora (NFT, Token, and Marketplace) and provide a custom API for our LLM to allow users to query through chat.
2. We utilize OpenAI for generating relevant responses using our custom vector embeddings.
3. For a smooth and interactive user experience on the frontend, our platform is built on Next.JS.
4. Ensuring the integrity of transactions and user credentials, we've integrated Metamask SDK. It not only authenticates wallets but also has options for adding the Optimism and Optimism Goerli chains with one click.
5. For user authentication that's robust and reliable, we've chosen WorldCoin to provide a secured gateway for our users.
