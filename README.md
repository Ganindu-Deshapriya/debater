
# Debater-AI by GaninduDesh

## How the Idea Was Born 💡

While scrolling through reels the other day this whole "Was Thanos Right?" thing came back into my feed. And right as it came to my mind i thought why not argue with an AI about it? 🤔 Then while arguing with gemini my thought went to "why even bother when i can let 2 Agents or personalities can debate themselves and give me an answer? that way i get a show 🍿, and an ANSWER!✅
And here it is,a Debater-AI, a fun project to now let 2 agents debate over the questions that keep you up at night.😅

visit and try : https://debater-ai-gdesh.vercel.app/ 

or

## Setting Up

1. **Clone the repository:**
	 ```sh
	 git clone <your-repo-url>
	 cd debater
	 ```
2. **Install dependencies:**
	 ```sh
	 npm install
	 ```

3. **Configure environment variables:**
	 - Create a `.env.local` file in the root directory.
	 - Add your Gemini API key:
		 ```env
		 GEMINI_API_KEY=your-api-key-here
		 ```
	 - Set the model name to use:
		 ```env
		 GEMINI_MODEL_NAME=gemma-3-27b-it
		 ```
	 - You can change the model by editing `GEMINI_MODEL_NAME` in `.env.local` 

4. **Run the development server:**
	 ```sh
	 npm run dev
	 ```
5. **Open the app:**
	 - Visit [http://localhost:3000](http://localhost:3000) in your browser.


## Stack Used

- **Next.js** (React framework) for the frontend and API routes
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **react-markdown** for rendering Markdown output
- **Node.js**
- **Gemini API** for generating debate responses (Google AI Studio)

## Skills Achieved / Learned

### AI, LLM, and Prompting
- **Prompt Engineering:**
	- Learned to craft effective prompts for LLMs to simulate personalities, debate tones, and structured arguments.
	- Explored how prompt context/history affects LLM responses.
- **LLM API Integration:**
	- Integrated with an LLM API to generate dynamic, context-aware responses.
	- Managed API calls, error handling, and response parsing.
- **Simulating Multi-Agent Conversations:**
	- Built logic to alternate between two AI "bots" with distinct personalities.
	- Used chat history to maintain debate context.

### Web Development
- **Markdown Rendering:**
	- Used `react-markdown` to display rich, formatted AI output.
- **Modern Styling:**
	-Tailwind CSS for rapid, responsive UI design.
- **TypeScript:**
	- Type safety for better code reliability.


---

Feel free to fork, extend, or use this project as a playground for AI, LLM, and prompt engineering experiments!
