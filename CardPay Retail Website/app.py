# -*- coding: utf-8 -*-

import joblib
import inputScript
import warnings
from flask import Flask,render_template,request,jsonify
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
    return render_template('index4690.html')

	# return jsonify({'error' : 'Missing data!'})


if __name__ == '__main__':
	app.run(debug=True)