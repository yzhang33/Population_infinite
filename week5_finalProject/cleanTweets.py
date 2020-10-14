import re
import string
import pandas as pd
import preprocessor as p

def cleanTweet(tweets):
    ret = []
    for t in tweets:
        tweet = str(t)
        ret.append(p.clean(tweet))
    return ret


df = pd.read_csv('./trump.csv', parse_dates = [2])
data = df.copy()
biden_tweets = cleanTweet(data['Tweet_Text'])
f=open("./trump.txt","w")
for t in biden_tweets:
    f.write(t+"\n")
f.close