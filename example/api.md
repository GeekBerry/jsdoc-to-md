
# Example

It is a example to gen markdown string by jsdoc.

- class.js
    - [Class](#class.js/Class)
- dir
    - class.js
        - [DirClass](#dir/class.js/DirClass)
        - [DirClass.DirMemberClass](#dir/class.js/DirClass.DirMemberClass)
    - func.js
        - [value](#dir/func.js/value)
        - [constant](#dir/func.js/constant)
        - [funcA](#dir/func.js/funcA)
        - [funcB](#dir/func.js/funcB)
        - [funcD](#dir/func.js/funcD)

----------------------------------------

## Class <a id="class.js/Class"></a>
*class.js/Class*

Class description

## Class.func <a id="class.js/func"></a>
*class.js/func*

Static function description
> NOTE: method note

* **Parameters**

Name    | Type     | Required | Default | Description
--------|----------|----------|---------|------------
arg     | `number` | true     |         |
options | `object` | true     |         |

## Class.prototype.constructor <a id="class.js/constructor"></a>
*class.js/constructor*

*no description*

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

## Class.prototype.num <a id="class.js/num"></a>
*class.js/num*

`number`

Instance attribute description

## Class.prototype.attr (getter) <a id="class.js/attr (getter)"></a>
*class.js/attr (getter)*

Attribute getter

* **Returns**

`string` 

* **Examples**

```
> cls.attr
"xxx"
```

## Class.prototype.attr (setter) <a id="class.js/attr (setter)"></a>
*class.js/attr (setter)*

Attribute setter

* **Parameters**

Name  | Type     | Required | Default | Description
------|----------|----------|---------|------------
value | `string` | true     |         |

* **Examples**

```
> cls.attr = "yyy"
```

## Class.prototype.method <a id="class.js/method"></a>
*class.js/method*

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

## Class.prototype._asyncMethod <a id="class.js/_asyncMethod"></a>
*class.js/_asyncMethod*

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
*dir/class.js/DirClass*

DirClass description

## DirClass.prototype.constructor <a id="dir/class.js/constructor"></a>
*dir/class.js/constructor*

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

----------------------------------------

## DirClass.DirMemberClass <a id="dir/class.js/DirClass.DirMemberClass"></a>
*dir/class.js/DirClass.DirMemberClass*

DirMemberClass description

## ~~DirClass.DirMemberClass.member~~ <a id="dir/class.js/member"></a>
*dir/class.js/member*

DirMemberClass static member

* **Exceptions**

> DeprecatedError

> StaticError

## DirClass.DirMemberClass.prototype.member <a id="dir/class.js/member"></a>
*dir/class.js/member*

DirMemberClass instance member

----------------------------------------

## value <a id="dir/func.js/value"></a>
*dir/func.js/value*

`string`

Value description

----------------------------------------

## constant <a id="dir/func.js/constant"></a>
*dir/func.js/constant*

`number`

Constant description

* **Examples**

```
> constant
1
```

----------------------------------------

## ~~funcA~~ <a id="dir/func.js/funcA"></a>
*dir/func.js/funcA*

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
*dir/func.js/funcB*

*no description*

----------------------------------------

## ~~funcD~~ <a id="dir/func.js/funcD"></a>
*dir/func.js/funcD*

Func D description

* **Returns**

`*` 

----------------------------------------

## X.funcXB <a id="dir/func.js/funcXB"></a>
*dir/func.js/funcXB*

Func X.B description

---

*2020-01-01*