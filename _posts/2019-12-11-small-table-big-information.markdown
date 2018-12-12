---
layout: post
title: "Small Table, Big Information"
date: 2018-12-11 16:56:00 -0500
categories: [web-development]
tags: [javascript, table, VueJS, SweetAlert, data]
---

Hello all!

In a tale as old as time itself, my customer wanted a lot of information available in a table format while being narrow enough to fit on a mobile device.
<!--more-->

## Problem

Using a standard HTML table causes overflow issues on smaller devices. Using an `overflow: auto;` CSS property works if you don't mind your users scrolling horizontally. This introduces a strange UX depending on the page layout. For instance on iOS devices a swipe left or right will take the browser backwards or forwards (respectively) in the history.

## Solution

Display only the vital information in the table based on the screen size and move the remainder into a "more information" link or button. I used [VueJS](https://vuejs.org) to manage the client side data in this example but you can use whichever technique you feel comfortable with. I display the extra information with a [SweetAlert](https://sweetalert.js.org).

## Code

<p data-height="265" data-theme-id="0" data-slug-hash="xJqyMd" data-default-tab="js,result" data-user="wboka" data-pen-title="ProfileAlert" class="codepen">See the Pen <a href="https://codepen.io/wboka/pen/xJqyMd/">ProfileAlert</a> by Wayne Boka (<a href="https://codepen.io/wboka">@wboka</a>) on <a href="https://codepen.io">CodePen</a>.</p>

## Technologies Used

- [CSS](https://en.wikipedia.org/wiki/Cascading_Style_Sheets)
- [SweetAlert](https://sweetalert.js.org)
- [Pug](https://pugjs.org)
- [VueJS](https://vuejs.org)

**_Wayne_**

<script async src="https://static.codepen.io/assets/embed/ei.js"></script>
