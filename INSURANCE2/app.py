from flask import Flask, request, jsonify, render_template
import json
import pickle
import numpy as np

# Create flask app
app = Flask(__name__)

# import json file
data = './columns.json'
with open(data,'r') as f:
    data_columns = json.load(f)['data_columns']
    smoker = data_columns[3:5]
    gender = data_columns[5:7]
    region = data_columns[7:]

# Load the pickle model
model = pickle.load(open('./model.pkl', 'rb'))

# create get routes
# @app.route('/')
# def Home():
#     return render_template('index.html')

@app.route('/smoker')
def get_smokers():
    response = jsonify({
        'smoker': smoker
    })
    
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response

@app.route('/gender')
def get_gender():
    response = jsonify({
        'gender': gender
    })
    
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response

@app.route('/region')
def get_region():
    response = jsonify({
        'region': region
    })
    
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response

def insurance_premium(region,age,bmi,children,gender,smoker):
    try:
        region_index = data_columns.index(smoker.lower())
        gender_index = data_columns.index(gender.lower())
        smoker_index = data_columns.index(region.lower())
    except:
        region_index = -1
        gender_index = -1
        smoker_index = -1

    x = np.zeros(len(data_columns))
    x[0] = age
    x[1] = bmi
    x[2] = children
    if region_index >= 0:
        x[region_index] = 1
    if gender_index >= 0:
        x[gender_index] = 1
    if smoker_index >= 0:
        x[smoker_index] >= 1

    return model.predict([x])[0]

# create post routes
@app.route('/predict_premium', methods=['POST'])
def predict():
    age = int(request.form['age'])
    bmi = float(request.form['bmi'])
    children = int(request.form['children'])
    gender = request.form['gender']
    smoker = request.form['smoker']
    region = request.form['region']

    response = jsonify({
        'estimated_premium': insurance_premium(region,age,bmi,children,gender,smoker)
    })

    response.headers.add('Access-Control-Allow-Origin', '*')

    return response

if __name__=="__main__":
    app.run(debug=True)