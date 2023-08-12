# SuperHack

### Short description
#### A max 280-character or less description of your project (it should fit in a tweet!)
Instant Q&A, live tech demos, and code generation trained on OP Stack, Base, and Zora documentation.

### Description
#### Go in as much detail as you can about what this project is. Please be as clear as possible!

When I first stumbled upon the OP Stack documentation, I was utterly overwhelmed and didn't know where to begin. I wanted to ask questions but I too embarassed to take up a sponsor's time, and sometimes I didn't even know what questions to ask. I was so close to just giving up on this hackathon when I realized: "Hey, maybe this is a problem I can help solve!" Then realized this was a problem that wasn't specific to OP Stack, but also existed for other technologies.

This is where I got the inspiration for Super.ai! The easiest way to get started with development on OP Stack, Base, and Zora.

Super.ai will be with you every step of the way to answer any questions you have, provide live Tech demos, and write code for you to reduce the friction when it comes to blockchain development!

### How it's made
#### Tell us about how you built this project; the nitty-gritty details. What technologies did you use? How are they pieced together? If you used any sponsor technologies, how did it benefit your project? Did you do anything particuarly hacky that's notable and worth mentioning?
1. To enhance the contextual relevance and accuracy of sponsor documentation, we employ ChromaDB for generating LLM vector embeddings for OP Stack, Base, and Zora.
2. We utilize OpenAI for generating relevant responses using our custom vector embeddings.
3. For a smooth and interactive user experience on the frontend, our platform is built on Next.JS.
4. Ensuring the integrity of transactions and user credentials, we've integrated Metamask SDK. It not only authenticates wallets but also has options for adding the Optimism and Optimism Goerli chains with one click.
5. For user authentication that's robust and reliable, we've chosen WorldCoin to provide a secured gateway for our users.
