from tkinter.filedialog import askopenfilename
import pytesseract
from PIL import Image
filename = askopenfilename()
result = pytesseract.image_to_string(filename) 
with open('card_number.txt',mode ='w') as file:
    file.write(result) 
    print(result)