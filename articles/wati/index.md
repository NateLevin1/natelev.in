# Introducing WATI: WebAssembly Text Format Improved!
![HEADER|A computer with code written on it.](images/header.jpg)

How do I start this article? Probably finish WATI first.

![The WATI logo](images/wati.png)

At its core, WATI (**W**eb**A**ssembly **T**ext **I**mproved) is syntactic sugar for writing WAT code. WATI makes it easier to write and read WebAssembly, and is especially useful when writing long, complex functions.

Here's some of the excellent features WATI provides:
 - Inline function arguments: `call $fn(1i32, 2i32)`
 - Get variables without `.get`: `$a`
 - Set variables without `.set`: `$a = $b`
 - Make constants without `.const`: `10i32`, `1.5f32`
 - Make parameters without `(param`: `($a i32)`

WATI also provides excellent VSCode editing and intellisense support **plus** a documentation generator!

## Examples
Lets look at some real world examples of how WATI can simplify the code you write.

NOTE: Many of these examples are from my [Helpful WebAssembly](https://github.com/UltimatePro-Grammer/helpful-webassembly) repository, which provides example implementations of common features found in other languages. Make sure to check it out if you are interested!

### Example 1: Indexing an Array
Here's the code in WAT:
```wat
(func $getIndexI32 (param $arrayOffset i32) (param $index i32) (result i32)
    local.get $arrayOffset
    local.get $index
    i32.const 4 ;; the number of bytes in an i32
    call $getPointerToIndexOfArray ;; get the index
    i32.load ;; push the number at the index on to the stack
)
```
and here's the equivalent in WATI:
```wat
(func $getIndexI32 ($arrayOffset i32) ($index i32) (result i32)
    call $getPointerToIndexOfArray($arrayOffset, $index, 4i32)
    i32.load ;; push the number at the index on to the stack
)
```

Anyways, that is all there's left in this article. I hope you learned something new and use WATI in a future project!

[Interested in WATI's GitHub repo? Click here](https://github.com/UltimatePro-Grammer/wati).

SUGGESTED|/articles/wati/[t]TODO|/articles/wati/[t]TODO|/articles/wati/[t]TODO

ISSUE|1