# Coocal 
🖖 A simple front-end library for manage cookies and localStorage easily.

 - [Features](#features)
 - [Installation](#installation)
 - [Usage](#usage)
 - [Cookies](#cookies)
 - [Cookie Options](#cookie-options)
 - [localStorage](#localstorage)
 - [localStorage Options](localstorage-options) 

## Features

 - Lightweight
 - Supports ES modules
 - Expire dates for localStorage items

##  Installation

Using npm:
```javascript
npm install coocal --save
```
Using unpkg CDN:
```html
<script>var exports = {"__esModule": true}</script> <!-- This line is required -->
<script src="https://unpkg.com/coocal@^0.5.0/index.js"></script>
```

## Usage
```javascript
import Coocal from 'coocal';
// This is not required if you installed the package with CDN
```

## Cookies

Create an accessible cookie from the entire site:

```javascript
Coocal.setCookie("name", "value");
// Default expiration time is 1 week
```

Create a 5-day cookie accessible from the entire site:

```javascript
Coocal.setCookie("name", "value", { expiresIn: { d: 5 } });
```

Read a cookie:
```javascript
Coocal.getCookie("name"); // => "value"
```

Read all cookies:
```javascript
Coocal.getAllCookies(); // => [cookie1, cookie2, ...]
```

Remove a cookie:
```javascript
Coocal.removeCookie("name");
```

## Cookie Options

Set expiration date of the cookie:

```javascript
Coocal.setCookie("name", "value", { expiresIn: { d: 7, h: 12, m: 40 } });
// Y: year, M: month, W: week, d: day, h: hour, m: minute, s: second

// or

Coocal.setCookie("name", "value", { expiresIn: "7d 12h 40m" });

// or

Coocal.setCookie("name", "value", { expiresIn: 650400 });
// 7 days, 12 hours and 40 minutes in seconds
```

Set path of the cookie:
```javascript
Coocal.setCookie("name", "value", { path: "/profile.html" });
```

Set domain of the cookie:
```javascript
Coocal.setCookie("name", "value", { domain: "localhost" });
```

Set sameSite option of the cookie:
```javascript
Coocal.setCookie("name", "value", { sameSite: SameSite.Strict });
// SameSite: Strict, Lax, None
```

Set secure option of the cookie:
```javascript
Coocal.setCookie("name", "value", { secure: true });
```

Set httpOnly option of the cookie:
```javascript
Coocal.setCookie("name", "value", { httpOnly: true });
```

## localStorage

Create a localStorage item:
```javascript
Coocal.setLocalStorageItem("name", "value");
// Default expiration time is 1 year
```

Create a localStorage item for three days:
```javascript
Coocal.setLocalStorageItem("name", "value", { expiresIn: { d: 3 } });
```

Read a localStorage item:
```javascript
Coocal.getLocalStorageItem("name"); // => "value"
```

Read all localStorage items:
```javascript
Coocal.getAllLocalStorageItems(); // => [item1, item2, ...]	
```

Remove a localStorage item:
```javascript
Coocal.removeLocalStorageItem("name");
```

## localStorage Options

Set expiration date of the localStorage item:
```javascript
Coocal.setLocalStorageItem("name", "value", { expiresIn: { W: 2, m: 30 }});
// Y: year, M: month, W: week, d: day, h: hour, m: minute, s: second

// or

Coocal.setLocalStorageItem("name", "value", { expiresIn: "2W 30m" });

// or

Coocal.setLocalStorageItem("name", "value", { expiresIn: 1211400 }); 
// 2 weeks and 30 minutes in seconds
```

## License

[MIT](https://github.com/canccevik/coocal/blob/master/LICENSE)

Copyright (c) 2020 [Can Çevik](https://github.com/canccevik)