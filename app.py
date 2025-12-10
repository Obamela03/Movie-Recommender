

from flask import Flask, render_template, request, jsonify
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

app = Flask(__name__)

# Load and preprocess data
df_movies = pd.read_csv('combined_file.csv').fillna('')
df_movies.columns = df_movies.columns.str.strip()  # remove spaces

# Remove duplicate movies by 'movie_name' (keep the first occurrence)
df_movies = df_movies.drop_duplicates(subset='movie_name', keep='first').reset_index(drop=True)

# Combine features for TF-IDF
df_movies['text_combined'] = (df_movies['movie_name'] + ' ' + df_movies['genre'] + ' ' + df_movies['star'] + ' ' + df_movies['description'] + ' ' + df_movies['year'].astype(str)
)

# TF-IDF and cosine similarity (renamed variables)
tfidf_vect = TfidfVectorizer(stop_words='english')
tfidf_mat = tfidf_vect.fit_transform(df_movies['text_combined'])
cos_sim = cosine_similarity(tfidf_mat, tfidf_mat)

# Recommendation function
def get_recs(query_text, top_n=4):
    query_text = query_text.strip().lower()
    if not query_text:
        return "Please enter description.", []

    # Transform the input text using the fitted vectorizer
    query_vec = tfidf_vect.transform([query_text])

    # Compute similarity scores
    similarity_scores = cosine_similarity(query_vec, tfidf_mat).flatten()

    # Get top indices
    top_idxs = similarity_scores.argsort()[::-1][:top_n]

    # Prepare records
    records = df_movies.iloc[top_idxs].to_dict(orient='records')

    return "", records

# ------------------ Routes ------------------
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/all_movies')
def all_movies():
    # Show first 2000 movies initially
    sample_movies = df_movies.head(2000).to_dict(orient='records')
    return jsonify(sample_movies)

@app.route('/recommend', methods=['POST'])
def get_recommendations():
    input_text = request.form.get('movie_name', '')
    error, recs = get_recs(input_text)
    # note: keep the JSON keys the same to match frontend expectations
    return jsonify({'error': error, 'recs': recs})

# ------------------ Run ------------------
if __name__ == "__main__":
    app.run(debug=True)
