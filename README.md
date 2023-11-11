# FarmBot Web App Demo extensions by HarvestX

## Project Background

### Introduction to FarmBot:

FarmBot is an ultimate solution for general household who wants to learn how to or has an interest in planting vegetables or crops within their own backyard. It is an interactive robotics that can help you to look after and take care of your plants. For example, it will monitor your garden based on water level, soil conditions etc… and water the plants or remove weeds automatically according to the user’s own settings. 

### The existing solution:

There are a lot of functions that are already built-in available using the FarmBot app graphically. For example,  FarmBot users are able to design their own garden’s layout. What’s more, the users are able to control their devices remotely via the web app. The app has a high degree of freedom for users to set order of executables without restrictions, more importantly, without coding manually.

## Demo

[Demo running on Google Cloud](http://34.129.6.241:3000/demo)

## Description of Key Algorithms / Framework

The key algorithms are developed under frontend/demo/demo_support_framework. The demo_ads.ts and demo_photos.ts are constants involving ad features and photos that supporting images and photos tab under the demo interface.

The supports.ts file involves portion of the key algorithms and units that modifies the existing solution. Including functions of taking photos under a simulated environment and update the regarding image on map, the brand new photo comparison feature where the users can compare the new photos with existing ones, visiting the growing history of a plant. It also contains the advertisement feature, where it pops up and rotate through various different advertisement. 

There are also new demo features modifying the existing solution that is built into the actions.ts file, where we have modified functions sending the action towards the supports.ts framework and modify the variables instead of sending a remote control process to an actual FarmBot device.

### extensions

The presense of demo support framework effctively provides a connection for the developers to continuously implement new features for the demo interface without interrupting with the existing framework of controlling FarmBot devices under a normal account. New developers should implement new variable or simulations within this framework, modifying other related parts and directly invoke the variables from this demo support framework.

## Features

See [User Story](https://github.com/Reesedog/Farmbot-Web-App/blob/dev/docs/HarvestX-User%20Story-151023-093741.pdf)

and [releases](https://github.com/Reesedog/Farmbot-Web-App/releases)

## Documents

Checkout docs/ folder

* User Stories
* Motivational Model
* Non-functional Requirements
* Architecture descriptions and diagrams

And tests/ folder
* Test cases

## Installisation Guide

see [Deployment Guide](https://github.com/Reesedog/Farmbot-Web-App/blob/dev/docs/HarvestX-Deployment%20Guide-151023-095140.pdf)

## Changelog

see [Releases](https://github.com/Reesedog/Farmbot-Web-App/releases)

and [Change log](https://github.com/Reesedog/Farmbot-Web-App/blob/dev/docs/HarvestX-Changelog-111123-093205.pdf)

## Traceability Matrix for testing

see [tests matrix](https://github.com/Reesedog/Farmbot-Web-App/blob/dev/tests/HarvestX-Testing-201023-091017.pdf)

The test cases are within the frontend/ under folder each relevant functions 
The newly added / modified cases are
* frontend/demo/__tests__/demo_iframe_test.tsx
* frontend/photos/__tests__/photos_test.tsx
* frontend/settings/fbos_settings/__tests__/ota_time_selector_test.tsx
* frontend/devices/__tests__/actions_test.ts

We have also run other existing test cases for purpose of integration testing


