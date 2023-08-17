from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

messages = []

@app.route('/')
def index():
    return render_template('index.html', messages=messages)

@app.route('/webhook', methods=['POST'])
def webhook():
    data = request.json
    user_message = data['message']
    
    bot_response = respond_to_message(user_message)
    messages.append(('user', user_message))
    messages.append(('bot', bot_response))
    
    return jsonify({"response": bot_response})

def respond_to_message(message):
    if message.lower() == 'hi':
        response = "Hai juga!"
    elif message.lower() == 'siapa nama mu?':
        response = "Nama aku Manako Lime Chan"
    elif message.lower() == 'uname -a':
        response = "Linux ManakoOS 5.2.7_Beta ManakoVortexa-Flux1 #1 SMP PREEMPT Fri Jul 28 22:16:53 WIB 2023 x86_64 GNU/Linux"
    else:
        response = "Saya mendengar Anda. Ada yang bisa saya bantu?"
    return response

if __name__ == '__main__':
    app.run(debug=True)
