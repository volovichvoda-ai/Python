from flask import Flask, render_template

app = Flask(__name__)

FUNCTIONS = [
    {"name": "print()", "category": "Ввод и вывод", "description": "Выводит текст или значение на экран.", "example": 'print("Привет, мир!")', "result": "Привет, мир!"},
    {"name": "input()", "category": "Ввод и вывод", "description": "Получает текст, который вводит пользователь.", "example": 'name = input("Как тебя зовут? ")\\nprint(name)', "result": "Пользователь вводит своё имя"},
    {"name": "type()", "category": "Типы данных", "description": "Показывает тип указанного объекта.", "example": 'print(type(15))', "result": "<class 'int'>"},
    {"name": "int()", "category": "Преобразование", "description": "Преобразует значение в целое число.", "example": 'age = int("13")\\nprint(age)', "result": "13"},
    {"name": "float()", "category": "Преобразование", "description": "Преобразует значение в дробное число.", "example": 'price = float("12.5")\\nprint(price)', "result": "12.5"},
    {"name": "str()", "category": "Преобразование", "description": "Преобразует значение в строку.", "example": 'number = str(2026)\\nprint(number)', "result": "2026"},
    {"name": "bool()", "category": "Преобразование", "description": "Преобразует значение в логический тип True или False.", "example": 'print(bool(1))\\nprint(bool(0))', "result": "True\\nFalse"},
    {"name": "len()", "category": "Коллекции", "description": "Возвращает количество элементов или символов.", "example": 'print(len("Python"))', "result": "6"},
    {"name": "sum()", "category": "Числа", "description": "Складывает числа в последовательности.", "example": 'print(sum([2, 4, 6]))', "result": "12"},
    {"name": "min()", "category": "Числа", "description": "Находит наименьшее значение.", "example": 'print(min(8, 3, 10))', "result": "3"},
    {"name": "max()", "category": "Числа", "description": "Находит наибольшее значение.", "example": 'print(max(8, 3, 10))', "result": "10"},
    {"name": "abs()", "category": "Числа", "description": "Возвращает абсолютное значение числа.", "example": 'print(abs(-17))', "result": "17"},
    {"name": "round()", "category": "Числа", "description": "Округляет число.", "example": 'print(round(3.14159, 2))', "result": "3.14"},
    {"name": "range()", "category": "Последовательности", "description": "Создаёт последовательность целых чисел.", "example": 'for i in range(3):\\n    print(i)', "result": "0\\n1\\n2"},
    {"name": "sorted()", "category": "Коллекции", "description": "Возвращает новый отсортированный список.", "example": 'print(sorted([3, 1, 2]))', "result": "[1, 2, 3]"},
    {"name": "reversed()", "category": "Последовательности", "description": "Возвращает элементы в обратном порядке.", "example": 'print(list(reversed([1, 2, 3])))', "result": "[3, 2, 1]"},
    {"name": "enumerate()", "category": "Последовательности", "description": "Позволяет получать индекс и элемент при переборе.", "example": 'for i, name in enumerate(["Аня", "Ира"]):\\n    print(i, name)', "result": "0 Аня\\n1 Ира"},
    {"name": "zip()", "category": "Последовательности", "description": "Объединяет элементы нескольких последовательностей попарно.", "example": 'print(list(zip([1, 2], ["a", "b"])))', "result": "[(1, 'a'), (2, 'b')]"},
    {"name": "list()", "category": "Коллекции", "description": "Создаёт список.", "example": 'letters = list("cat")\\nprint(letters)', "result": "['c', 'a', 't']"},
    {"name": "dict()", "category": "Коллекции", "description": "Создаёт словарь — коллекцию пар ключ-значение.", "example": 'person = dict(name="Ira", age=13)\\nprint(person)', "result": "{'name': 'Ira', 'age': 13}"},
    {"name": "help()", "category": "Справка", "description": "Показывает справочную информацию об объекте.", "example": 'help(str)', "result": "Справка о типе str"},
]

@app.route("/")
def index():
    return render_template("index.html", functions=FUNCTIONS)

@app.route("/functions")
def functions():
    return render_template("functions.html", functions=FUNCTIONS)

@app.route("/practice")
def practice():
    return render_template("practice.html")

@app.route("/about")
def about():
    return render_template("about.html")

if __name__ == "__main__":
    app.run(debug=True)
