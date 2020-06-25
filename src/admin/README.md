# Папка с настройками

## Файл `admin.json`
 
`__` - означает системное свойство

**Главные системные свойства:**  
- `__root` - Глобальная область видимости
- `__modules` - Область видимости модулей
- `__scripts` - Подключаемые скрипты через админку

**Подключение стороннего файла**  
```
{
    "json": "block.json"
}
```

**Название модуля для админ панели**  
```
{
    "name": "Имя модуля"
}
```

**Данные модуля**    

Подключается в том случае, если не указано свойство `"json"`
```
{
    "data": {}
}
```
   
**Показывать настройки в админ панели или нет**  
```
{
    "admin": {true | false}
}
```

**Пример файла admin.json**
```
{
    "__root": {
        "phone": {
            "data": "+7 916 111-11-11",
            "type": "text",
            "admin": true
        }
    },
    "__modules": {
        "module_one": {
            "name": "Заголовок модуля в админке",
            "json": "module_one.json",
            "admin": true
        },
        "module_two": {
            "name": "Заголовок модуля в админке",
            "data": {
                "title": {
                    "data": "Заголовок модуля",
                    "type": "text",
                    "admin": true
                },
                "text": {
                    "data": "Текст модуля",
                    "type": "textbox",
                    "admin": true
                }
            },
            "admin": true
        }
    },
    "__scripts": [
        {
            "data": "<script>console.log('test');</script>",
            "type": "textarea",
            "admin": "true"
        }
    ]
}
```
**Пример использования**
```
<div>{{ __root.phone }}</div>

{% include 'template.twig' with {'__scope': module_one} %}
{% include 'template.twig' with {'__scope': module_two} %}

{% for script in __scripts %}
    {{ script|raw }}
{% endfor %}
```


## Файл конфигурации модуля `filename.json`
 
Корневые своейства определяют переменную для шаблона. Свойство содержит в себе несколько вложенных свойств:  
- `"data"` - {string | object | array} Данные передающиеся в шаблон.
- `"type"` - {string} Тип поля для редактирования в админ панели
- `"admin"` - {true | false} Определяет отображение поля для редактирования в админ панели. Если параметр не установлен, то по умолчанию
используется `true`  


### Тип поля для админ панели
- {text} - input
- {textbox} - textarea
- {image} - file 
  
### Данные {string}

**Значение**
```
"title": {
    "data": "Текст"
}
```  
**Использование в шаблоне**
```
{{ __scope.title }}
```

### Данные {object}
**Значение**
```
"image": {
    "data": {
        "src": "/filepath/file.jpg",
        "alt": "Описание изображения"
    }
}
```
**Использование в шаблоне**
```
<img src="{{ __scope.image.src }}" alt="{{ __scope.image.alt }}" />
```

### Данные {array}
**Значение**
```
"items": {
    "data": [
        {
            "title": "Заголовок_1"
        },
        {
            "title": "Заголовок_2"
        },
        {
            "title": "Заголовок_3"
        }
    ]
}
```
**Использование в шаблоне**
```
<ul>
    {% for item in items %}
        <li>{{ item.title }}</li>
    {% endfor %}
</ul>
```