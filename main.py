from flask import Flask, render_template, request
import os, random, math
from PIL import Image
from io import BytesIO
import base64
import json

app = Flask(__name__)


def round_to(rounded,num):
    return int(rounded * math.ceil(float(num) / rounded))

@app.route("/")
async def index():
    tilesets = sorted(os.listdir('static/data/tilesets/images/'))
    return render_template("editor.html",tilesets=tilesets)

@app.route("/selection/<string:x>/<string:y>/<string:option>/<string:tilesize>/")
async def get_selection(x,y,option,tilesize):
    tilesize=int(tilesize)
    x,y = round_to(tilesize,int(x)), round_to(tilesize,int(y))
    box = (x-tilesize, y-tilesize, x, y)
    return {'box': box}

app.run(debug=True,host='0.0.0.0',port=random.randint(1000,9999))
