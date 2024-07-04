import sys
import json
import sqlite3
import random
import string
import os
from threading import Thread

index = 0
code = sys.argv[1]
object = json.loads(sys.argv[2])
#object = sys.argv[2]


exec(code)

