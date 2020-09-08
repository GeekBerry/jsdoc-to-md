
# Example

It is a example to gen markdown string by jsdoc.

- class.js
    - Class
        - [(static)func](#class.js/Class/(static)func)
        - [constructor](#class.js/Class/constructor)
        - [num](#class.js/Class/num)
        - [attr(getter)](#class.js/Class/attr(getter))
        - [attr(setter)](#class.js/Class/attr(setter))
        - [method](#class.js/Class/method)
        - [_asyncMethod](#class.js/Class/_asyncMethod)
- dir
    - class.js
        - DirClass
            - [constructor](#dir/class.js/DirClass/constructor)
            - [member](#dir/class.js/DirClass/member)
        - DirClass.DirMemberClass
            - [(static)member](#dir/class.js/DirClass.DirMemberClass/(static)member)
            - [constructor](#dir/class.js/DirClass.DirMemberClass/constructor)
            - [member](#dir/class.js/DirClass.DirMemberClass/member)
    - func.js
        - [value](#dir/func.js/value)
        - [constant](#dir/func.js/constant)
        - [funcA](#dir/func.js/funcA)
        - [funcB](#dir/func.js/funcB)
        - [funcD](#dir/func.js/funcD)
        - X
            - [(static)funcXB](#dir/func.js/X/(static)funcXB)

----------------------------------------

## Class <a id="class.js/Class"></a>

Class description

## Class.func <a id="class.js/Class/(static)func"></a>

Static function description
> NOTE: method note

* **Parameters**

Name    | Type     | Required | Default | Description
--------|----------|----------|---------|------------
arg     | `number` | true     |         |
options | `object` | true     |         |

## Class.prototype.constructor <a id="class.js/Class/constructor"></a>

* **Parameters**

Name        | Type     | Required | Default | Description
------------|----------|----------|---------|----------------
options     | `object` | true     |         |
options.num | `number` | true     |         | Number argument
options.str | `string` | false    | ''      | String argument

* **Returns**

`Class` class instance

* **Examples**

```
> new Class()
"Class"

> new Class({})
 "Class"
```

## Class.prototype.num <a id="class.js/Class/num"></a>

`number`

Instance attribute description

## Class.prototype.attr <a id="class.js/Class/attr(getter)"></a>

Attribute getter

* **Returns**

`string` 

* **Examples**

```
> cls.attr
"xxx"
```

## Class.prototype.attr <a id="class.js/Class/attr(setter)"></a>

Attribute setter

* **Parameters**

Name  | Type     | Required | Default | Description
------|----------|----------|---------|------------
value | `string` | true     |         |

* **Examples**

```
> cls.attr = "yyy"
```

## Class.prototype.method <a id="class.js/Class/method"></a>

Method description

* **Parameters**

Name    | Type             | Required | Default | Description
--------|------------------|----------|---------|-----------------
...args | `Array.<number>` | true     |         | Args description

* **Returns**

`number` - Return description

* **Examples**

```
> cls.method(1,2,3)
   6
```

```
> cls.method(1,2,3,4)
   10
```

## Class.prototype._asyncMethod <a id="class.js/Class/_asyncMethod"></a>

Async method description

* **Parameters**

Name    | Type             | Required | Default | Description
--------|------------------|----------|---------|-----------------
arg     | `number`         | true     |         | Arg description
...args | `Array.<number>` | true     |         | Args description

* **Returns**

`Promise.<number>` 

----------------------------------------

## DirClass <a id="dir/class.js/DirClass"></a>

DirClass description

## DirClass.prototype.constructor <a id="dir/class.js/DirClass/constructor"></a>

DirClass constructor description

* **Parameters**

Name        | Type     | Required | Default | Description
------------|----------|----------|---------|----------------
options     | `object` | true     |         |
options.num | `number` | true     |         | Number argument
options.str | `string` | false    | ''      | String argument

* **Returns**

`Class` class instance

* **Examples**

```
> new DirClass()
"DirClass"
```

## DirClass.prototype.member <a id="dir/class.js/DirClass/member"></a>

DirClass instance member

----------------------------------------

## DirClass.DirMemberClass <a id="dir/class.js/DirClass.DirMemberClass"></a>

DirMemberClass description

## ~~DirClass.DirMemberClass.member~~ <a id="dir/class.js/DirClass.DirMemberClass/(static)member"></a>

DirMemberClass static member

* **Exceptions**

> DeprecatedError

> StaticError

## DirClass.DirMemberClass.prototype.constructor <a id="dir/class.js/DirClass.DirMemberClass/constructor"></a>

DirMemberClass constructor

## DirClass.DirMemberClass.prototype.member <a id="dir/class.js/DirClass.DirMemberClass/member"></a>

DirMemberClass instance member

----------------------------------------

## value <a id="dir/func.js/value"></a>

`string`

Value description

----------------------------------------

## constant <a id="dir/func.js/constant"></a>

`number`

Constant description

* **Examples**

```
> constant
1
```

----------------------------------------

## ~~funcA~~ <a id="dir/func.js/funcA"></a>

Func A description
  first line of description
  second line of description
 third line of description

> NOTE: markdown note
[see](http://github.com)

* **Parameters**

Name    | Type             | Required | Default | Description
--------|------------------|----------|---------|-----------------
arg     | `number`         | true     |         | Arg description
...args | `Array.<number>` | true     |         | Args description

* **Exceptions**

> DeprecatedError: This function is deprecated

> LogicError

* **Returns**

`object` Return description
- name `string`: Name description
- age `number`: Age description

* **Examples**

```
> funcA(1)
1

> funcA(2)
2
```

```
> funcA({})
 {
   a:b
 }
```

----------------------------------------

## funcB <a id="dir/func.js/funcB"></a>

----------------------------------------

## ~~funcD~~ <a id="dir/func.js/funcD"></a>

Func D description

* **Returns**

`*` 

----------------------------------------

## X.funcXB <a id="dir/func.js/X/(static)funcXB"></a>

Func X.B description

---

*2020-01-01*
