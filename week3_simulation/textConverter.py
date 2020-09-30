import json

def read_json(file_path):
    with open(file_path) as f:
        data = json.load(f)
        f.close()
    fw = open("./converted.txt","w+")
    for ele in data['youtube']:
        fw.write(ele['title']+"\n")
    fw.close()



def main():
    file_path = "./watchHistory.json"
    read_json(file_path)





if __name__ == "__main__":
    main()