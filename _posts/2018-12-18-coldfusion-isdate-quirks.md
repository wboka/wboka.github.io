---
layout: post
title: "ColdFusion isDate() Validation Quirks"
date: 2018-12-18 10:34:45 -0500
categories: [web-development]
tags: [date, validation, coldfusion, post-mortem]
---

Hello all!

I ran into yet another interesting situation with dates yesterday. We had a user enter a floating point number that was passed to a general use function that mapped to table columns in a database.

<!--more-->

## Example Data

```json
{
  "table": "products",
  "columns": {
    "product": "Sand",
    "quantity": 95.5,
    "date_ordered": "12/17/2018"
  }
}
```

## Technique

Loop over the columns and if they pass validation, apply that validation's data type or wrap the date with a string. In this case we were looking at whether a value was a date. If so, wrap the value in a custom function to return an Oracle `to_date()` string.

## Code

This is a subset of the actual code.

```html
<cfset interpreted = {} />
<cfloop array="columns" index="c">
  <cfif isDate(c)>
    <cfset interpreted[c] = oracleDate(c) />
  <cfelse>
    <cfset interpreted[c] = c />
  </cfif>
</cfloop>

<cffunction name="oracleDate">
  <cfargument name="date_value" required="true" />

  <cfif len(date_value) gt 0>
    <cfreturn "TO_DATE('" & DateFormat(ParseDateTime(date_value), "MM/DD/YYYY") & " " & TimeFormat(ParseDateTime(date_value), "HH:mm") & "','MM/DD/YYYY HH24:MI')" />
  <cfelse>
    <cfreturn "''" />
  </cfif>
</cffunction>
```

## Expected Results

```json
{
  "table": "products",
  "columns": {
    "product": "Sand",
    "quantity": 95.5,
    "date_ordered": "12/17/2018"
  },
  "interpreted": {
    "product": "Sand",
    "quantity": 95.5,
    "date_ordered": "to_date(12/17/2018 00:00, 'MM/DD/YYYY HH24:MI')"
  }
}
```

## Actual Results

### False Positives

- ColdFusion 10
- ColdFusion 11
- ColdFusion 2016
- ColdFusion 2018

```json
{
  ...
  "interpreted": {
    ...
    "quantity": "to_date(05/01/1995 00:00, 'MM/DD/YYYY HH24:MI')",
    "date_ordered": "to_date(12/17/2018 00:00, 'MM/DD/YYYY HH24:MI')"
  }
}
```

### Correct

The following version of CFML engines validate correctly.

- Lucee 5.0
- Railo 4.2

```json
{
  ...
  "interpreted": {
    ...
    "quantity": 95.5,
    "date_ordered": "to_date(12/17/2018 00:00, 'MM/DD/YYYY HH24:MI')"
  }
}
```

### Unknown

- Lucee 4.5 (Never returned)
