# SASS миксины

## Responsive image

Данный миксин помогает в автоматическом режиме подставлять различные разрешения изображений в зависимости от разрешения экрана.

**Вызов миксина**
```
.text {
    width: 30%;
    height: 300px;
    margin: 40px auto 0;
    
    @include image('kvott-logo.png', './images/') {
        background-repeat: no-repeat;
        background-size: 100%;
    };
    
    @include image('kvott-logo.png') {
        background-repeat: no-repeat;
        background-size: 100%;
    };
}
```  
Миксин принимает 2 аргумента:
- `$file` - Имя файла без указания величины масштабируемости `{1x@ | 2x@ | 3x@ | 4x@ | 5x@}`
- `$path` - Пути до папки с изображениями. По умолчанию равен переменной `$_base_path` указанной в файле **variables/variables.scss**  

В фигурных скобках миксина указываются необходимые свойства для позиционирования бекграунда.  
## Media Query

Данный миксин служит для создания по медиа выражений по брейкпоинтам заданным в файле `variables/variables.scss`  

Архумент передаваемый в миксин принимает значение {string} в виде 2х символов обозначающих брейкпоинт - {xs | sm | md | lg | hg}  

**Вызов миксина**

```
@include media-query(xs) {
    color: red;
}

@include media-query(sm) {
    color: green;
}

@include media-query(md) {
    color: blue;
}

@include media-query(lg) {
    color: white;
}

@include media-query(hg) {
    color: black;
}
```