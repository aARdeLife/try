from flask import Flask, request, jsonify
import cv2

app = Flask(__name__)

@app.route('/process_image', methods=['POST'])
def process_image():
    # Process the image here using OpenCV and create a 3D model
    return jsonify({"success": True})

if __name__ == '__main__':
    app.run(debug=True)
