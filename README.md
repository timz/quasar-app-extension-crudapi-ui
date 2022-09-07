# Quasar App Extension crudapi-ui
Компоненты фронтенда CrudApi

# Install
```bash
yarn add --dev https://github.com/Timz/quasar-app-extension-crudapi-ui
```
```bash
quasar ext invoke crudapi-ui
```

# Uninstall
```bash
quasar ext remove crudapi-ui
```

## Компоненты

| Название               | Описание                                                                     |
|------------------------|------------------------------------------------------------------------------|
| **buttons/**           |                                                                              |
| `CrudButtonInBar`      | Кнопка для использования в кнопочных панелях для `Crud*Card`                 |
| `CrudTableButton`      | Кнопка действия для `CrudTable`                                              |
| **inputs/**            |                                                                              |
| `CrudCheckbox`         | Поле чекбокса                                                                | 
| `CrudDateTime`         | Поле для Date, DateTime, Time                                                |
| `CrudMobile`           | Поле для ввода мобильного                                                    |
| `CrudNumber`           | Поля для ввода числовых значений (в т.ч. с дробной частью)                   |
| `CrudSelectorClient`   | Поле выбора из с писка с подгрузкой всех значений                            |
| `CrudSelectorServer`   | Поле выбора из с писка с sever-side подгрузкой значений                      |
| `CrudString`           | Поле для ввода строковых значений                                            |
| `CrudToggle`           | Поле с переключателем (аналог чекбокса)                                      |
| **templates/**         |                                                                              |
| `CrudEditCard`         | Стандартная форма для правки модели                                          |
| `CrudEditTab`          | Дочерний Tab `CrudEditCard` для отображения/правки связанных данных в форме  |
| `CrudIndexCard`        | Стандартная форма Index страниц                                              |
| `CrudListWithCheckbox` | Дочерний Tab-список с чекбоксами для `CrudEditCard`                          |
| `CrudTable`            | Таблица для навигации по списку моделей                                      |

## Использование
### Пример
Вставляем CrudString для поля модели username. С валидацией: обязательное и длинной от 2 до 150 символов
```vue 
<crud-string v-model="username" label="Логин *"
:rules="[$v.required(), $v.strMinLength(2), $v.strMaxLength(150)]">
</input-string>
```

# License
MIT (c) Tim <timugatu@mail.ru>
