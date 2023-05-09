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

@app.route("/selection/<string:x>/<string:y>/<string:option>/<string:tilesizex>/<string:tilesizey>/")
async def get_selection(x,y,option,tilesizex,tilesizey):
    tilesizex,tilesizey=int(tilesizex),int(tilesizey)
    x,y = round_to(tilesizex,int(x)), round_to(tilesizey,int(y))
    box = (x-tilesizex, y-tilesizey, x, y)
    return {'box': box}

app.run(debug=True,host='0.0.0.0',port=random.randint(1000,9999))
