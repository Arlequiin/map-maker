from flask import Flask, render_template, request

app = Flask(__name__)


# Define the grid size
grid_size = 16

@app.route("/")
def index():
    return render_template("editor.html")


app.run(debug=True)
