from flask import Flask, render_template, redirect, request, make_response, Response, jsonify
import random, string

app = Flask(__name__)

f = open('chat_log', 'r')
print "first"
mainchat = f.read()
colors = ['red','blue','green','orange','purple']

@app.route('/')
def showPage():
	global colors
	#check if user has a random set id in cookie
	#if not assign one to user
	username = request.cookies.get('username')
	resp = make_response(render_template('index.html', main = mainchat))
	if (username == None):
		randName = ''.join(random.choice(string.ascii_lowercase + string.digits) for _ in range(7))
		randCol = "#%06x" % random.randint(0, 0xFFFFFF)
		resp.set_cookie('username', randName)
		resp.set_cookie('color', randCol)
		return resp

	else:
		return resp

@app.route('/sendMsg', methods=['POST'])
def submit_textarea():
	global mainchat
	content = request.get_json(force=True)
	print content
	msg = content['text']
	username = request.cookies.get('username')
	color = request.cookies.get('color')
	if (username == None):
		return redirect('/')
	mainchat += "<b><font color=\"" + color + "\"> " + username + ": </font></b>" + msg + "</br>"
	f = open('chat_log', 'w')
	f.write(mainchat)
	return redirect('/')

#api that returns chat as json object
@app.route('/getChat', methods = ['GET'])
def api_hello():
	global mainchat
	data = {
		'data'  : mainchat
	}
	resp = jsonify(data)
	resp.status_code = 200
	return resp

if __name__ == '__main__':
	app.run(host='0.0.0.0', port=10000, debug=False)
