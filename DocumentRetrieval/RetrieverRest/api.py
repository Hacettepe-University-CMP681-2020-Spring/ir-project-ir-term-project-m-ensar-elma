from flask import Flask,request,jsonify
from flask_cors import CORS


import pandas as pd
import random
import nltk
import string

import gensim
from gensim import corpora, models, similarities

import warnings
warnings.simplefilter('ignore')
import nltk
nltk.download('stopwords')
nltk.download('wordnet')
nltk.download('punkt')
from nltk.corpus import stopwords
app = Flask(__name__)
CORS(app)
import numpy as np

path = 'C:\\Users\\ensar\\Desktop\\retriever\\'
data = pd.read_csv(path + 'legal_help_clean.csv')
data.head()
newstopwords = set(stopwords.words('english'))
# define Wordnet Lemmatizer
WNlemma = nltk.WordNetLemmatizer()

# Create Preprocessing Function
def pre_process(text):
    tokens = nltk.word_tokenize(text)
    tokens = [WNlemma.lemmatize(t) for t in tokens]
    tokens = [t for t in tokens if t not in string.punctuation]
   #tokens = [word for word in tokens if word.lower() not in newstopwords]
    # bigr = nltk.bigrams(tokens[:10])
    # trigr = nltk.trigrams(tokens[:10])
    return (tokens)

GREETING_INPUTS = ("hello", "hi", "greetings", "hello i need help", "good day", "hey", "i need help", "greetings")
GREETING_RESPONSES = ["Good day, How may i of help?", "Hello, How can i help?", "hello",
                      "I am glad! You are talking to me."]

def greeting(sentence):
    for word in sentence.split():
        if word.lower() in GREETING_INPUTS:
            return random.choice(GREETING_RESPONSES)

# Preprocess Question Column
data['MESSAGE'] = data['MESSAGE'].apply(pre_process)
data['RESPONSE'] = data['RESPONSE'].apply(pre_process)
# Define Questions
question = data['MESSAGE']
answer = data['RESPONSE']
temp=np.concatenate((question,answer),axis=0)
dictionary = corpora.Dictionary(temp)
corpus = [dictionary.doc2bow(a) for a in question]
tfidf = models.TfidfModel(corpus)

corpus_tfidf = tfidf[corpus]
lsi = models.LsiModel(corpus_tfidf, id2word=dictionary, num_topics=650)  # Threshold A
corpus_lsi = lsi[corpus_tfidf]
index = similarities.MatrixSimilarity(corpus_lsi)

def DocumentRetreiever(test_set_sentence):
    # ---------------Tokenisation of user input -----------------------------#
    tokens = pre_process(test_set_sentence)
    texts = " ".join(tokens)
    # -----------------------------------------------------------------------#

    # ---------------Find and Sort Similarity -------------------------------#
    vec_bow = dictionary.doc2bow(texts.lower().split())
    vec_tfidf = tfidf[vec_bow]
    vec_lsi = lsi[vec_tfidf]

    # If not in the topic trained.
    if not (vec_lsi):

        not_understood = "Apology, I do not understand. Can you rephrase?"
        return not_understood, 999

    else:
        # sort similarity
        sims = index[vec_lsi]
        sims = sorted(enumerate(sims), key=lambda item: -item[1])

        index_s = []
        score_s = []
        for i in range(len(sims)):
            x = sims[i][1]
            # If similarity is less than 0.5 ask user to rephrase.
            if x <= 0.5:  # Threshold B
                not_understood = "Apology, I do not understand. Can you rephrase?"
                return not_understood, 999
            else:
                index_s.append(str(sims[i][0]))
                score_s.append(str(sims[i][1]))
                reply_indexes = pd.DataFrame({'index': index_s, 'score': score_s})

            # Find Top Questions and Score
            r_index = int(reply_indexes['index'].loc[0])
            r_score = float(reply_indexes['score'].loc[0])

            reply = str(data.iloc[:, 1][r_index])

            return reply, r_score


@app.route("/retrieve",methods=['POST'])
def predict():
    print(request)
    doc = request.json["query"]
    print(doc)
    try:
        reply, score = DocumentRetreiever(str(doc))
        print('\x1b[1;37;40m' + 'JARVIS' + '\x1b[0m' + ': ' + reply)
        return jsonify({"result":reply})
    except Exception as e:
        print(e)
        return jsonify({"result":"Model Failed"})



if __name__ == "__main__":
    app.run('127.0.0.1',port=8002)