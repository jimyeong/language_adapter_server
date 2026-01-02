# Language Adaptor

**Language Adaptor** is an experimental English learning tool built around the idea that  
**language is better learned and recalled through images, not definitions**.

Rather than memorizing words as text, the project focuses on understanding how words *feel*, *look*, and *are used in real contexts*.

---

## 🎯 Purpose

- Learn vocabulary through **visual association rather than textual definitions**
- Treat words as experiences and contexts, not isolated strings
- Support more natural language recall by anchoring expressions to images and usage

---

## ✨ Key Features

- **Giphy Integration**
  - Displays GIFs related to searched words or expressions
  - Helps learners grasp tone, emotion, and real-world usage visually

- **Word & Expression Storage**
  Each saved entry can include:
  - Example sentences
  - Associated Giphy GIFs
  - Synonyms and antonyms
  - Stored together as a single learning unit
  - Quiz mode

- **Learning Calendar**
  - Days with saved entries are marked on a calendar
  - Clicking a date shows all words and expressions studied on that day
  - Enables reflection on learning history over time
 <table>
  <tr>
    <td width="50%">
      <b>1. Associated Giphy GIFs</b><br/>
      Relate your words with funny moving images
      <br/><br/>
      <img src="https://github.com/user-attachments/assets/8eb5b617-5434-41f3-bc59-d997c1272bdc" width="100%"/>
    </td>
    <td width="50%">
      <b>2. Synonyms and antonyms</b><br/>
      Compare your new words for better sensing
      <br/><br/>
      <img src="https://github.com/user-attachments/assets/91e8f37d-373b-4e51-8ee9-9516db59d1bf" width="100%"/>
    </td>
  </tr>
  <tr>
    <td width="50%">
      <b>3. Stored together as a single learning unit</b><br/>
      Update your learning journey in the calander so you can take them out whenever
      <br/><br/>
      <img src="https://github.com/user-attachments/assets/dda90909-d1c5-468b-85bb-d927c903bf3a" width="100%"/>
    </td>
    <td width="50%">
      <b>4. Quiz Mode</b><br/>
      Guess the answer with the given pictues
      <br/><br/>
      <img src="https://github.com/user-attachments/assets/2d3c5314-0503-4372-b7d9-3c692cb8262c" width="100%"/>
    </td>
  </tr>
</table>







---

## 🧱 Initial Technical Design

- Frontend: Web-based UI
- Backend: REST API
- Database: **MySQL (RDBMS)**

Words, examples, images, and relationships were modeled using a relational database structure.

---

## ⛔ Why the Project Was Paused

As development progressed, a fundamental mismatch became clear between  
**the nature of language** and **the chosen data model**.

### 1. Language Is Graph-Shaped, Not Relational

Language does not behave like clean relational data:

- Words rarely have fixed meanings
- Meaning shifts depending on context, emotion, and situation
- Synonyms, antonyms, images, and usage contexts form **many-to-many, evolving relationships**

This led to the realization that language is inherently closer to a **graph structure** than a relational schema.  
Modeling these relationships in MySQL felt forced and increasingly restrictive.

---

### 2. The Brain Stores Language as Images, Not Text

Using English daily while living in the UK changed how I understood language recall:

- When speaking or recalling expressions, the brain does not retrieve text first
- It retrieves **scenes, images, and sensations**, then translates them into words

In other words:

> The brain does not store language as characters — it stores it as imagery.

Although Language Adaptor aimed to support image-based learning conceptually,  
its underlying data model still treated language as structured text.

---

## 📚 Lessons Learned

- **Language data is inherently graph-shaped**  
  Words do not exist in isolation. Meanings, contexts, images, and emotions form evolving many-to-many relationships. Modeling language with a relational database introduced unnecessary rigidity.

- **Database choice encodes assumptions about the problem**  
  Choosing an RDBMS implicitly assumed language could be normalized into stable schemas. This project highlighted how deeply storage models shape product design.

- **Image-first learning aligns better with human cognition**  
  Language is recalled through scenes and sensations rather than definitions. Treating images as secondary artifacts misses a key cognitive layer.

- **Correct abstractions matter more than feature completeness**  
  Despite having multiple features, the core abstraction was misaligned. Adding more functionality would not have resolved the foundational issue.

- **Stopping a project can be a design decision, not a failure**  
  Pausing development was a deliberate choice to avoid reinforcing an incorrect mental model. Recognizing when to stop is part of responsible system design.

---

## 🔚 Conclusion

Language Adaptor is best understood as a **design exploration** rather than a finished product.

It clarified two critical insights:

1. Language systems should be modeled as **graphs of relationships**
2. Effective language learning tools should be **image-first, not text-first**

Given these realizations, further development was paused to avoid extending a structure that no longer aligned with the problem being explored.

The project remains as a record of this exploration and the lessons learned from it.
