import bs4
from urllib.request import urlopen as urlReq
from bs4 import BeautifulSoup as soup
import re

def scraping():
    f = open("./quotes.txt", "w")
    for i in range(1,81):
        url_req = 'https://www.goodreads.com/quotes/tag/identity?page='+str(1)
        client = urlReq(url_req)
        page_html = client.read()
        client.close()
        page_soup = soup(page_html,"html.parser")
        quotes = page_soup.findAll("div",{"class":"quoteText"})
        for quote in quotes:
            regText = re.sub('\n+',' ', quote.getText())
            f.write(re.sub(' +',' ',regText).split('―')[0]+"\n")
    f.close() 

if __name__ == "__main__":
    scraping()
