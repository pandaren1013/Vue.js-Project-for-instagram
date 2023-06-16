# WedemyClient

![Version](https://img.shields.io/badge/version-1.2.0-blue.svg?cacheSeconds=2592000)
![Prerequisite](https://img.shields.io/badge/node-16.x-blue.svg)
[![Package - vue](https://img.shields.io/github/package-json/dependency-version/Longwater1234/wedemyclient/vue?color=blue)](https://www.npmjs.com/package/vue)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/Longwater1234/WedemyClient/graphs/commit-activity)
[![License: MIT](https://img.shields.io/github/license/Longwater1234/WedemyClient)](https://github.com/Longwater1234/WedemyClient/blob/master/LICENSE)
[![Package - typescript](https://img.shields.io/github/package-json/dependency-version/Longwater1234/wedemyclient/dev/typescript?color=blue)](https://www.npmjs.com/package/typescript)

(Frontend Repo). Clone of Udemy, PWA (progressive web app) built using Vue 3 + Typescript + Element Plus UI (no VueX).
This App is also integrated with PayPal and CreditCard checkout (both powered by **Braintree Payments**). For Braintree
Payments tutorials and samples, please see
the [official docs for JS](https://developer.paypal.com/braintree/docs/guides/drop-in/setup-and-integration/javascript/v3)
. (Will require a backend server)

## Backend Repo

The backend for the Demo is a separate Java Springboot application [available here](https://github.com/Longwater1234/WedemyServer).
However, please note you can use any Backend framework or language you like with this project.

## Install

```sh
# Requires node 16.x or higher
npm install
```

## Usage

In local development, the app runs on port 8080 by default. You can change it in [vue.config.js](vue.config.js).

```sh
npm run serve
```

For production, run `npm run build`, then follow official Vue CLI guide
on [deployment](https://cli.vuejs.org/guide/deployment.html), depending on your hosting of choice.

## [Live Demo](https://wedemy.up.railway.app/) - updated 2023 Jan

PLEASE READ: The Demo uses Sandbox (Dev) Mode of Braintree Payments. No actual money will be deducted on Checkout. You
**should** use test credit-card
numbers [listed here](https://developer.paypal.com/braintree/docs/guides/credit-cards/testing-go-live/java). Also, this
demo serves embedded video from YouTube (for simplicity). In reality, you should switch to a customized, cloud video
platform like Cloudinary or Brightcove.

### Test Accounts for Demo

If you don't want to Register, You can still play around the live demo using any of these Test accounts:

<table>
    <tr>
        <th>email</th>
        <th>pass (Dont ignore the "!")</th>
    </tr>
    <tr>
        <td>anna@example.com</td>
        <td><code>anna_qwerty9876!</code></td>
    </tr>
    <tr>
        <td>bob@example.com</td>
        <td><code>bob_qwerty9876!</code></td>
    </tr>
    <tr>
        <td>coco@example.com</td>
        <td><code>coco_qwerty9876!</code></td>
    </tr>
    <tr>
        <td>damian@example.com</td>
        <td><code>damian_qwerty9876!</code></td>
    </tr>
    <tr>
        <td>eric@example.com</td>
        <td><code>eric_qwerty9876!</code></td>
    </tr> 
    <tr>
        <td>fiona@example.com</td>
        <td><code>fiona_qwerty9876!</code></td>
    </tr>
</table>

## Required 3rd party Services

- [Google OAuth Credentials](https://console.developers.google.com/apis/credentials) (for Google Login)
- [Braintree Developer](https://developer.paypal.com/braintree/docs) Account (for payments handling)
- (OPTIONAL) Free PayPal Business Account.
- IMPORTANT ⚠: Remember to create an `.env` file at root folder and fill in appropriate values (see _.env.sample_)

### 📕 Resources

- For Braintree tutorials, please see
  the [official docs for JS](https://developer.paypal.com/braintree/docs/guides/drop-in/setup-and-integration/javascript/v3)
- For Google Login tutorials and code samples, please
  see [official docs](https://developers.google.com/identity/gsi/web/guides/overview)
- [Element Plus UI](https://element-plus.org/en-US/) - see official docs
- 
## Pull Requests & Contributions

Contributions, issues and feature requests are welcome!
Feel free to check [issues page](https://github.com//Longwater1234/WedemyClient/issues). For more TODO's for this
project, see list in [CONTRIBUTING.md](CONTRIBUTING.md)


## 📝 License

&copy; 2022 Davis Tibbz
This project is [MIT](https://github.com/Longwater1234/WedemyClient/blob/master/LICENSE) licensed.


### Credits
- Homepage banner image: [Avi Richards, Unsplash](https://unsplash.com/@avirichards)