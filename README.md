# StatutCri

Bot discord to inform if the cri is up or no

This discord bot mainly creates 5 new slash commands to watch in real time the status of the different services offered by the cri.

## Add, Remove, Clear

The main feature of this bot is to create a category in which it will displa channels to inform on the status of the desired services and will be updated every 5 minutes. The different commands here are only available to users having a role named either `Modo` or `Devoups Admin`.

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

### Add

```js
/add assistants-services: All
```

This will add all the services from the `assistant-services` group like shown on the figure above. </br>
The first time you will try to add, you might have to add twice, since the first time it will just create the category in which the channels will be moved

### Remove

```js
/remove assistants-services: All
```

The remove command works like the add command, but does the opposit, this one will remove the specified channels.

### Clear

```js
/clear
```

This command will remove all the channels included in the category, an easier way to remove all the channels without having to add all groups and all services.

## Statuses

```js
/statuses assistants-services: All
```

This command will reply to the user the status of the specified services

<p align="center">
    <img src="./README%20Content/Direct%20statuses%20assistant-services.png?raw=true" alt="Real time updating statuses">
    </br>
    <caption>Direct status of Assistant Services group</caption>
</p>
Here I added a test one to show how the offline services will be shown on this interface.

When you add more than 25 services, it will be impossible to show them all this way so the first 25 will be shown like that and the rest of them will simpy be shown in message :

<p align="center">
    <img src="./README%20Content/Direct%20statuses.png?raw=true" alt="Real time updating statuses">
    </br>
    <caption>Direct status</caption>
</p>

## Help

As Guessed, the help command will display an help message using
add/remove/clear/statuses/help
