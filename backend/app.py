from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route("/")
def home():
    return "Flask Backend is Running!"

@app.route("/submittodoitem", methods=["POST"])
def submit_todo_item():
    data = request.get_json()

    item_name = data.get("itemName")
    item_description = data.get("itemDescription")

    print("Item Name:", item_name)
    print("Item Description:", item_description)

    return jsonify({
        "message": "To-Do item received successfully",
        "itemName": item_name,
        "itemDescription": item_description
    })

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)