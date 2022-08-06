<p align="center">
<img src="https://i.imgur.com/McR9nWr.png" alt="Coocal Logo" width="400"/>
</p>

<br>

<p align="center">🖖 A simple frontend library for manage cookies and local-storage easily.</p>

## Features

- Lightweight
- Supports ES modules
- Easy API for dealing with cookies
- Expire dates for local-storage items

## Installation

Using npm:

```js
npm install @coocal/core
```

## Usage

```js
import Coocal from '@coocal/core'

const { cookies, localStorage } = Coocal
```

## Cookies

Create an accessible cookie from the entire site:

```js
cookies.set('name', 'value')
```

Create a 5-day cookie accessible from the entire site:

```js
cookies.set('name', 'value', { expires: { d: 5 } })
```

Read a cookie:

```js
cookies.get('name') // => "value"
```

Read all cookies:

```js
cookies.getAll() // => [cookie1, cookie2, ...]
```

Remove a cookie:

```js
cookies.remove('name')
```

Remove all of the cookies:

```js
cookies.removeAll()
```

## Cookie Options

Set expiration date of the cookie:

```js
cookies.set('name', 'value', { expires: { d: 7, h: 12, m: 40 } })
// Y: year, M: month, W: week, d: day, h: hour, m: minute, s: second

// or

cookies.set('name', 'value', { expires: '7d 12h 40m' })

// or

cookies.set('name', 'value', { expires: 650400 })
// 7 days, 12 hours and 40 minutes in seconds
```

Set path of the cookie:

```js
cookies.set('name', 'value', { path: '/profile.html' })
```

Set domain of the cookie:

```js
cookies.set('name', 'value', { domain: 'localhost' })
```

Set sameSite option of the cookie:

```js
cookies.set('name', 'value', { sameSite: 'Strict' })
// SameSite: Strict, Lax, None
```

Set secure option of the cookie:

```js
cookies.set('name', 'value', { secure: true })
```

## Local Storage

Create a local storage item:

```js
localStorage.set('name', 'value')
```

Create a local storage item for three days:

```js
localStorage.set('name', 'value', { expires: { d: 3 } })
```

Read a local storage item:

```js
localStorage.get('name') // => "value"
```

Read all local storage items:

```js
localStorage.getAll() // => [item1, item2, ...]
```

Remove a local storage item:

```js
localStorage.remove('name')
```

Remove all of the local storage items:

```js
localStorage.removeAll()
```

## Local Storage Options

Set expiration date of the local storage item:

```js
localStorage.set('name', 'value', { expires: { W: 2, m: 30 } })
// Y: year, M: month, W: week, d: day, h: hour, m: minute, s: second

// or

localStorage.set('name', 'value', { expires: '2W 30m' })

// or

localStorage.set('name', 'value', { expires: 1211400 })
// 2 weeks and 30 minutes in seconds
```

## Contributing

1. Fork this repository.
2. Create a new branch with feature name.
3. Create your feature.
4. Commit and set commit message with feature name.
5. Push your code to your fork repository.
6. Create pull request.

## License

[MIT](https://github.com/canccevik/coocal/blob/master/LICENSE)

Copyright (c) 2022 [Can Çevik](https://github.com/canccevik)
