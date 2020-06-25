# Вспомогательные утилиты

### Responsive Images


Найстроки:
```
"VAR": {
  "data": {
    "base": "./images/",
    "file": "kvott-logo.png",
    "alt": "Описание изображения"
  }
}
```
**Параметры `"base"` и `"file"` являются обязательными**  
  
  
Использование:
```
{% include 'utils/image.twig' with {'__scope': VAR, '__class': "myClass"} %}
```

В переменную `__class` передается класс необходимый для передачи во внутренний scope.   
**`__class` принимает только значение {string}**