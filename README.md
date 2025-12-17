# 🎬 Prompt-Driven Movie Recommender (Netflix-Style)

---

## 📌 Project Overview
This project implements a **prompt-driven movie recommender system** that simulates a simplified Netflix-style experience.  
The system accepts **natural-language user queries** (e.g., *"romantic comedies from the 1990s"*, *"Leonardo DiCaprio movies"*, or *"action sci-fi"*) and returns **ranked movie recommendations** from a local dataset of over **300 movies**.

The recommender is implemented using **Python, Flask, and TF-IDF-based text similarity**, and is presented through a **single-page web interface** styled to resemble a Netflix-like layout.

---

## ⚙️ System Features
- Accepts free-text movie queries (genre, cast, year, keywords, or full sentences)
- Uses a dataset with the following fields:
  - Title  
  - Genre  
  - Cast  
  - Plot / Description  
  - Year
- Combines all text features into a single representation
- Uses **TF-IDF vectorization** and **cosine similarity** to rank recommendations
- Returns the **top 4 most relevant movies**
- Displays results with:
  - Movie title
  - Genre
  - Main actors
  - Year
  - Short plot description
- Runs as a **Flask web application**

---

## 🧠 Recommendation Logic
1. Movie attributes (title, genre, cast, plot, year) are merged into a single text field.
2. The dataset is transformed using **TF-IDF** to capture important keywords.
3. User input is vectorized using the same TF-IDF model.
4. **Cosine similarity** is computed between the user query and all movies.
5. Movies are ranked and the most relevant results are returned.

---

## 🖥️ Technologies Used
- **Python**
- **Flask**
- **Pandas**
- **Scikit-learn**
- **HTML / CSS / JavaScript**
- **TF-IDF Vectorization**
- **Cosine Similarity**

---

## ▶️ How to Run the Project

Step-by-Step Setup
1. Clone the Repository
bash
git clone https://github.com/Obamela03/Movie-Recommender.git
cd Movie-Recommender
2. Install Required Dependencies
bash
pip install flask pandas scikit-learn
3. Run the Flask Application
bash
python app.py
4. Access the Application
Open your web browser and navigate to: http://127.0.0.1:5000/

---

## 🔍 Future Improvements

Replace TF-IDF with semantic embeddings (e.g., sentence transformers)

Add user feedback for personalized recommendations

Cache vectorized data for faster responses

Expand filtering (year ranges, multiple genres)

Add user profiles and recommendation history

