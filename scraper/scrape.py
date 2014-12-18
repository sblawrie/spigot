from pymongo import MongoClient
from bs4 import BeautifulSoup
import requests

client = MongoClient()

db = client.local

db.cards.remove()

for i in xrange(27, 161):
    body = BeautifulSoup(requests.get('http://instanerd.me/v/{}'.format(i)).text)
    content = body.find(id='content')
    data = {}
    if not content:
        continue
    if hasattr(content, 'img'):
        data['image'] = content.img['src']
    if hasattr(content, 'p'):
        data['content'] = content.p.get_text(strip=True)
    db.cards.insert(data)

for card in db.cards.find():
    print card



