from flask import Flask, render_template, request
import os, random, math
from PIL import Image
from io import BytesIO
import base64
app = Flask(__name__)


def round_to(rounded,num):
    return int(rounded * math.ceil(float(num) / rounded))

@app.route("/")
def index():
    tilesets = sorted(os.listdir('static/data/tilesets/images/'))
    return render_template("editor.html",tilesets=tilesets)

@app.route("/selection/<string:x>/<string:y>/<string:option>/<string:tilesize>/")
def get_selection(x,y,option,tilesize):
    tilesize=int(tilesize)
    x,y = round_to(tilesize,int(x)), round_to(tilesize,int(y))
    img = Image.open('static/data/tilesets/images/'+option)
    box = (x-tilesize, y-tilesize, x, y)
    cropped_img = img.crop(box)
    bytes_io = BytesIO()
    cropped_img.save(bytes_io, format='PNG')
    img_data = bytes_io.getvalue()
    encoded_img_data = base64.b64encode(img_data).decode('utf-8')
    return {'image_data': encoded_img_data, 'box': box}

app.run(debug=True,host='0.0.0.0',port=random.randint(1000,9999))
