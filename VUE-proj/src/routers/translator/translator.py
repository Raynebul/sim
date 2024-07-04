import sys
import json
import sqlite3
import string
import random
code = sys.argv[1]

object = json.loads(sys.argv[2])

exec(code)
print(function(object))