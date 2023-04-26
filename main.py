from flask import Flask, render_template, request
import os, random, math
from PIL import Image
app = Flask(__name__)


def round_to_16(num):
    return int(16 * math.ceil(float(num) / 16))

@app.route("/")
def index():
    tilesets = os.listdir('static/data/tilesets/images/')
    return render_template("editor.html",tilesets=tilesets)

@app.route("/selection/<string:x>/<string:y>/")
def get_selection(x,y):
    x,y = round_to_16(int(x)), round_to_16(int(y))
    box = (x-16, y-16, x, y)
    print(box)
    return str(box)

app.run(debug=True,host='0.0.0.0',port=random.randint(1000,9999))
