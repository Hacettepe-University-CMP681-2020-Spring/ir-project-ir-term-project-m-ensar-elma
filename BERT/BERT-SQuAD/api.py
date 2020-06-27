from flask import Flask,request,jsonify
from flask_cors import CORS

from bert import QA

app = Flask(__name__)
CORS(app)

model = QA("model")

@app.route("/predict",methods=['POST'])
def predict():
    print(request)
    doc = request.json["document"]
    q = request.json["question"]
    print(doc)
    print(q)
    try:
        out = model.predict(doc,q)
        return jsonify({"result":out})
    except Exception as e:
        print(e)
        return jsonify({"result":"Model Failed"})

if __name__ == "__main__":
    app.run('127.0.0.1',port=8001)