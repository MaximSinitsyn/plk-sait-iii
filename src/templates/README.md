# Шаблоны компонентов

Шаблоны подключаются через директиву 'include'. 

```
{% include 'advantages.twig' %}
```


Чтобы передать в данные в область видимости шаблона нужно передавать его через атрибут "width" и указывать переменную
"__scope"
```
{% include 'advantages.twig' with {'__scope': advantages} %}
```

## Использование шаблонов
**Файл глобальных настроек `admin.json`**
```
{
    "__root": {},
    "__modules": {
        "moduleName": {
            "name": "Заголовок модуля в админке",
            "json": "moduleName.json"
            "admin": true
        }
    },
    "__scripts": []
}
```
**Файл настроект модуля `moduleName.json`**

```
{
    "title": {
        "data": "Заголовок модуля",
        "type": "text",
        "admin": true
    }
}

```
**Файл главного шаблона `base.twig`**
```
<div>
    {% include 'template.twig' with {'__scope': moduleName} %}
</div>
```
  
**Файл шаблона `template.twig`**
```
<h1>{{ __scope.title }}</h1>
```  

**Результат рендеринга**
```
<div>
    <h1>
        Заголовок модуля
    </h1>
</div>
```
