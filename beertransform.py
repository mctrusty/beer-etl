import csv

def geninsert(row):
    "generate an insert for the beer ETL job"
    print "INSERT " + row[1] + " into beers"

with open('beerdump.csv') as beerfile:
    beerreader = csv.reader(beerfile, delimiter=',')
    for row in beerreader:
        geninsert(row)


