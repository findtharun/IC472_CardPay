from flask import Flask, request
import cv2
from PIL import Image
from io import BytesIO
import re, base64
from flask import jsonify
import json
import face_recognition


def getI420FromBase64(codec, image_path=""):
    base64_data = re.sub('^data:image/.+;base64,', '', codec)
    byte_data = base64.b64decode(base64_data)
    image_data = BytesIO(byte_data)
    img = Image.open(image_data)
    img.save('input' + '.png', "PNG")
    
def authenticate(user,img):
  try:
    input_face_encoding = face_recognition.face_encodings(img)[0]
  except:
    return -1
  image_encodings = []
  filename = 'data/'+user+'/'
  for i in range(5):
    unknown_image = face_recognition.load_image_file(filename+str(i)+'.jpg')
    unknown_face_encoding = face_recognition.face_encodings(unknown_image)[0]
    image_encodings.append(unknown_face_encoding)
    print(len(image_encodings))
  # Compare faces
  results = face_recognition.compare_faces(image_encodings, input_face_encoding)
  response = results.count(True)
  print(response,results)
  if response >= 3:
    return 1
  else:
    return 0

app=Flask(__name__)

@app.route('/',methods=['GET', 'POST'])
def cardpayapi():
    r = request.get_json()
    # print(r['image'])
    getI420FromBase64(r['image'])
    user = r['user']
    user = user.lower()
    img = cv2.imread('input.png')
    response = authenticate(user,img)
    result=""
    if response == -1:
      result = "NOT FOUND"
    elif response == 1:
      result = "SUCCESS"
    else:
      result = "FAILURE"
    return {"result":result}
if __name__=='__main__':
    app.run(host= '0.0.0.0', debug=True,use_reloader=False)
