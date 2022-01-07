from flask import Flask, request, session
from flask_socketio import SocketIO, send, emit
import numpy as np
import spacy
from scipy.spatial import distance
import random
import string
import os
from uuid import uuid4

nlp = spacy.load('en_core_web_lg')
word_ids = [word_id for word_id in nlp.vocab.vectors.keys() if (lambda word: word.isalpha() and word.islower())(nlp.vocab[word_id].text)]
word_vecs = [nlp.vocab.vectors[x] for x in word_ids]
word_vecs = np.array(word_vecs)

app = Flask(__name__)
app.secret_key = os.environ.get('SECRET_KEY', 'dev')
socketio = SocketIO(app, manage_session=False)

# the metric used to norm word vectors
METRIC = 'cosine' 

def vec_dist(w1, w2):
    return distance.cdist(np.array([w1]), np.array([w2]), metric=METRIC)[0,0]

# turns word into vector
def wv(w):
    ret = nlp(w)[0].vector
    if not ret.any():
        # all zeros, not a word
        raise ValueError(f"word {w} does not exist")
    return ret

def closest_n_words(inp_word, n):
    closest_indexes = np.argpartition(distance.cdist(np.array([inp_word]), word_vecs, metric=METRIC), n)[0,:n]
    result = []
    for closest_index in closest_indexes:
        word_id = word_ids[closest_index]
        output_word = nlp.vocab[word_id].text
        result.append((output_word, vec_dist(word_vecs[closest_index], inp_word)))
    result.sort(key=lambda k: k[1])
    return result


# Six digit random code.
def random_code() -> int:
    return random.randint(100_000, 999_999)

class Room:
    code: int
    player_ids: list[str]
    playing: list[str]
    ready: list[str]

    def __init__(self, creator_id: str):
        self.code = random_code()
        self.player_ids = [creator_id]

    def join_room(self, player_id: str):
        self.player_ids.append(player_id)

    def is_playing(self) -> bool:
        return len(self.playing) > 0

    def get_info(self) -> dict[str, any]:
        return {
            "currentlyPlaying": self.is_playing(),
            "players": idsToNames(self.player_ids),
            "ready": idsToNames(self.ready),
            "playing": idsToNames(self.playing)
        }

    def set_ready(self, sid: str, ready: bool):
        already_present = sid in self.ready
        if ready:
            if not already_present:
                self.ready.append(sid)
        elif not ready:
            if already_present:
                self.ready.remove(sid)

    def game_should_start(self):
        return len(self.ready) > len(self.playing)/2

sids_to_usernames: dict[str, str] = {}
def idsToNames(sid_arr):
    return [sids_to_usernames[sid] for sid in sid_arr]
rooms: dict[int, Room] = {}
# session_ids: dict[str, str] = {}

def create_room(username):
    room = Room(username)
    rooms[room.code] = room
    return room.code

def create_sid():
    sid = uuid4()
    session['sid'] = sid

def get_sid():
    return session['sid']

def validate_username(data) -> bool:
    return (data is not None) and ('username' in data) and isinstance(data['username'], str) and len(data['username']) > 0

@app.post('/api/create-room')
def api_create_room():
    data = request.json
    if not validate_username(data):
        return { 'error': 'bad body' }, 400
    create_sid()
    session['username'] = data['username']
    sids_to_usernames[get_sid()] = data['username']
    code = create_room(get_sid())
    session['joined_room'] = code
    return { 'code': code }

@app.post('/api/join-room')
def api_join_room():
    data = request.json
    if not validate_username(data) or 'code' not in data or not isinstance(data['code'], int):
        return { 'error': 'bad body' }, 400
    code = data['code']
    if code not in rooms:
        return { 'error': 'Invalid room code' }, 400
    room_before_players = idsToNames(rooms[code].player_ids)
    if data['username'] in room_before_players:
        return { 'error': "Username is already present in that room" }, 400
    create_sid()
    session['username'] = data['username']
    sids_to_usernames[get_sid()] = data['username']
    rooms[code].join_room(get_sid())
    session['joined_room'] = code
    # TODO what if room is currently playing?
    return { 'code': code }

@socketio.on('connect')
def socket_connect():
    send('room-info', rooms[session['code']].get_info())

@socketio.on('status-update')
def player_status_update(data):
    if data is None or 'ready' not in data or not isinstance(data['ready'], bool):
        return { 'error', 'bad body' }, 400
    rooms[session['code']].set_ready(get_sid())
    emit('room-info', rooms[session['code']].get_info())
    if rooms[session['code']].game_should_start():
        pass # TODO

if __name__ == '__main__':
    socketio.run(app)
