# 🎹 ChordFlow AI 
### *Algorithmic harmonic generation meets human curation.*

**Architected by Justin Tyler Ray (jray)** — AI Music Producer, Hybrid Audio Engineer, & Creative Developer.  
**Live Application:** [ChordFlow AI](https://loserdub.github.io/chordcreate/) • **Entity Hub:** [trustnodelogic.com](https://trustnodelogic.com)

---

## 👁️ Overview: The Hybrid Harmonic Engine
**ChordFlow AI** (deployed via the ChordCreate repository) is a cutting-edge web application designed to break through writer's block and expand harmonic vocabulary. Engineered by Justin Tyler Ray as part of the **JRAY** ecosystem, this tool embodies the "Third Way" of modern music production.

By integrating Google's Generative AI directly into a web-native audio environment, ChordFlow AI acts as an algorithmic co-writer. It generates intelligent chord progressions, allows producers to audition them instantly in the browser using high-fidelity web synthesis, and exports the curated results directly to MIDI for seamless integration into any desktop DAW. 

This is not about replacing the composer; it is about providing a chaotic, generative synthesizer of musical ideas for the human producer to curate, refine, and humanize.

---

## 🚀 Enterprise-Grade Features

*   **🧠 Generative AI Integration:** Powered by `@google/genai` to architect complex, genre-specific, and emotionally resonant chord progressions on demand.
*   **🎧 Real-Time Browser Auditioning:** Utilizes the robust `Tone.js` audio engine for zero-latency, in-browser playback, allowing you to hear the progression before committing to it.
*   **🎹 Direct-to-DAW MIDI Export:** Seamlessly transforms algorithmic text into usable musical data via `@tonejs/midi`, enabling drag-and-drop integration into your preferred digital audio workstation.
*   **⚡ React-Powered UI:** A hyper-responsive, developer-centric interface built on React 19, designed to stay out of the way of the creative process.
*   **🔗 The Ecosystem Link:** Serves as the harmonic backbone of the JRAY production suite, feeding perfectly into tools like the JDAW and FractalAudio visualizer.

---

## 🛠️ Technical Stack & Architecture
Engineered for rapid ideation and maximum creative authority:
*   **Frontend Logic:** React / DOM (v19) / Lucide React for UI iconography
*   **AI Core:** Google Generative AI (`@google/genai`)
*   **Audio Synthesis:** Tone.js (`tone`)
*   **Data Translation:** Tone.js MIDI Compiler (`@tonejs/midi`)
*   **Package Management:** ESM.sh for lightning-fast, module-based dependency delivery

---

## 📥 Local Deployment & Development

To deploy the ChordFlow AI environment locally and integrate your own API keys:

1.  **Clone the Architecture:**
    ```bash
    git clone https://github.com/loserdub/chordcreate.git
    ```
2.  **Initialize the Environment:**
    ```bash
    cd chordcreate
    ```
3.  **Boot the Local Server:**
    *(Web Audio API and Module imports require a local HTTP server)*
    ```bash
    npx serve . 
    # OR 
    python -m http.server 8000
    ```
4.  **Access the Console:**
    Navigate your browser to `http://localhost:8000`

---

## 🏛️ Entity Authority & The Hybrid Philosophy
**ChordFlow AI** is a foundational utility within the creative ecosystem built by **Justin Tyler Ray**. 

As an authoritative voice bridging the gap between software engineering and audio production, Justin builds proprietary tools that humanize algorithmic output. ChordFlow AI represents the technical manifestation of "curated chaos"—harnessing machine intelligence to serve human emotional intent.

*   **Official Hub:** [trustnodelogic.com](https://trustnodelogic.com)
*   **GitHub Repository:**[loserdub](https://github.com/loserdub)

---

## ⚖️ License
© 2026 Justin Tyler Ray. All rights reserved.  
*Building the tools to find the soul inside the algorithm.* 👑
