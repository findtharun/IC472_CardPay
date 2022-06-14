# -*- coding: utf-8 -*-

import joblib
import inputScript
import warnings
from flask import Flask,render_template,request,jsonify,redirect
classifier = joblib.load('final_models/rf_final.pkl')
app = Flask(__name__)
@app.route('/')
def my_form():
    return render_template('index25.html')
warnings.filterwarnings("ignore")

#load the pickle file


#input url

#checking and predicting


@app.route('/processing',methods=['POST','GET'])
def processing():
    text = request.form['name']
    if text:
        checkprediction = inputScript.main(text)
        prediction = classifier.predict(checkprediction)
        if prediction[0] == -1:
            c = "Legit"
            d = 'name'
        else:
            c="Phishing"
            d = 'namered'
        return jsonify({d : c})

    else:
        return jsonify({"error":"Missing data!"})

@app.route('/apipage',methods=['POST','GET'])
def apipage():
    return render_template('index269.html')


@app.route('/google')
def google():
    return redirect("https://www.google.com")

@app.route('/apipage/pagesuccess')
def pagesuccess():
    return render_template("index24.html")

@app.route('/apipage/pagefailure')
def pagefailure():
    return render_template("index146.html")




if __name__ == '__main__':
	app.run(port=5000,debug=True)
