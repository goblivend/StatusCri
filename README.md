# StatutCri

Bot discord to inform if the cri is up or no

This discord bot mainly creates 5 new slash commands to watch in real time the status of the different services offered by the cri.

## Add, Remove, Clear

The main feature of this bot is to create a category in which it will displa channels to inform on the status of the desired services and will be updated every 5 minutes.

<p align="center">
    <img src="./README%20Content/Main%20feature.png?raw=true" alt="Real time updating statuses">
    </br>
    <caption>Status category</caption>
</p>

As we can see we have different visuals.

- ❓ will be the first one you see, it will be the first you see and will only be shown after you add the service until the first update
- ✅ will be shown if the specified service of the cri is online
- ❌ will be shown if the specified service of the cri is offline

To choose the different services simply use the ``/add`` command.
It will sort the different services using the different groups you can see on [Devoups](https://devoups.online).

```js
/add assistants-services: All
```

add/remove/clear/statuses/help

![test](./README%20Content/Direct%20statuses.png?raw=true "Direct statuses")
