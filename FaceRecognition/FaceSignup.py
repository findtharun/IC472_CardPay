import required pacakges
import cv2
import numpy as np
from skimage.transform import rotate, AffineTransform, warp
import random
from skimage import img_as_ubyte
import os
from skimage.util import random_noise
from flask import Flask, request
from PIL import Image
from io import BytesIO
import re, base64
from flask import jsonify
import json
#Lets define functions for each operation
def anticlockwise_rotation(image):
    angle = random.randint(0,180)
    return rotate(image, angle)
def clockwise_rotation(image):
    angle = random.randint(0,180)
    return rotate(image, -angle)
def h_flip(image):
    return np.fliplr(image)
def v_flip(image):
    return np.flipud(image)
def add_noise(image):
    return random_noise(image)
def blur_image(image):
    return cv2.GaussianBlur(image, (9,9),0)
#classifying blur and non-blur images
def warp_shift(image): 
    transform = AffineTransform(translation=(0,40))  #chose x,y values according to your convinience
    warp_image = warp(image, transform, mode="wrap")
    return warp_image
# generate images
def generate_images(img,destination,num_images,user):
    directory = user 
    parent_dir = "data/" # Parent Directory path
    path = os.path.join(parent_dir, directory)
    os.mkdir(path)
    transformations = {
                   'warp shift': warp_shift,
                   'adding noise': add_noise,
                   'blurring image':blur_image
                 }                #use dictionary to store names of functions 
    # images_path = source #path to original images
    augmented_path = destination # path to store aumented images
    images = [] # to store paths of images from folder
    images_to_generate = num_images #you can change this value according to your requirement
    i = 1                        # variable to iterate till images_to_generate
    while i <= images_to_generate:    
        original_image = img
        transformed_image = None
    #     print(i)
        n = 0       #variable to iterate till number of transformation to apply
        transformation_count = random.randint(1, len(transformations)) #choose random number of transformation to ap
ply on the image
        
        while n <= transformation_count:
            key = random.choice(list(transformations)) #randomly choosing method to call
            transformed_image = transformations[key](original_image)
            n = n + 1
            
        new_image_path = "data/"+user+"/"+"%s.jpg" %(i-1)
        transformed_image = img_as_ubyte(transformed_image)  #Convert an image to unsigned byte format, with values 
in [0, 255].
        transformed_image = cv2.cvtColor(transformed_image, cv2.COLOR_BGR2RGB) #convert image to RGB before saving i
t
        cv2.imwrite(new_image_path, transformed_image) # save transformed image to path
        i =i+1
    print('Finished!!')
    #to generate more images, put above 3 statement inside while n<... loop
# convert a base64 string to image
def getI420FromBase64(codec, image_path=""):
    base64_data = re.sub('^data:image/.+;base64,', '', codec)
    byte_data = base64.b64decode(base64_data)
    image_data = BytesIO(byte_data)
    img = Image.open(image_data)
    img.save('input' + '.png', "PNG")
app=Flask(__name__)
@app.route('/',methods=['GET', 'POST'])
def cardpayapi():
    r = request.get_json() # receive the json (base64 string of image, user name) from client
    # print(r['image'])
    getI420FromBase64(r['image']) # convert base64 string to image
    user = r['user'] 
    user = user.lower()
    img = cv2.imread('input.png')
    try:
        generate_images(img,'data',5,user)
        result = "success"
    except:
        result = "failed"
    return {"result":result}
if __name__=='__main__':
    app.run(host='0.0.0.0', debug=True,use_reloader=False,port=5001)